import { Role } from '@/store/useAuthStore'
import { jwtDecode as decode } from 'jwt-decode'

type DecodedToken = {
  token_type: string
  exp: number
  iat: number
  jti: string
  user_id: number
  role: Role
  email: string
  first_name: string
  last_name: string
}

export const decodeToken = (token: string): DecodedToken => {
  return decode(token)
}
