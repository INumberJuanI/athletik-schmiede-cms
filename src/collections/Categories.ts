import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from '@/fields/slug'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      label: 'Typ',
      defaultValue: 'posts',
      options: [
        { label: 'Posts', value: 'posts' },
        { label: 'Pages', value: 'pages' },
        { label: 'TrainingTimes', value: 'training-times' }, // wenn du "trainingtimes" ohne "-" bevorzugst, hier value anpassen
      ],
      admin: {
        position: 'sidebar',
        description: 'Definiert, wofür diese Kategorie verwendet wird.',
      },
      index: true,
    },
    ...slugField(),
  ],
}
