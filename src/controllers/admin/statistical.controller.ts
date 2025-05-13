import type { Request, Response } from "express";
import { BoardModel, CardModel, CategoryModel, ColorModel, ProjectModel, TagModel, UserModel } from "../../models";

const getOverview = async (req: Request, res: Response): Promise<void> => {
  try {
    switch (req.query.scope) {
      case "card": {
        const totalCards = await CardModel.countDocuments();
        const groupCards = await CardModel.aggregate([
          {
            $group: {
              _id: "$id",
              count: { $sum: 1 },
            },
          },
        ]);
        res.status(200).send({ total: totalCards, groups: groupCards });
        break;
      }
      case "board": {
        const totalBoards = await BoardModel.countDocuments();
        const groupBoards = await BoardModel.aggregate([
          {
            $group: {
              _id: "$projectId",
              count: { $sum: 1 },
            },
          },
        ]);
        res.status(200).send({ total: totalBoards, groups: groupBoards });
        break;
      }
      case "project": {
        const totalProject = await ProjectModel.countDocuments();
        const projects = await ProjectModel.aggregate([
          {
            $group: {
              _id: "$owner",
              count: { $sum: 1 },
            },
          },
        ]);
        res.status(200).send({ total: totalProject, groups: projects });
        break;
      }
      case "tag": {
        const totalTags = await TagModel.countDocuments();
        const groupTags = await TagModel.aggregate([
          {
            $group: {
              _id: "$_id",
              count: { $sum: 1 },
            },
          },
        ]);

        res.status(200).send({ total: totalTags, groups: groupTags });
        break;
      }
      case "color": {
        const totalColors = await ColorModel.countDocuments();
        const groupColors = await ColorModel.aggregate([
          {
            $group: {
              _id: "$_id",
              count: { $sum: 1 },
            },
          },
        ]);

        res.status(200).send({ total: totalColors, groups: groupColors });
        break;
      }
      case "category": {
        const totalCategories = await CategoryModel.countDocuments();
        const groupCategories = await CategoryModel.aggregate([
          {
            $group: {
              _id: "$_id",
              count: { $sum: 1 },
            },
          },
        ]);

        res
          .status(200)
          .send({ total: totalCategories, groups: groupCategories });
        break;
      }
      default: {
        const totalUsers = await UserModel.countDocuments();
        const groupUsers = await UserModel.aggregate([
          {
            $group: {
              _id: "$roles",
              count: { $sum: 1 },
            },
          },
        ]);
        res.status(200).send({ total: totalUsers, groups: groupUsers });
        break;
      }
    }
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const statisticalController = {
  getOverview,
};

export default statisticalController;
