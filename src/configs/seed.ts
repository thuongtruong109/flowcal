import { Error } from "mongoose";
import db from "../models";
import { ECATEGORY, ECOLOR, EROLE, ETAG } from "../constants";

function initTag() {
  db.tag.estimatedDocumentCount((err: Error | null, count: number) => {
    if (!err && count === 0) {
      ETAG.forEach((tag: string) => {
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
      EROLE.forEach((role: string) => {
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
      ECATEGORY.forEach((category: string) => {
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
        ECOLOR.forEach((color: string) => {
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

export default function init() {
    initColor();
    initRole();
    initTag();
    initCategory();
}