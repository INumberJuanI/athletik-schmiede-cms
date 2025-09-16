import type { AccessArgs } from 'payload'
import type { User } from '@/payload-types'
import { hasAnyRole } from '@/collections/Users'

type IsAuthenticated = (args: AccessArgs<User>) => boolean

export const isAdminOrManager: IsAuthenticated = ({ req: { user } }) => {
  if (!user) return false
  return hasAnyRole(user, ['admin', 'manager'])
}
