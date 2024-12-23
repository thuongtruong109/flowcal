import {
  CATEGORY_CONST,
  COLOR_CONST,
  ROLE_CONST,
  TAG_CONST,
} from "../constants";
import db from "../models";
import type { Error } from "mongoose";

function initTag() {
  db.tag.estimatedDocumentCount((err: Error | null, count: number) => {
    if (!err && count === 0) {
      TAG_CONST.forEach((tag: string) => {
        new db.tag({
          name: tag,
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
  db.role.estimatedDocumentCount((err: Error | null, count: number) => {
    if (!err && count === 0) {
      ROLE_CONST.forEach((role: string) => {
        new db.role({
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
  db.category.estimatedDocumentCount((err: Error | null, count: number) => {
    if (!err && count === 0) {
      CATEGORY_CONST.forEach((category: string) => {
        new db.category({
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
  db.color.estimatedDocumentCount((err: Error | null, count: number) => {
    if (!err && count === 0) {
      COLOR_CONST.forEach((color: string) => {
        new db.color({
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
  initColor();
  initRole();
  initTag();
  initCategory();
}
