const url = "https://salesmodule.herokuapp.com/v1/employees";
const urlSales = "https://salesmodule.herokuapp.com/v1/sales/saveList";
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

export const finishOrderService = async order => {
  let response = {};
  await fetch(urlSales, {
    method: "post",
    body: JSON.stringify(order),
    headers: { "Content-Type": "application/json" }
  }).then(resp => (response = resp));
  return response;
};
