import statisticalController from "../../controllers/admin/statistical.controller";
import type { IRouter } from "../../types";
import { Router } from "express";

class StatisticalRouter implements IRouter {
  public path = "/overview";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, statisticalController.getOverview);
  }
}

export default StatisticalRouter;
