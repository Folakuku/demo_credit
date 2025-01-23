import { IUser } from "../user";

declare global {
  namespace Express {
    interface Request {
      user: IUser;
      fileName: string;
    }
    namespace Multer {
      interface File {
        location: string;
      }
    }
  }
}
