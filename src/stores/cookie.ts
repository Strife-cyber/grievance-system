import Cookies from 'js-cookie'

export async function login(userToken: string) {
  // Set cookie to expire in 24 hours
  try {
    Cookies.set('userToken', userToken, { expires: 1 }) // expires: 1 means 1 day
    return true
  } catch (error) {
    console.error('An error ocurred: ', error)
    return false
  }
}

// Check if the user is logged in by checking the cookie
export function checkLogin() {
  const token = Cookies.get('userToken')
  if (token) {
    return token
  } else {
    return null
  }
}

// Log out the user by removing the cookie
export function logout() {
  try {
    Cookies.remove('userToken')
    return true
  } catch (error) {
    console.error('An error ocurred: ', error)
    return false
  }
}
