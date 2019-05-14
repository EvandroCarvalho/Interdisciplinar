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
    console.log('findCustomer', response)
    return response;
}

export const saveCustomer = async (payload) => {
    
}

export const updateCustomer = async (payload) => {
    
}

export const deleteCustomer = async (payload) => {
    
}