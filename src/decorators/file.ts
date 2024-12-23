import type { Request } from "express";
import multer from "multer";

const preDest = "resources";

const upload = (dest: string) => {
  const storage = multer.diskStorage({
    destination(
      req: Request,
      file: Express.Multer.File,
      cb: (error: Error | null, destination: string) => void
    ) {
      cb(null, `${preDest}/${dest}`);
    },
    filename(
      req: any,
      file: Express.Multer.File,
      cb: (error: Error | null, destination: string) => void
    ) {
      const fileName = `${req.user.id}-${file.originalname}`;
      cb(null, fileName);
    },
  });
  return multer({
    storage: storage,
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
    fileFilter(
      req: Request,
      file: Express.Multer.File,
      cb: multer.FileFilterCallback
    ) {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(new Error("Please upload an image"));
      }
      cb(null, true);
    },
  });
};

export const uploadAvatar = upload("avatars").single("file");
export const uploadEventImg = upload("events").single("file");
