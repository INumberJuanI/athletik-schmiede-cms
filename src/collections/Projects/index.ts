import type { CollectionConfig } from 'payload'

import { slugField } from '@/fields/slug'
import { isAdmin } from '@/access/isAdmin'
import { anyone } from '@/access/anyone'
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Banner } from '@/blocks/Banner/config'
import { Code } from '@/blocks/Code/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { isAdminOrManager } from '@/access/isAdminOrManager'

export const Projects: CollectionConfig = {
  slug: 'projects',
  access: {
    create: isAdminOrManager,
    delete: isAdminOrManager,
    read: anyone,
    update: isAdminOrManager,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'url',
      type: 'text',
    },
    {
      name: 'isLocalProject',
      type: 'checkbox',
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            BlocksFeature({ blocks: [Banner, Code, MediaBlock] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            HorizontalRuleFeature(),
          ]
        },
      }),
      label: false,
      required: true,
    },
    ...slugField(),
  ],
}
