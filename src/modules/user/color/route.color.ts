import { Router } from "express";
import type { IRouter } from "../../../types";
import settingController from "./controller.color";

class ColorRouter implements IRouter {
  public path = "/color";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      settingController.getColorCollection
    );
  }
}

export default ColorRouter;
