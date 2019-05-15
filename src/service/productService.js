const url = "https://salesmodule.herokuapp.com/v1/product"

export const findProductService = async () => {
    let response = ""
    await fetch(url)
    .then(resp => resp.json())
    .then(body => response = body)
    return response
}

export const saveProductService = async (payload) => {
    let response = ""
    await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
        .then(resp => resp.json())
        .then(body => response = body)
    return response
}

export const updateProductService = async (payload) => {
    let response = ""
    await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
        .then(resp => resp.json())
        .then(body => response = body)
    return response
}

export const deleteProductService = async (id) => {
    let response = ""
    await fetch(`${url}/${id}`, {
        method: 'DELETE'
    })
        .then(resp => response = resp)
    return response
}