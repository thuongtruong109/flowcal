import { Router } from "express";
import type { IRouter } from "../../../types";
import usersController from "./controller.user";

class UsersRouter implements IRouter {
  public path = "/users";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, usersController.getAllUsers);

    this.router.delete(`${this.path}/:id`, usersController.deleteUser);
  }
}

export default UsersRouter;
