const url = "https://salesmodule.herokuapp.com/v1/products"

export const findItemByIdService = async (productId) => {
  let response = ''
  await fetch(`${url}/${productId}`)
      .then(resp => resp.json())
      .then(body => {
          response = body
      })
  return response
}

export const findItemByNameService = async (productName) => {
  let response = ''
  await fetch(`${url}/findByName/${productName}`)
      .then(resp => resp.json())
      .then(body => {
          response = body
      })
  return response
}