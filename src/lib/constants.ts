import dotenv from "dotenv";

dotenv.config();

export const AUTH_SECRET_KEY = process.env.AUTH_SECRET_KEY || "";
export const MONGO_URI: string = process.env.MONGO_DB ?? "";
export const PORT: number = parseInt(process.env.PORT as string) || 8000;
