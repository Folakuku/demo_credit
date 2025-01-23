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

        this.router.post(
            "/fund",
            validate(schemas.amountSchema, { body: true }),
            asyncHandler(this.walletController.fundWallet)
        );
        this.router.post(
            "/withdraw",
            validate(schemas.withdrawSchema, { body: true }),
            asyncHandler(this.walletController.withdraw)
        );
        this.router.post(
            "/transfer",
            validate(schemas.transferSchema, { body: true }),
            asyncHandler(this.walletController.transfer)
        );
    }
}

export default UserRoutes;
