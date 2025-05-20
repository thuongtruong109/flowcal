import type { Request, Response } from "express";
import { CardModel, BoardModel, ProjectModel, StatusModel, TagModel } from "../../../models";

const getAllNotes = async (req: Request, res: Response): Promise<void> => {
  try {
    // const groupNotes = await NoteModel.aggregate([
    //   {
    //     $group: {
    //       _id: "$tagId",
    //       total: { $sum: 1 },
    //       childrens: { $push: "$$ROOT" },
    //     },
    //   },
    //   {
    //     $sort: { _id: 1 },
    //   },
    // ]);
    // res.status(200).send(groupNotes);
    res.status(200).send("ok");
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const getNoteById = async (req: Request, res: Response): Promise<void> => {
  try {
    // const note = await NoteModel.findById(req.params.id);
    // res.status(200).send(note);
    res.status(200).send("ok");
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const createNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const existed = await ProjectModel.findById(req.body.projectId);
    if (!existed) {
      res.status(404).send({ message: "Project not found" });
      return;
    }
    if (req.body.tagId) {
      const existedTag = await TagModel.findById(req.body.tagId);
      if (!existedTag) {
        res.status(404).send({ message: "Tag not found" });
        return;
      }
    }
    // const note = new NoteModel(req.body);
    // await note.save();
    // res.status(200).send(note);

    // const savedCard = await card.save();
    // await ProjectModel.updateMany(
    //   { _id: req.body.projectId },
    //   { $push: { cards: savedCard._id } }
    // );

    // const updated = await ProjectModel.findById(req.body.projectId, "cards").populate(
    //   "cards"
    // );
    res.status(200).send("ok");
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const updateNote = async (req: Request, res: Response): Promise<void> => {
  try {
    // const existed = await NoteModel.findById(req.params.id);
    // if (!existed) {
    //   res.status(404).send({ message: "Note not found" });
    //   return;
    // }
    // const updated = await NoteModel.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    // });
    // res.status(200).send(updated);
    res.status(200).send("ok");
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const updateNoteStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    // const existed = await NoteModel.findById(req.params.id);
    // if (!existed) {
    //   res.status(404).send({ message: "Note not found" });
    //   return;
    // }
    // const updated = await NoteModel.findByIdAndUpdate(
    //   req.params.id,
    //   { status: req.body.status },
    //   { new: true }
    // );
    // res.status(200).send(updated);
    res.status(200).send("ok");
  } catch (error) {
    res.status(500).send({ message: error });
  }
}

const deleteNote = async (req: Request, res: Response): Promise<void> => {
  try {
    await BoardModel.updateMany(
      { notes: req.params.id },
      { $pull: { notes: req.params.id } }
    );
    // await NoteModel.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Note has been deleted!" });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const noteController = {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
};

export default noteController;
