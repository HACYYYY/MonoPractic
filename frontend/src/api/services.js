import API from './client'


export const getServices = async () => {
  try {
    const response = await API.get('/services')
    return response.data
  } catch (error) {
    throw error.response?.data || error
  }
}

export const getService = async (id) => {
  try {
    const response = await API.get(`/services/${id}`)
    return response.data
  } catch (error) {
    throw error.response?.data || error
  }
}