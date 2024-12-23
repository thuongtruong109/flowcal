import mongoose from "mongoose";
import BoardModel from "./board.model";
import CardModel from "./card.model";
import CategoryModel from "./category.model";
import ColorModel from "./color.model";
import EventModel from "./event.model";
import ProjectModel from "./project.model";
import RoleModel from "./role.model";
import TagModel from "./tag.model";
import UserModel from "./user.model";

mongoose.Promise = global.Promise;

type IModel = {
  user: typeof UserModel;
  role: typeof RoleModel;
  project: typeof ProjectModel;
  tag: typeof TagModel;
  board: typeof BoardModel;
  card: typeof CardModel;
  color: typeof ColorModel;
  category: typeof CategoryModel;
  event: typeof EventModel;
};

const db: IModel = {
  user: UserModel,
  role: RoleModel,
  project: ProjectModel,
  tag: TagModel,
  board: BoardModel,
  card: CardModel,
  color: ColorModel,
  category: CategoryModel,
  event: EventModel,
};

export default db;
