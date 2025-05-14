import type { Request, Response } from "express";
import { BoardModel, StatusModel, CardModel, TodoModel } from "../../models";

const createStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const newStatus = new StatusModel(req.body);
    await newStatus.save();
    res.status(200).send(newStatus);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const getAllStatuses = async (req: Request, res: Response): Promise<void> => {
  try {
    const status = await StatusModel.find();
    res.status(200).send(status);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const updateStatus = async (req: Request, res: Response) => {
  try {
    const updated = await StatusModel.findByIdAndUpdate(
      req.params.id,
      { $set: { name: req.body.name } },
      { new: true }
    );
    res.status(200).send(updated);
  } catch (error) {
    res.json(500).send({ message: error });
  }
};

const deleteStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    await CardModel.updateMany(
      { statusId: req.params.id },
      { $set: { statusId: null } }
    );
    await TodoModel.updateMany(
      { statusId: req.params.id },
      { $set: { statusId: null } }
    );
    await StatusModel.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Status deleted" });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const statusController = {
  createStatus,
  getAllStatuses,
  updateStatus,
  deleteStatus,
};

export default statusController;
