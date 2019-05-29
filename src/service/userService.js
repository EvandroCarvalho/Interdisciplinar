const url = "https://salesmodule.herokuapp.com/v1/user/";

export const findUserByUsernameService = async username => {
  let response = "";
  await fetch(url + username)
    .then(resp => resp.json())
    .then(body => (response = body));
  return response;
};
