const url = "https://salesmodule.herokuapp.com/v1/users/";

export const findUserByUsernameService = async username => {
  let response = "";
  await fetch(url)
    .then(resp => resp.json())
    .then(body => (response = body));
  return response;
};
