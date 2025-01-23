import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { errorResponse, successResponse } from "../helpers/response";
import { TransactionType } from "../typings/customs";
import db from "../db/knex";
import { Tables } from "../typings/customs";
import { compareHash } from "../helpers/utils";

export default class WalletController {
    public getWallets = async (req: Request, res: Response) => {
        const wallets = await db(Tables.Wallet)
            .join(Tables.User, { "users.id": "wallets.user_id" })
            .select(
                "wallets.id",
                "wallets.balance",
                { user_id: "users.id" },
                "users.fullname",
                "users.email"
            );

        return successResponse(res, "Wallets fetched", { wallets });
    };

    public fundWallet = async (req: Request, res: Response) => {
        const { amount } = req.body;
        const userId = req.user.id;

        //Use a database transaction to handle the fund operation
        await db.transaction(async (trx) => {
            const wallet = await trx(Tables.Wallet)
                .where({ id: req.params.walletId })
                .forUpdate()
                .first();

            if (!wallet) {
                return errorResponse(res, "Wallet not found", 404);
            }

            if (wallet.user_id !== userId) {
                return errorResponse(
                    res,
                    "You are not authorized to proceed",
                    403
                );
            }

            // Increase wallet balance
            await trx(Tables.Wallet)
                .where({ id: wallet.id })
                .update({
                    balance: parseFloat(wallet.balance) + parseFloat(amount),
                });

            // Create a transaction record
            await trx(Tables.Transaction).insert({
                id: uuidv4(),
                wallet_id: wallet.id,
                type: TransactionType.Deposit,
                amount,
            });

            return successResponse(res, "Wallet credited successfully");
        });
    };

    public withdraw = async (req: Request, res: Response) => {
        const { amount, pin } = req.body;
        const userId = req.user.id;

        // convert amount to float
        const amountFloat = parseFloat(amount);

        // Validate transaction pin
        const valid = compareHash(pin, req.user.pin);
        if (!valid) {
            return errorResponse(res, "Invalid pin", 403);
        }

        //Use a database transaction to handle the fund operation
        await db.transaction(async (trx) => {
            const wallet = await trx(Tables.Wallet)
                .where({ id: req.params.walletId })
                .forUpdate()
                .first();

            if (!wallet) {
                return errorResponse(res, "Wallet not found", 404);
            }

            if (wallet.user_id !== userId) {
                return errorResponse(
                    res,
                    "You are not authorized to proceed",
                    403
                );
            }

            if (parseFloat(wallet.balance) < amountFloat) {
                return errorResponse(res, "Insufficient Balance", 400);
            }

            // Debit wallet
            await trx(Tables.Wallet)
                .where({ id: wallet.id })
                .update({ balance: parseFloat(wallet.balance) - amountFloat });

            // Create a transaction record
            await trx(Tables.Transaction).insert({
                id: uuidv4(),
                wallet_id: wallet.id,
                type: TransactionType.Withdrawal,
                amount,
            });

            return successResponse(res, "Wallet withdrawal successful");
        });
    };

    public transfer = async (req: Request, res: Response) => {
        const { amount, pin, receiverWalletId } = req.body;
        const userId = req.user.id;

        const amountFloat = parseFloat(amount);

        // Validate transaction pin
        const valid = compareHash(pin, req.user.pin);
        if (!valid) {
            return errorResponse(res, "Invalid pin", 403);
        }

        //Use a database transaction to handle the fund operation
        await db.transaction(async (trx) => {
            const wallet = await trx(Tables.Wallet)
                .where({ id: req.params.walletId })
                .forUpdate()
                .first();

            if (!wallet) {
                return errorResponse(res, "Wallet not found", 404);
            }

            if (wallet.user_id !== userId) {
                return errorResponse(
                    res,
                    "You are not authorized to proceed",
                    403
                );
            }

            if (wallet.id === receiverWalletId) {
                return errorResponse(
                    res,
                    "You cannot transfer to yourself",
                    400
                );
            }

            if (parseFloat(wallet.balance) < amountFloat) {
                return errorResponse(res, "Insufficient Balance", 400);
            }

            // Check for receiver wallet
            const receiverWallet = await trx(Tables.Wallet)
                .where({ id: receiverWalletId })
                .forUpdate()
                .first();

            if (!receiverWallet) {
                return errorResponse(res, "receiver wallet not found", 404);
            }

            // Debit user wallet
            await trx(Tables.Wallet)
                .where({ id: wallet.id })
                .update({ balance: parseFloat(wallet.balance) - amountFloat });

            // Credit receiver wallet
            await trx(Tables.Wallet)
                .where({ id: receiverWallet.id })
                .update({
                    balance: parseFloat(receiverWallet.balance) + amountFloat,
                });

            // Create a transaction record
            await trx(Tables.Transaction).insert({
                id: uuidv4(),
                wallet_id: wallet.id,
                receiver_wallet_id: receiverWalletId,
                type: TransactionType.Withdrawal,
                amount,
            });

            return successResponse(res, "Transfer successful");
        });
    };
}
