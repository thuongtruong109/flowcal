import type { Request, Response } from "express";
import { KanbanModel, CardModel, ProjectModel, UserModel } from "../../../models";

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const findProjects = await ProjectModel.find({ owner: req.params.id });
    if (findProjects.length > 0) {
      findProjects.forEach(async (project) => {
        const findBoards = await KanbanModel.find({ projectId: project._id });
        if (findBoards.length > 0) {
          findBoards.forEach(async (kanban) => {
            await CardModel.deleteMany({ kanbanId: kanban._id });
          });
          await KanbanModel.deleteMany({ projectId: project._id });
        }
        await ProjectModel.findByIdAndDelete(project._id);
      });
      await UserModel.findByIdAndDelete(req.params.id);

      res.status(200).send("User account has been deleted!");
    } else {
      await UserModel.findByIdAndDelete(req.params.id);
      res.status(200).send("User account has been deleted!");
    }
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const profileController = {
  deleteUser,
};

export default profileController;
