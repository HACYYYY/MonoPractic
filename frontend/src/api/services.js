import API from './client'

// Получить все услуги
export const getServices = async () => {
  try {
    const response = await API.get('/services')
    return response.data.data // Обрати внимание на .data.data
  } catch (error) {
    throw error.response?.data?.message || error.message
  }
}

// Получить одну услугу по ID
export const getService = async (id) => {
  try {
    const response = await API.get(`/services/${id}`)
    return response.data.data
  } catch (error) {
    throw error.response?.data?.message || error.message
  }
}

// Создать новый заказ
export const createOrder = async (orderData) => {
  try {
    const response = await API.post('/orders', orderData)
    return response.data
  } catch (error) {
    throw error.response?.data?.message || error.message
  }
}

// Получить историю заказов пользователя
export const getUserOrders = async () => {
  try {
    const response = await API.get('/orders/my')
    return response.data.data
  } catch (error) {
    throw error.response?.data?.message || error.message
  }
}