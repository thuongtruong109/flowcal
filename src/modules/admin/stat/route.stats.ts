import { Router } from "express";
import statController from "./controller.stat";
import type { IRouter } from "../../../types";

class StatRouter implements IRouter {
  public path = "/stats";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, statController.getStats);
  }
}

export default StatRouter;
