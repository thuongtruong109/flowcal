import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Error } from "mongoose";
import nodemailer from "nodemailer";
import { confirmEmailMsg } from "../../helpers/email.helper";
import type { IRole, IUser } from "../../types";
import { comparePassword, hashPassword } from "../../utils/hash";
import { envConf } from "../../configs/env.config";
import db from "../../models";

const User = db.user;
const Role = db.role;

const signup = async (req: Request, res: Response) => {
  const key = await hashPassword(req.body.password);
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    avatar: req.body.avatar,
    password: key.hash,
    salt: key.salt,
  });

  user.save((err: Error | null, user: IUser | any) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err: Error, roles: Array<IRole>) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          user.roles = roles.map((role: IRole) => role._id);
          user.save((err: Error) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.send({ message: "User was registered successfully!" });
          });
          // sendConfirmationEmail(user.email);
        }
      );
    } else {
      Role.findOne(
        {
          name: "user",
        },
        (err: Error, role: IRole) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          user.roles = [role._id];

          user.save((err: any) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.send({ message: "User was registered successfully!" });
          });
          sendConfirmationEmail(user.email);
        }
      );
    }
  });
};

const generateAccessToken = (user: IUser) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    envConf.accessTokenKey,
    { expiresIn: envConf.accessTokenLife }
  );
};

const generateRefreshToken = (user: IUser) => {
  return jwt.sign({ id: user, email: user.email }, envConf.refreshTokenKey, {
    expiresIn: envConf.refreshTokenLife,
  });
};

//https://www.freecodecamp.org/news/use-nodemailer-to-send-emails-from-your-node-js-server/
function sendConfirmationEmail(email: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: envConf.emailUsername,
      pass: envConf.emailPassword,
      clientId: envConf.googleClientId,
      clientSecret: envConf.googleClientSecret,
      refreshToken: envConf.googleRefreshToken,
    },
  } as any);

  const token = jwt.sign({ email }, envConf.secretKey);

  return transporter.sendMail(confirmEmailMsg(email, token), (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
}

const verifyAccount = (req: Request, res: Response) => {
  let email = null;
  try {
    const payload = jwt.verify(
      req.params.token,
      envConf.accessTokenSecret
    ) as any;
    email = payload.email;
  } catch {
    throw new Error("Invalid Token");
  }
  User.findOne({ email: email }, (err: Error, user: IUser | any) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user.isVerified) {
      res.status(500).send({ message: "Account already verified" });
      return;
    }
    user.isVerified = true;
    user.save((err: Error) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.send({ message: "Account verified" });
    });
  });
};

let refreshTokens: Array<string> = [];
const signin = (req: Request, res: Response) => {
  User.findOne({
    username: req.body.username,
  })
    .populate("roles", "-__v")
    .exec((err: Error | null, user: IUser | any) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      const passwordIsValid = comparePassword(
        req.body.password,
        user.password,
        user.salt
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      refreshTokens.push(refreshToken);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365,
        sameSite: "strict",
        path: "/",
        secure: true,
      });

      const authorities: string[] = [];
      for (let i = 0; i < user.roles.length; i++) {
        authorities.push(user.roles[i].name.toUpperCase());
      }
      const { password, salt, ...userWithoutPassword } = user._doc;
      res.status(200).send({
        ...userWithoutPassword,
        authorities,
        accessToken,
        refreshToken,
      });
    });
};

const refreshToken = (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken)
    return res.status(401).send({ message: "No refresh token provided!" });

  if (!refreshTokens.includes(refreshToken))
    return res.status(403).send({ message: "Refresh token is not valid!" });

  jwt.verify(refreshToken, envConf.refreshTokenKey, (err: any, user: any) => {
    if (err)
      return res.status(403).send({ message: "Refresh token is not valid!" });

    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);
    refreshTokens.push(newRefreshToken);
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
      sameSite: "strict",
      path: "/",
      secure: true,
    });

    res.status(200).send({ accessToken: newAccessToken });
  });
};

const logout = (req: Request, res: Response) => {
  refreshTokens = refreshTokens.filter(
    (token) => token !== req.cookies.refreshToken
  );
  res.clearCookie("refreshToken");
  res.status(200).send({ message: "Logged out!" });
};

const logoutAllDevice = (req: Request, res: Response) => {
  refreshTokens = [];
  logout(req, res);
  res.status(200).send({ message: "Logged out all device!" });
};

const authController = {
  signup,
  verifyAccount,
  signin,
  refreshToken,
  logout,
  logoutAllDevice,
};

export default authController;
