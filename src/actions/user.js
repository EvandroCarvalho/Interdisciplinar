import {
  findUserByUsernameService,
  saveUserService
} from "../service/userService";

export const findUserByUsername = async username => {
  const response = await findUserByUsernameService(username);
  return response;
};

export const saveUser = async payload => {
  await saveUserService(payload);
};
