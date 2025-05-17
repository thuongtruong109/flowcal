import mongoose from "mongoose";

mongoose.Promise = global.Promise;

import KanbanModel from "./board.model";
import CardModel from "./card.model";
import CategoryModel from "./category.model";
import BoardModel from "./board.model";
import ColorModel from "./color.model";
import EventModel from "./event.model";
import ProjectModel from "./project.model";
import RoleModel from "./role.model";
import TagModel from "./tag.model";
import UserModel from "./user.model";
import StatusModel from "./status.model";

export { UserModel, KanbanModel, CardModel, CategoryModel, ColorModel, EventModel, ProjectModel, RoleModel, TagModel, BoardModel, StatusModel };