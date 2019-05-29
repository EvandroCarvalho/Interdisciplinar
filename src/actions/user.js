import { findUserByUsernameService } from "../service/userService";

export const findUserByUsername = async username => {
  const response = await findUserByUsernameService(username);
  return response;
};
