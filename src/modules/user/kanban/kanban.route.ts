import { Router } from "express";
import type { IRouter } from "../../../types";
import kanbanController from "./kanban.controller";
import verifyAuth from "../../../middlewares/authen.middleware";

class KanbanRouter implements IRouter {
  public path = "/kanbans";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}`,
      verifyAuth.verifyToken,
      kanbanController.createKanban
    );

    this.router.get(
      `/projects/:projectId${this.path}/all`,
      verifyAuth.verifyToken,
      kanbanController.getAllKanbans
    );

    this.router.get(
      `/projects/:projectId${this.path}/name`,
      verifyAuth.verifyToken,
      kanbanController.getAllKanbansName
    );

    this.router.get(
      `${this.path}/:id`,
      verifyAuth.verifyToken,
      kanbanController.getKanbanById
    );

    this.router.get(
      `${this.path}/:id/info`,
      verifyAuth.verifyToken,
      kanbanController.getKanbanInfoById
    );

    this.router.put(
      `${this.path}/:id`,
      verifyAuth.verifyToken,
      kanbanController.updateKanban
    );

    this.router.delete(
      `${this.path}/:id`,
      verifyAuth.verifyToken,
      kanbanController.deleteKanban
    );
  }
}

export default KanbanRouter;
