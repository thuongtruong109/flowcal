import axiosConfig from "./axios";

const BOARD = "/board";

class BoardService {
  async createBoard(board: any) {
    return await axiosConfig.post(`${BOARD}`, board);
  };

  async getAllBoards(projectId: string){
    return await axiosConfig.get(`/project/${projectId}${BOARD}/all`);
  };

  async getListBoardsName(projectId: string) {
    return await axiosConfig.get(`/project/${projectId}${BOARD}/name`);
  };

  async getBoardById(id: string) {
    return await axiosConfig.get(`${BOARD}/${id}`);
  };

  async getInfoBoard(boardId: string) {
    return await axiosConfig.get(`${BOARD}/${boardId}/info`);
  };

  async updateBoard(id: string, board: any) {
    return await axiosConfig.put(`${BOARD}/${id}`, board);
  };

  async deleteBoard(id: string) {
    return await axiosConfig.delete(`${BOARD}/${id}`);
  };
}

export default new BoardService();
