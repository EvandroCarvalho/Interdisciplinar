import {findCustomerByCPFService} from '../service/customerService'

export const findCustomerByCPF = async (cpf) => {
    const response = await findCustomerByCPFService(cpf)
    console.log(response)
    return response;
}