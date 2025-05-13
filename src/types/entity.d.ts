import mongoose from "mongoose";

export type IRole = {
  name: string;
};

export type ITag = {
  name: string
  color: string
}

export type IUser = {
  id: string;
  username: string;
  email: string;
  password: string;
  salt: string;
  role: string;
  isVerified: boolean;
  avatar: string;
};

// export type IColor = {
//   name: string;
// }

// export type ICategory = {
//   name: string;
//   icon: string;
//   color: string;
// }

// export type IProject = {
//   owner: mongoose.Schema.Types.ObjectId;
//   name: string;
//   access: string;
//   description: string;
//   categoryId: string;
//   members: mongoose.Schema.Types.ObjectId[];
//   isFavorite: boolean;
//   background: string;
//   customBackground: string;
//   startDate: Date;
//   endDate: Date;
// }

// export type ICard = {
//   boardId: string;
//   type: string;
//   status: number;
//   icon: string;
//   text: string;
//   tagId: string;
// }

// export type IBoard = {
//   projectId: string;
//   name: string;
//   description: string;
//   status: number;
//   isFavorite: boolean;
//   background: string;
//   customBackground: string;
//   startDate: Date;
//   endDate: Date;
// }

// type IEvent = {
//   organizer: mongoose.Schema.Types.ObjectId;
//   title: string;
//   description: string;
//   time: {
//     start: string;
//     end: string;
//     date: Date;
//   };
//   location: string;
//   attendees: string[];
//   colorId: mongoose.Schema.Types.ObjectId;
// }

// type IBoard = {
//   projectId: mongoose.Schema.Types.ObjectId;
//   name: string;
//   description: string;
//   isFavorite: boolean;
//   background: mongoose.Schema.Types.ObjectId;
//   customBackground: string;
//   cards: mongoose.Schema.Types.ObjectId[];
// }