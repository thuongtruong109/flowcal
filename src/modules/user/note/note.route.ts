import { Router } from "express";
import type { IRouter } from "../../../types";
import CardController from "./note.controller";
import verifyAuth from "../../../middlewares/authen.middleware";

class NoteRouter implements IRouter {
  public path = "/note";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }
  initializeRoutes() {
    this.router.get(
      `/board/:boardId${this.path}`,
      verifyAuth.verifyToken,
      CardController.getAllNotes
    );

    this.router.post(
      `${this.path}`,
      verifyAuth.verifyToken,
      CardController.createNote
    );

    this.router.get(
      `${this.path}/:id`,
      verifyAuth.verifyToken,
      CardController.getNoteById
    );

    this.router.put(
      `${this.path}/:id`,
      verifyAuth.verifyToken,
      CardController.updateNote
    );

    this.router.delete(
      `${this.path}/:id`,
      verifyAuth.verifyToken,
      CardController.deleteNote
    );
  }
}

export default NoteRouter;
