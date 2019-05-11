import {findEmployeeByIdService, findEmployeeByNameService} from '../service/salesService'

export const findEmployeeById = async (id) => {
    const result = await findEmployeeByIdService(id)
    return result
}

export const findEmployeeByName = async (name) => {
    const result = await findEmployeeByNameService(name)
    return result
}