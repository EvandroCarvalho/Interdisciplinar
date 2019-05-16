import {
    finishOrderService,
} from '../service/salesService'
import {
    findEmployeeByIdService,
    findEmployeeByNameService,
} from '../service/employeeService'
import {
    findItemByIdService,
    findItemByNameService
} from '../service/productService'



export const findEmployeeById = async (idEmployee) => {
    const result = await findEmployeeByIdService(idEmployee)
    return result
}

export const findEmployeeByName = async (EmployeeName) => {
    const result = await findEmployeeByNameService(EmployeeName)
    return result
}

export const findItemById = async (productId) => {
    const result = await findItemByIdService(productId)
    return result;
}

export const findItemByName = async (productName) => {
    const result = await findItemByNameService(productName)
    return result;
}

export const finishOrder = async (order) => {
    const result = await finishOrderService(order);
    return result;
}