const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL

export const getCities = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/user/cities/`, {
      method: 'GET',
    })
    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        message: data.detail || data.error || 'Server error',
      }
    }

    return data // [{ id: 1, name: 'Kyiv' }]
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export const getLanguages = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/user/languages/`, {
      method: 'GET',
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        message: data.detail || data.error || 'Server error',
      }
    }

    return data // [{ id: 1, name: 'Ukrainian' }]
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export const getCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/user/student-categories/`, {
      method: 'GET',
    })
    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        message: data.detail || data.error || 'Server error',
      }
    }

    return data // [{ id: 1, name: '1-4', name_display: 'Grades 1‑4' }]
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export const getSubjects = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/user/subjects/`, {
      method: 'GET',
    })
    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        message: data.detail || data.error || 'Server error',
      }
    }

    return data // [{ id: 1, name: 'English' }]
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
