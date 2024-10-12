import httpService from "./httpService";

export const createQuestion = async (data) => {
  return await httpService.post("/questions", data);
};
