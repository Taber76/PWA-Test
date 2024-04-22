const apiUrl = import.meta.env.VITE_API_URL

const apiCall = async (method, endpoint, data) => { // endpoint includes query or params
  try {
    const res = await fetch(`${apiUrl}/${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    })
    return res
  } catch (error) {
    throw error
  }
}

export const apiService = {

  get: async (endpoint) => {
    try {
      const res = await fetch(`${apiUrl}/${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      return res
    } catch (error) {
      throw error
    }
  },

  postPut: async (method, endpoint, data) => {
    try {
      return await apiCall(method, endpoint, data)
    } catch (error) {
      throw error
    }
  },

  delete: async (endpoint) => {
    try {
      return await apiCall('DELETE', endpoint, {})
    } catch (error) {
      throw error
    }
  },

}