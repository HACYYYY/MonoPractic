import API from './client'

export const createOrder = async (orderData) => {
  try {
    const response = await API.post('/orders', orderData)
    return response.data
  } catch (error) {
    throw error.response?.data || error
  }
}

export const getUserOrders = async () => {
  try {
    const response = await API.get('/orders/my')
    return response.data
  } catch (error) {
    throw error.response?.data || error
  }
}