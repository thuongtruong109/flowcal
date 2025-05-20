import type { Request, Response } from "express";
import { ColorModel } from "../../../models";

const getColorCollection = async (req: Request, res: Response) => {
  try {
    const colors = await ColorModel.find();
    res.status(200).send(colors);
  } catch (error) {
    res.status(500).send(error);
  }
};

const colorController = {
  getColorCollection,
};

export default colorController;
