import type { AccessArgs } from 'payload'
import type { User } from '@/payload-types'

type IsAuthenticated = (args: AccessArgs<User>) => boolean

export const isTrainer: IsAuthenticated = ({ req: { user } }) => {
  if (!user) return false

  // Wenn roles ein Array ist:
  if (Array.isArray((user as any).roles)) {
    return (user as any).roles.includes('trainer')
  }
}
