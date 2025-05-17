import type { Request, Response } from "express";
import { ColorModel } from "../../../models";

const createColor = async (req: Request, res: Response): Promise<void> => {
  try {
    const newColor = new ColorModel(req.body);
    await newColor.save();
    res.status(200).send(newColor);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const getAllColors = async (req: Request, res: Response): Promise<void> => {
  try {
    const total = await ColorModel.countDocuments();
    const colors = await ColorModel.find();
    res.status(200).send({ total, colors });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const updateColor = async (req: Request, res: Response) => {
  try {
    const updated = await ColorModel.findByIdAndUpdate(
      req.params.id,
      { $set: { name: req.body.name } },
      { new: true }
    );
    res.status(200).send(updated);
  } catch (error) {
    res.json(500).send({ message: error });
  }
};

const deleteColor = async (req: Request, res: Response): Promise<void> => {
  try {
    await ColorModel.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Color deleted!" });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const colorsController = {
  createColor,
  getAllColors,
  updateColor,
  deleteColor,
};

export default colorsController;
