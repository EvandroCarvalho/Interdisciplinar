const urlFindAll = "https://salesmodule.herokuapp.com/v1/employees"

export const findEmployeeService = async () => {
    let response = ""
    await fetch(urlFindAll)
    .then(resp => resp.json())
    .then(body => response = body)
    return response
}

export const saveEmployeeService = async (payload) => {
    
}

export const updateEmployeeService = async (payload) => {
    
}

export const deleteEmployeeService = async (id) => {

}