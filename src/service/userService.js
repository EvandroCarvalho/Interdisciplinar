const url = "https://interjobbackend.herokuapp.com/v1/users_accounts";

export const findUserByUsernameService = async username => {
  let response = "";
  await fetch(url + "/?username=" + username)
    .then(resp => resp.json())
    .then(body => (response = body))
    .catch(() =>
      alert("Ops! Tivemos um problema. Por favor, tente novamente mais tarde")
    );
  return response;
};

export const saveUserService = async payload => {
  let response = "";
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
    .then(resp => resp.json())
    .then(body => (response = body));
  return response;
};
