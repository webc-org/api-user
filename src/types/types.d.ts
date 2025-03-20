import { UserDocument } from "../models/user";

// Extend the Express Request interface to include a user property
declare global {
  namespace Express {
    interface Request {
      user?: UserDocument;
    }
  }
}
