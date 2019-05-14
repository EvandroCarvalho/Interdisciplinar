import {
    findCustomerService,
    findCustomerByCPFService,
    saveCustomerService,
    updateCustomerService,
    deleteCustomerService
} from '../service/customerService'
import { async } from 'q';

export const findCustomerByCPF = async (cpf) => {
    const response = await findCustomerByCPFService(cpf)
    console.log(response)
    return response;
}

export const findCustomer = async () => {
    const response = await findCustomerService()
    return response;
}

export const saveCustomer = async (payload) => {
    await saveCustomerService(payload)
}

export const updateCustomer = async (payload) => {
    await updateCustomerService(payload)
}

export const deleteCustomer = async (id) => {
    await deleteCustomerService(id)
}