import mongoose from "mongoose";

mongoose.Promise = global.Promise;

import BoardModel from "./board.model";
import CardModel from "./card.model";
import CategoryModel from "./category.model";
import ColorModel from "./color.model";
import EventModel from "./event.model";
import ProjectModel from "./project.model";
import RoleModel from "./role.model";
import TagModel from "./tag.model";
import UserModel from "./user.model";
import NoteModel from "./note.model";
import TodoModel from "./todo.model";
import StatusModel from "./status.model";

export { UserModel, BoardModel, CardModel, CategoryModel, ColorModel, EventModel, ProjectModel, RoleModel, TagModel, NoteModel, TodoModel, StatusModel };