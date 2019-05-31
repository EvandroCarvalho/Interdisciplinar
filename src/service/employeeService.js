const url = "https://interjobbackend.herokuapp.com/v1/employees";

export const findEmployeeService = async () => {
  let response = "";
  await fetch(url)
    .then(resp => resp.json())
    .then(body => (response = body));
  return response;
};

export const saveEmployeeService = async payload => {
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

export const updateEmployeeService = async payload => {
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

export const deleteEmployeeService = async id => {
  let response = "";
  await fetch(`${url}/${id}`, {
    method: "DELETE"
  }).then(resp => (response = resp));
  return response;
};

export const findEmployeeByIdService = async employeeId => {
  let response = {};
  await fetch(`${url}/${employeeId}`)
    .then(resp => resp.json())
    .then(body => {
      response = body;
    });
  return response;
};

export const findEmployeeByNameService = async employeeName => {
  let response = {};
  await fetch(`${url}/findByName/${employeeName}`)
    .then(resp => resp.json())
    .then(body => {
      response = body;
    });
  return response;
};
