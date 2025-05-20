import type { Request, Response } from "express";
import { ProjectModel, CardModel, KanbanModel } from "../../../models";
import { E_ACCESS } from "../../../enums";

const createProject = async (req: any, res: Response): Promise<void> => {
  try {
    const project = new ProjectModel({ owner: req.user.id, ...req.body });
    const savedProject = await project.save();

    res.status(201).send(savedProject);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const getAllProjects = async (req: any, res: Response): Promise<void> => {
  try {
    const access: string = req.query.access;

    if (access === E_ACCESS.ALL) {
      const total = await ProjectModel.countDocuments({
        owner: req.user.id,
      });
      const projects = await ProjectModel.find(
        {
          owner: req.user.id,
        },
        "members isFavorite name access createdAt",
        { sort: { createdAt: -1 }, skip: 0, limit: req.query.limit }
      ).populate("owner", "username");

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
      "members isFavorite name access createdAt",
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
      "username"
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
    // await TodoModel.deleteMany({ projectId: req.params.id });
    // await NoteModel.deleteMany({ projectId: req.params.id });
    await CardModel.deleteMany({ projectId: req.params.id });
    await KanbanModel.deleteMany({ projectId: req.params.id });

    await ProjectModel.findByIdAndDelete(req.params.id);

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
