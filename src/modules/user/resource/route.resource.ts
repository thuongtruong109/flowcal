import { Router } from "express";
import type { IRouter } from "../../../types";
import resourceController from "./controller.resource";
import verifyAuth from "../../../middlewares/authen.middleware";
import { uploadAvatar, uploadEventImg } from "./decorators/file";

class ResourceRouter implements IRouter {
  public path = "/resources";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/avatars`,
      verifyAuth.verifyToken,
      uploadAvatar,
      resourceController.uploadSingleResource
    );

    this.router.post(
      `${this.path}/events`,
      verifyAuth.verifyToken,
      uploadEventImg,
      resourceController.uploadSingleResource
    );

    this.router.delete(
      `${this.path}`,
      verifyAuth.verifyToken,
      resourceController.deleteResource
    );
  }
}

export default ResourceRouter;
