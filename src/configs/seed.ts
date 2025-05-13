import {
  CATEGORY,
  COLOR,
  ROLE,
  TAG,
} from "../constants";
import type { Error } from "mongoose";
import type { ITag } from '../types'
import { CategoryModel, ColorModel, RoleModel, TagModel } from "../models";

function initTag() {
  TagModel.estimatedDocumentCount((err: Error | null, count: number) => {
    if (!err && count === 0) {
      TAG.forEach((tag: ITag) => {
        new TagModel({
          name: tag.name,
          color: tag.color
        }).save((err: Error | null) => {
          if (err) {
            console.log("error", err);
          }
        });
      });
    }
  });
  console.log("-> seeding successfully for tags collection");
}

function initRole() {
  RoleModel.estimatedDocumentCount((err: Error | null, count: number) => {
    if (!err && count === 0) {
      ROLE.forEach((role: string) => {
        new RoleModel({
          name: role,
        }).save((err: Error | null) => {
          if (err) {
            console.log("error", err);
          }
        });
      });
    }
  });
  console.log("-> seeding successfully for roles collection");
}

function initCategory() {
  CategoryModel.estimatedDocumentCount((err: Error | null, count: number) => {
    if (!err && count === 0) {
      CATEGORY.forEach((category: string) => {
        new CategoryModel({
          name: category,
        }).save((err: Error | null) => {
          if (err) {
            console.log("error", err);
          }
        });
      });
    }
  });
  console.log("-> seeding successfully for category collection");
}

function initColor() {
  ColorModel.estimatedDocumentCount((err: Error | null, count: number) => {
    if (!err && count === 0) {
      COLOR.forEach((color: string) => {
        new ColorModel({
          name: `${color}`,
        }).save((err: Error | null) => {
          if (err) {
            console.log("error", err);
          }
        });
      });
    }
  });
  console.log("-> seeding successfully for color collection");
}

export default function initSampleSeed() {
  initRole();
  initColor();
  initTag();
  initCategory();
}
