const urlFindById = "https://salesmodule.herokuapp.com/employees/"
const urlFindByName = "https://salesmodule.herokuapp.com/employees/findByName/"
export const findEmployeeByIdService = async (id) => {
    let response = '';
    await fetch(urlFindById + id)
        .then(resp => resp.json())
        .then(body => {
            response = body
        })
    return response
}

export const findEmployeeByNameService = async (name) => {
    let response = "";
    await fetch(urlFindByName + name)
        .then(resp => resp.json())
        .then(body => {
            response = body
        })
    return response[0]
}