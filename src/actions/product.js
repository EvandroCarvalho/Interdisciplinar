import {
    findProductService,
    saveProductService,
    updateProductService,
    deleteProductService
} from '../service/productService'

export const findProduct = async () => {
    const response = await findProductService()
    return response
}

export const saveProduct = async (payload) => {
    await saveProductService(payload)
}

export const updateProduct = async (payload) => {
    await updateProductService(payload)
}

export const deleteProduct = async (id) => {
    await deleteProductService(id)
}