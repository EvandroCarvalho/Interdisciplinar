const urlFindByCpf = "https://salesmodule.herokuapp.com/v1/customers/findByCPF/"
const urlFindAll = "https://salesmodule.herokuapp.com/v1/customers"

export const findCustomerByCPFService = async (cpf) => {
    let response = ""
    await fetch(urlFindByCpf + cpf)
        .then(resp => resp.json())
        .then(body => response = body)
    return response
}

export const findCustomerService = async () => {
    let response = ""
    await fetch(urlFindAll)
    .then(resp => resp.json())
    .then(body => response = body)
    return response
}

export const saveCustomerService = async (payload) => {
    
}

export const updateCustomerService = async (payload) => {
    
}

export const deleteCustomerService = async (id) => {

}