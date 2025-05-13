import type { Request, Response } from "express";
import { BoardModel, TagModel } from "../../models";

const createTag = async (req: Request, res: Response): Promise<void> => {
  try {
    const newTag = new TagModel(req.body);
    await newTag.save();
    res.status(200).send(newTag);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const getAllTags = async (req: Request, res: Response): Promise<void> => {
  try {
    const tags = await TagModel.find();
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
    await BoardModel.updateMany(
      { cards: { tags: req.params.id } },
      { $set: { cards: { tags: null } } }
    );
    await TagModel.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Tag deleted" });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const tagsController = {
  createTag,
  getAllTags,
  updateTag,
  deleteTag,
};

export default tagsController;
