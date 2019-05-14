import {
    findEmployeeService,
    saveEmployeeService,
    updateEmployeeService,
    deleteEmployeeService
} from '../service/employeeService'

export const findEmployee = async () => {
    const response = await findEmployeeService()
    return response;
}

export const saveEmployee = async (payload) => {
    await saveEmployeeService(payload)
}

export const updateEmployee = async (payload) => {
    await updateEmployeeService(payload)
}

export const deleteEmployee = async (id) => {
    await deleteEmployeeService(id)
}