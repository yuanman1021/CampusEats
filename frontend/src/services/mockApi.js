const API_BASE_URL = 'http://localhost:8000/api'

const fileToEndpoint = {
  'vendors.json': '/vendors',
  'menuItems.json': '/menu-items',
  'menu.json': '/menu-items',
  'promotions.json': '/promotions',
  'notifications.json': '/notifications'
}

export async function getMockData(fileName) {
  const endpoint = fileToEndpoint[fileName]

  if (!endpoint) {
    const response = await fetch(`/data/${fileName}`)
    if (!response.ok) throw new Error(`Unable to load ${fileName}`)
    return response.json()
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`)

  if (!response.ok) {
    throw new Error(`Unable to load ${fileName} from API`)
  }

  return response.json()
}

export async function markNotificationAsRead(notificationId) {
  const response = await fetch(
    `${API_BASE_URL}/notifications/${notificationId}/read`,
    {
      method: 'PUT'
    }
  )

  if (!response.ok) {
    throw new Error('Unable to mark notification as read')
  }

  return response.json()
}