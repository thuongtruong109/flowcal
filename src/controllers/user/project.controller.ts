import type { Request, Response } from "express";
import { UserModel, ProjectModel, BoardModel, CardModel } from "../../models";

const createProject = async (req: any, res: Response): Promise<void> => {
  try {
    const project = new ProjectModel({ owner: req.user.id, ...req.body });
    const savedProject = await project.save();

    await UserModel.updateMany(
      { _id: req.user.id },
      { $push: { projects: savedProject._id } }
    );

    res.status(201).send(savedProject);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const getAllProjects = async (req: any, res: Response): Promise<void> => {
  try {
    const access: string = req.query.access;

    if (access === "all") {
      const total = await ProjectModel.countDocuments({
        owner: req.user.id,
      });
      const projects = await ProjectModel.find(
        {
          owner: req.user.id,
        },
        "_id props members isFavorite name access categoryId createdAt",
        { sort: { createdAt: -1 }, skip: 0, limit: req.query.limit }
      );
      const lastUpdated = await ProjectModel.find(
        {
          owner: req.user.id,
        },
        "updatedAt",
        { sort: { createdAt: -1 }, limit: 1 }
      );
      res.status(200).send({ total, lastUpdated, projects });
      return;
    }

    const total = await ProjectModel.countDocuments({
      owner: req.user.id,
      access: access,
    });
    const projects = await ProjectModel.find(
      {
        owner: req.user.id,
        access: access,
      },
      "_id props members isFavorite name access categoryId createdAt",
      { sort: { createdAt: -1 }, skip: 0, limit: req.query.limit }
    );
    const lastUpdated = await ProjectModel.find(
      {
        owner: req.user.id,
        access: access,
      },
      "updatedAt",
      { sort: { createdAt: -1 }, limit: 1 }
    );
    res.status(200).send({ total, lastUpdated, projects });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const getProjectById = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await ProjectModel.findById(req.params.id).populate(
      "owner",
      "_id username"
    );
    res.status(200).send(project);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const updateProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await ProjectModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send(project);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const deleteProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const findBoards = await BoardModel.find({ projectId: req.params.id });
    if (findBoards.length > 0) {
      findBoards.forEach(async (Board) => {
        await CardModel.deleteMany({ boardId: Board._id });
      });
      await BoardModel.deleteMany({ projectId: req.params.id });
    }

    await ProjectModel.findByIdAndDelete(req.params.id);

    await UserModel.updateMany(
      { projects: req.params.id },
      { $pull: { projects: req.params.id } }
    );
    res.status(200).send("Project has been deleted!");
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const projectController = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};

export default projectController;
