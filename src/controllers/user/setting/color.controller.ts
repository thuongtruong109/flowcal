import { unlink } from "node:fs/promises";
import type { Request, Response } from "express";
import { BoardModel, CardModel, ColorModel, ProjectModel, TagModel, UserModel } from "../../../models";

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

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const findProjects = await ProjectModel.find({ owner: req.params.id });
    if (findProjects.length > 0) {
      // await Project.findByIdAndDelete({ owner: req.params.id });
      // await User.findByIdAndDelete(req.params.id);

      findProjects.forEach(async (project) => {
        const findBoards = await BoardModel.find({ projectId: project._id });
        if (findBoards.length > 0) {
          findBoards.forEach(async (Board) => {
            await CardModel.deleteMany({ BoardId: Board._id });
          });
          await BoardModel.deleteMany({ projectId: project._id });
        }
        await ProjectModel.findByIdAndDelete(project._id);
      });
      await UserModel.findByIdAndDelete(req.params.id);

      res.status(200).send("User account has been deleted!");
    } else {
      await UserModel.findByIdAndDelete(req.params.id);
      res.status(200).send("User account has been deleted!");
    }
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const getColorCollection = async (req: Request, res: Response) => {
  try {
    const colors = await ColorModel.find();
    res.status(200).send(colors);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getTagCollection = async (req: Request, res: Response) => {
  try {
    const tags = await TagModel.find().populate("color");
    res.status(200).send(tags);
  } catch (error) {
    res.status(500).send(error);
  }
};

const settingController = {
  uploadSingleResource,
  deleteResource,
  deleteUser,
  getColorCollection,
  getTagCollection,
};

export default settingController;
