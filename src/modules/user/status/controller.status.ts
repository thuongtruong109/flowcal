import type { Request, Response } from "express";
import { StatusModel } from "../../../models";

const getStatusCollection = async (req: Request, res: Response) => {
  try {
    const colors = await StatusModel.find().populate("creatorId");
    res.status(200).send(colors);
  } catch (error) {
    res.status(500).send(error);
  }
};

const statusController = {
  getStatusCollection,
};

export default statusController;
