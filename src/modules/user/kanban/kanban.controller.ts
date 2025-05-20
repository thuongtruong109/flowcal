
import type { Request, Response } from "express";
import * as object from "mongoose";
import { BoardModel, CardModel, ProjectModel, TagModel } from "../../../models";

const ObjectId = object.Types.ObjectId;

const createKanban = async (req: Request, res: Response): Promise<void> => {
  try {
    const kanban = new BoardModel(req.body);
    const savedKanban = await kanban.save();

    await ProjectModel.updateMany(
      { _id: req.body.projectId },
      { $push: { projects: savedKanban._id } }
    );

    res.status(201).send(savedKanban);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const getAllKanbans = async (req: Request, res: Response): Promise<void> => {
  try {
    const kanbans = await BoardModel.find(
      { projectId: req.params.projectId },
      "name isFavorite background updatedAt"
    );
    res.status(200).send(kanbans);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const getAllKanbansName = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const kanbans = await BoardModel.find(
      { projectId: req.params.projectId },
      "name"
    );
    res.status(200).send(kanbans);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const getKanbanById = async (req: Request, res: Response): Promise<void> => {
  try {
    const kanban = await BoardModel.findById(
      req.params.id,
      "projectId name isFavorite customBackground"
    ).populate("background", "name");
    if (!kanban) {
      res.status(404).send({ message: "Kanban not found" });
      return;
    }

    const cards = await CardModel.aggregate([
      {
        $match: {
          boardId: new ObjectId(req.params.id),
        },
      },
      {
        $group: {
          _id: "$status",
          childrens: {
            $push: "$$ROOT",
          },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    //truy van nguoc nested tu tag -> card
    // const tags = await Tag.aggregate([
    //   {
    //     $lookup: {
    //       from: "cards",
    //       localField: "_id",
    //       foreignField: "tagId",
    //       as: "cards",
    //       let: { tagId: "$_id" },
    //       pipeline: [
    //         {
    //           $match: {
    //             $expr: {
    //               $eq: ["$tagId", "$$tagId"],
    //             },
    //           },
    //         },
    //       ],
    //     },
    //   },
    // ]);
    res.status(200).send({ kanban, cards });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const getKanbanInfoById = async (req: Request, res: Response): Promise<void> => {
  try {
    const kanban = await BoardModel.findById(
      req.params.id,
      "name description createdAt updatedAt"
    );

    const groupCardByTag = await CardModel.aggregate([
      {
        $match: {
          boardId: new ObjectId(req.params.id),
        },
      },
      {
        $group: {
          _id: "$tagId",
          total: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    await TagModel.populate(groupCardByTag, { path: "_id", select: "-name -__v" });
    const groupCardByStatus = await CardModel.aggregate([
      {
        $match: {
          boardId: new ObjectId(req.params.id),
        },
      },
      {
        $group: {
          _id: "$status",
          total: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const totalCard = await CardModel.countDocuments({ boardId: req.params.id });
    const totalTag = groupCardByTag.length;
    const totalStatus = groupCardByTag.length;

    const total = {
      totalCard,
      totalTag,
      totalStatus,
    };
    // console.log(total);

    const info = {
      total,
      groupCardByTag,
      groupCardByStatus,
    };

    res.status(200).send({ kanban, info });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const updateKanban = async (req: Request, res: Response): Promise<void> => {
  try {
    // await Board.updateOne({ _id: req.params.id }, { $set: req.body });
    const updated = await BoardModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send(updated);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const deleteKanban = async (req: Request, res: Response): Promise<void> => {
  try {
    await ProjectModel.updateMany(
      { Boards: req.params.id },
      { $pull: { Boards: req.params.id } }
    );
    await CardModel.deleteMany({ BoardId: req.params.id });

    await BoardModel.deleteOne({ _id: req.params.id });

    res.status(200).send({ message: "Kanban has been deleted!" });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const KanbanController = {
  createKanban,
  getAllKanbans,
  getAllKanbansName,
  getKanbanById,
  getKanbanInfoById,
  updateKanban,
  deleteKanban,
};

export default KanbanController;
