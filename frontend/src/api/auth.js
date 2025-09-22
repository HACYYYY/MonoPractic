import API from './client'


export const login = async (credentials) => {
  try {
    const response = await API.post('/auth/login', credentials)
    return response.data
  } catch (error) {
    throw error.response?.data || error
  }
}


export const register = async (userData) => {
  try {
    const response = await API.post('/auth/register', userData)
    return response.data
  } catch (error) {
    throw error.response?.data || error
  }
}

export const logout = async () => {
  try {
    const response = await API.post('/auth/logout')
    return response.data
  } catch (error) {
    throw error.response?.data || error
  }
}