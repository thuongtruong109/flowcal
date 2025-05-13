import type { Request, Response } from "express";
import { CardModel, BoardModel } from "../../models";

const getAllCards = async (req: Request, res: Response): Promise<void> => {
  try {
    const groupCards = await CardModel.aggregate([
      {
        $group: {
          _id: "$status",
          total: { $sum: 1 },
          childrens: { $push: "$$ROOT" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    res.status(200).send(groupCards);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const getCardById = async (req: Request, res: Response): Promise<void> => {
  try {
    const card = await CardModel.findById(req.params.id);
    res.status(200).send(card);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const createCard = async (req: Request, res: Response): Promise<void> => {
  try {
    const existed = await BoardModel.findById(req.body.boardId);
    if (!existed) {
      res.status(404).send({ message: "Board not found" });
    }
    const card = new CardModel(req.body);
    const savedCard = await card.save();

    await BoardModel.updateMany(
      { _id: req.body.boardId },
      { $push: { cards: savedCard._id } }
    );

    const updated = await BoardModel.findById(savedCard.boardId, "cards").populate(
      "cards"
    );
    res.status(200).send(updated);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const updateCard = async (req: Request, res: Response): Promise<void> => {
  try {
    const existed = await CardModel.findById(req.params.id);
    if (!existed) {
      res.status(404).send({ message: "Card not found" });
    }
    const updated = await CardModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send(updated);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const deleteCard = async (req: Request, res: Response): Promise<void> => {
  try {
    await BoardModel.updateMany(
      { cards: req.params.id },
      { $pull: { cards: req.params.id } }
    );
    await CardModel.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Card has been deleted!" });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const cardController = {
  createCard,
  getAllCards,
  getCardById,
  updateCard,
  deleteCard,
};

export default cardController;
