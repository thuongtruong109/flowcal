import mongoose from "mongoose";
import BoardModel from "@/models/board.model";
import CardModel from "@/models/card.model";
import CategoryModel from "@/models/category.model";
import ColorModel from "@/models/color.model";
import EventModel from "@/models/event.model";
import ProjectModel from "@/models/project.model";
import RoleModel from "@/models/role.model";
import TagModel from "@/models/tag.model";
import UserModel from "@/models/user.model";

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
