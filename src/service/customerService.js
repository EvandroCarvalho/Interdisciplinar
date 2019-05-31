const urlFindByCpf =
  "https://interjobbackend.herokuapp.com/v1/customers/findByCPF/";
const url = "https://interjobbackend.herokuapp.com/v1/customers";

export const findCustomerByCPFService = async cpf => {
  let response = "";
  await fetch(urlFindByCpf + cpf)
    .then(resp => resp.json())
    .then(body => (response = body));
  return response;
};

export const findCustomerService = async () => {
  let response = "";
  await fetch(url)
    .then(resp => resp.json())
    .then(body => (response = body));
  return response;
};

export const saveCustomerService = async payload => {
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

export const updateCustomerService = async payload => {
  let response = "";
  await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
    .then(resp => resp.json())
    .then(body => (response = body));
  return response;
};

export const deleteCustomerService = async id => {
  let response = "";
  await fetch(`${url}/${id}`, {
    method: "DELETE"
  }).then(resp => (response = resp));
  return response;
};
