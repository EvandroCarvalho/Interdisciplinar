const url = "https://salesmodule.herokuapp.com/v1/customers/findByCPF/"

export const findCustomerByCPFService = async (cpf) => {
    let response = ""
    await fetch(url + cpf)
        .then(resp => resp.json())
        .then(body => response = body)
    return response
}