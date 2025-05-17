import { Router } from "express";
import type { IRouter } from "../../../types";
import tagController from "./controller.tag";
import verifyAuth from "../../../middlewares/authen.middleware";

class TagRouter implements IRouter {
  public path = "/tags";
  public router = Router()

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`,
      verifyAuth.verifyToken,
      tagController.getAllTags);

    this.router.post(`${this.path}`,
      verifyAuth.verifyToken,
      tagController.createTag);

    this.router.put(`${this.path}/:id`,
      verifyAuth.verifyToken,
      tagController.updateTag);

    this.router.delete(`${this.path}/:id`,
      verifyAuth.verifyToken,
      tagController.deleteTag);
  }
}

export default TagRouter;
