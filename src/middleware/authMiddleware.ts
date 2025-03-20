/// <reference path="../types/types.d.ts" />

import jwt from "jsonwebtoken";
import User from "../models/user";
import { AUTH_SECRET_KEY } from "../lib/constants";
import { Request, Response, NextFunction } from "express";

// Middleware to authenticate users using JWT
export default class AuthMiddleware {
  // Middleware method to authenticate users using JWT
  public async authenticate(
    req: Request = {} as Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    // Get the token from the Authorization header
    const token = req.header("Authorization")?.replace("Bearer ", "");

    // If no token is provided, send a 401 Unauthorized response
    if (!token) {
      res.status(401).send("Please authenticate");
      return;
    }

    try {
      // Verify the token using the secret key
      const decoded = jwt.verify(token, AUTH_SECRET_KEY) as { id: string };

      // Find the user by the ID encoded in the token
      const user = await User.findById(decoded.id);

      // If no user is found, send a 401 Unauthorized response
      if (!user) {
        res.status(401).send("Please authenticate");
        return;
      }

      // Attach the user to the request object
      req.user = user;

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      console.error(error); // Log the error for debugging purposes

      // If token verification fails, send a 401 Unauthorized response
      res.status(401).send("Invalid token");
      return;
    }
  }
}
