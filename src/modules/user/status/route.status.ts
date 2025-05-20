import { Router } from "express";
import type { IRouter } from "../../../types";
import statusController from "./controller.status";

class StatusRouter implements IRouter {
  public path = "/status";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/colors`,
      statusController.getStatusCollection
    );

    this.router.get(`${this.path}/tags`, statusController.getStatusCollection);
  }
}

export default StatusRouter;
