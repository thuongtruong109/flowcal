import { Router } from "express";
import { IRouter } from "../../types";

import userController from "../../controllers/admin/user.controller";

class UsersRouter implements IRouter {
  public path = "/users";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, userController.getAllUsers);

    this.router.delete(`${this.path}/:id`, userController.deleteUser);
  }
}

export default UsersRouter;
