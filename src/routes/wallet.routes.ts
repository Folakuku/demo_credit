import { Router } from "express";
import WalletController from "../controllers/wallet.controller";
import { asyncHandler } from "../helpers/handler";
import validate from "../middlewares/validators/validate";
import * as schemas from "../middlewares/validators/schema";

class UserRoutes {
    public router: Router;
    private walletController: WalletController;

    constructor() {
        this.router = Router();
        this.walletController = new WalletController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get("/", asyncHandler(this.walletController.getWallets));

        this.router.get(
            "/:walletId",
            asyncHandler(this.walletController.getUserWallet)
        );

        this.router.put(
            "/:walletId/fund",
            validate(schemas.amountSchema, { params: true, body: true }),
            asyncHandler(this.walletController.fundWallet)
        );

        this.router.put(
            "/:walletId/withdraw",
            validate(schemas.withdrawSchema, { params: true, body: true }),
            asyncHandler(this.walletController.withdraw)
        );

        this.router.put(
            "/:walletId/transfer",
            validate(schemas.transferSchema, { params: true, body: true }),
            asyncHandler(this.walletController.transfer)
        );

        this.router.get(
            "/:walletId/transactions",
            asyncHandler(this.walletController.getWalletTransactions)
        );
    }
}

export default UserRoutes;
