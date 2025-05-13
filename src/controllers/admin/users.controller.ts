import type { Request, Response } from "express";
import { UserModel, ProjectModel, BoardModel, CardModel } from "../../models";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find().select("_id username email");
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const findProjects = await ProjectModel.find({ owner: req.params.id });
    if (findProjects.length > 0) {
      // await Project.findByIdAndDelete({ owner: req.params.id });
      // await User.findByIdAndDelete(req.params.id);

      findProjects.forEach(async (project: any) => {
        const findBoards = await BoardModel.find({ projectId: project._id });
        if (findBoards.length > 0) {
          findBoards.forEach(async (board: any) => {
            await CardModel.deleteMany({ boardId: board._id });
          });
          await BoardModel.deleteMany({ projectId: project._id });
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

const usersController = {
  getAllUsers,
  deleteUser,
};
export default usersController;
