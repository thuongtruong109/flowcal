import { Request, Response } from "express";
import cardController from "./card.controller";
import db from "../../models";

const Project = db.project;
const Board = db.board;
const Card = db.card;
const Tag = db.tag;

const createBoard = async (req: Request, res: Response): Promise<void> => {
  try {
    const board = new Board(req.body);
    const savedBoard = await board.save();

    await Project.updateMany(
      { _id: req.body.projectId },
      { $push: { projects: savedBoard._id } }
    );

    res.status(201).send(savedBoard);

    res.status(200).send(board);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const getAllBoards = async (req: Request, res: Response): Promise<void> => {
  try {
    const boards = await Board.find(
      { projectId: req.params.projectId },
      "name isFavorite background updatedAt"
    );
    res.status(200).send(boards);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const getListBoardsName = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const boards = await Board.find(
      { projectId: req.params.projectId },
      "name"
    );
    res.status(200).send(boards);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const getBoardById = async (req: Request, res: Response): Promise<void> => {
  try {
    const board = await Board.findById(
      req.params.id,
      "_id projectId name isFavorite customBackground"
    ).populate("background", "name");
    if (!board) {
      res.status(404).send({ message: "Board not found" });
      return;
    }

    const cards = await Card.aggregate([
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
    res.status(200).send({ board, cards });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const getBoardInfoById = async (req: Request, res: Response): Promise<void> => {
  try {
    const board = await Board.findById(req.params.id, "-cards -__v").populate(
      "projectId",
      "name"
    );
    const totalCard = await Card.countDocuments({ BoardId: req.params.id });
    const totalCardByTag = await Card.aggregate([
      {
        $group: {
          _id: "$tagId",
          total: { $sum: 1 },
        },
      },
    ]);
    const totalCardByStatus = await Card.aggregate([
      {
        $group: {
          _id: "$status",
          total: { $sum: 1 },
        },
      },
    ]);

    const info = {
      totalCard,
      totalCardByTag,
      totalCardByStatus,
    };
    res.status(200).send({ board, info });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const updateBoard = async (req: Request, res: Response): Promise<void> => {
  try {
    // await Board.updateOne({ _id: req.params.id }, { $set: req.body });
    const updated = await Board.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send(updated);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const deleteBoard = async (req: Request, res: Response): Promise<void> => {
  try {
    await Project.updateMany(
      { Boards: req.params.id },
      { $pull: { Boards: req.params.id } }
    );
    await Card.deleteMany({ BoardId: req.params.id });

    await Board.deleteOne({ _id: req.params.id });

    res.status(200).send({ message: "Board has been deleted!" });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const BoardController = {
  createBoard,
  getAllBoards,
  getListBoardsName,
  getBoardById,
  getBoardInfoById,
  updateBoard,
  deleteBoard,
};

export default BoardController;
