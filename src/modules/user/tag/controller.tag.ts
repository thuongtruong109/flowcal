import type { Request, Response } from "express";
import { TagModel } from "../../../models";
import type { IRequest } from "../../../types";

const createTag = async (req: Request, res: Response): Promise<void> => {
  try {
    const newTag = new TagModel(req.body);
    await newTag.save();
    res.status(200).send(newTag);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const getAllTags = async (req: any, res: Response): Promise<void> => {
  try {
    console.log("userId", req.user.id);
    const tags = await TagModel.find()
    res.status(200).send(tags);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const updateTag = async (req: Request, res: Response) => {
  try {
    const updated = await TagModel.findByIdAndUpdate(
      req.params.id,
      { $set: { name: req.body.name } },
      { new: true }
    );
    res.status(200).send(updated);
  } catch (error) {
    res.json(500).send({ message: error });
  }
};

const deleteTag = async (req: Request, res: Response): Promise<void> => {
  try {
    await TagModel.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Tag deleted" });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const tagController = {
  createTag,
  getAllTags,
  updateTag,
  deleteTag,
};

export default tagController;
