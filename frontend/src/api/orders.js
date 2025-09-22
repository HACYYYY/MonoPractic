import API from './client'

// Создать новый заказ
export const createOrder = async (orderData) => {
  try {
    const response = await API.post('/orders', orderData)
    return response.data
  } catch (error) {
    throw error.response?.data || error
  }
}

// Получить историю заказов пользователя
export const getUserOrders = async () => {
  try {
    const response = await API.get('/orders/my')
    return response.data
  } catch (error) {
    throw error.response?.data || error
  }
}