import type { CollectionConfig, Access, Where } from 'payload'

// Hilfsfunktionen für Rollen (funktioniert mit 'role' oder 'roles[]')
export const hasRole = (u: any, r: string) =>
  Array.isArray(u?.roles) ? u.roles.includes(r) : u?.role === r

export const hasAnyRole = (u: any, roles: string[]) => roles.some((r) => hasRole(u, r))

export const isManagerOrAdmin = (u: any) => hasRole(u, 'admin') || hasRole(u, 'manager')

// WICHTIG: das Generic 'users' setzen, damit Types passen
export const Users: CollectionConfig<'users'> = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'roles', 'updatedAt'],
  },
  access: {
    // typisierte Access-Funktion
    read: (({ req }) => {
      if (!req.user) return false

      if (isManagerOrAdmin(req.user)) {
        return true
      }

      // TS: Where korrekt typisieren und ID als string casten
      const where: Where = {
        or: [
          { id: { equals: String((req.user as any).id) } }, // <- number -> string
          { roles: { contains: 'trainer' } },
        ],
      }

      return where
    }) as Access, // <- explizit als Access casten
    // ... create/update/delete wie gehabt
  },
  fields: [
    { name: 'name', type: 'text' },
    {
      name: 'roles',
      label: 'Rollen',
      type: 'select',
      hasMany: true,
      required: true,
      defaultValue: ['trainer'],
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Manager', value: 'manager' },
        { label: 'Trainer', value: 'trainer' },
      ],
      admin: { position: 'sidebar' },
      index: true,
    },
  ],
  timestamps: true,
}
