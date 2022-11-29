import { Request, Response } from "express";
import CardModel from "src/models/card.model";
import verifyAuth from "../../middlewares/authen.middleware";

import db from "../../models";
const User = db.user;
const Project = db.project;
const Column = db.column;
const Card = db.card;

const createProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(verifyAuth.getUserId(req));
    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
    }
    if (verifyAuth.getUserId(req) !== req.body.owner) {
      res.status(403).send({ message: "Forbiden" });
      return;
    }

    const project = new Project(req.body);
    const savedProject = await project.save();

    await User.updateMany(
      { _id: verifyAuth.getUserId(req) },
      { $push: { projects: savedProject._id } }
    );

    res.status(201).send(savedProject);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const getAllProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    if (req.query.access === "public") {
      const totalProjects = await Project.countDocuments({
        owner: verifyAuth.getUserId(req),
        access: "public",
      });
      const projects = await Project.find({
        owner: verifyAuth.getUserId(req),
        access: "public",
      });
      res.status(200).send({ total: totalProjects, projects: projects });
    } else if (req.query.access === "private") {
      const totalProjects = await Project.countDocuments({
        owner: verifyAuth.getUserId(req),
        access: "private",
      });
      const projects = await Project.find({
        owner: verifyAuth.getUserId(req),
        access: "private",
      });
      res.status(200).send({ total: totalProjects, projects: projects });
    } else {
      const totalProjects = await Project.countDocuments({
        owner: verifyAuth.getUserId(req),
      });
      const projects = await (
        await User.findById(verifyAuth.getUserId(req))
      ).populate("projects");
      res
        .status(200)
        .send({ total: totalProjects, projects: projects.projects });
    }
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const getProjectById = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await (
      await Project.findById(req.params.id)
    ).populate("owner", "_id username");
    res.status(200).send(project);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const updateProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send(project);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const deleteProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const findColumns = await Column.find({ projectId: req.params.id });
    if (findColumns.length > 0) {
      findColumns.forEach(async (column) => {
        await Card.deleteMany({ columnId: column._id });
      });
      await Column.deleteMany({ projectId: req.params.id });
    }

    await Project.findByIdAndDelete(req.params.id);

    await User.updateMany(
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
