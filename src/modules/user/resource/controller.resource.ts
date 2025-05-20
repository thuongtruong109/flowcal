import { unlink } from "node:fs/promises";
import type { Request, Response } from "express";

const uploadSingleResource = async (req: any, res: Response) => {
  try {
    res.status(200).send(req.file.filename);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteResource = async (req: Request, res: Response) => {
  try {
    await unlink(req.body.dest);
    res.status(200).send("File deleted!");
  } catch (error) {
    res.status(500).send(error);
  }
};


const resourceController = {
  uploadSingleResource,
  deleteResource,
};

export default resourceController;
