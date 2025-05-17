import { Router } from "express";
import type { IRouter } from "../../../types";
import profileController from "./controller.profile";
import verifyAuth from "../../../middlewares/authen.middleware";

class ProfileRouter implements IRouter {
  public path = "/profile";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.delete(
      `${this.path}/:id`,
      verifyAuth.verifyToken,
      profileController.deleteUser
    );
 }
}

export default ProfileRouter;
