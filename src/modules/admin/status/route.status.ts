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
    this.router.post(`${this.path}`, statusController.createStatus);

    this.router.get(`${this.path}`, statusController.getAllStatuses);

    this.router.put(`${this.path}/:id`, statusController.updateStatus);

    this.router.delete(`${this.path}/:id`, statusController.deleteStatus);
  }
}

export default StatusRouter;
