import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel";

interface ExtendRequest extends Request {
  user?: any;
}

 export const validateJWT = (req: ExtendRequest, res: Response, next: NextFunction) => {
  const authorizationheader = req.get("authorization");
  if (!authorizationheader) {
    res.status(403).send("no Authorization header was not provided");
    return;
  }

  const token = authorizationheader.split(" ")[1];

  if (!token) {
    res.status(403).send("Bearer token not found");
    return;
  }

  jwt.verify(
    token,
    "VeiV6iwD9fs2oXhBpeyuTtXaVkh78TJL",
    async (err, payload) => {
      if (err) {
        res.status(403).send("Invalid token");
        return;
      }

      if (!payload) {
        res.status(403).send("Invalid token payload");
        return;
      }

      // fetch user data form database
      const userPayload = payload as {
        email: string;
        firstName: string;
        lastName: string;
      };
      const user = await userModel.findOne({ email: userPayload.email });
      req.user = user;
      next();
    }
  );
};


