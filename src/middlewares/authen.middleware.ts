import type { Response, NextFunction } from "express";
import type { Error } from "mongoose";
import type { IDecoded, IRole, IUser } from "../types";
import jwt from "jsonwebtoken";
import db from "../models";
import { envConf } from "../configs/env.config";

const User = db.user;
const Role = db.role;

const verifyToken = (req: any, res: Response, next: NextFunction) => {
  if (req.method === "OPTIONS") {
    return res.status(200).json({});
  }
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(403)
        .send({ status: false, message: "No token provided!" });
    }

    // const accessToken = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString()).id;
    const accessToken = token.split(" ")[1];

    jwt.verify(
      accessToken,
      envConf.ACCESS_TOKEN_KEY,
      (err: Error | null, decoded: IDecoded | any) => {
        if (err) {
          return res.status(401).send({ message: "Unauthorized!" });
        }
        req.user = decoded;
        next();
      }
    );
  } catch (error) {
    res.status(401).json({ error: "Authentication Failed!" });
  }
};

const isAdmin = (req: any, res: Response, next: NextFunction) => {
  User.findById(req.userId).exec((err: Error | null, user: IUser | any) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err: Error, roles: Array<IRole>) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }
        res.status(403).send({ message: "Require Admin Role!" });
        return;
      }
    );
  });
};

const isModerator = (req: any, res: Response, next: NextFunction) => {
  User.findById(req.userId).exec((err: Error | null, user: IUser | any) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err: Error, roles: Array<IRole>) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "moderator") {
            next();
            return;
          }
        }
        res.status(403).send({ message: "Require Moderator Role!" });
        return;
      }
    );
  });
};

const verifyAuth = {
  verifyToken,
  isAdmin,
  isModerator,
};

export default verifyAuth;
