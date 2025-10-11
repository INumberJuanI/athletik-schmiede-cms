import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'
import { MediaBlock } from '../MediaBlock/Component'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  return (
    <div className="container my-16">
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, link, content, size } = col

            return (
              <div
                className={cn(`col-span-4 lg:col-span-${colsSpanClasses[size!]}`, {
                  'md:col-span-2': size !== 'full',
                })}
                key={index}
              >
                {/* {richText && <RichText data={richText} enableGutter={false} />} */}
                {content &&
                  content.map((block) => {
                    if (block.blockType === 'richText') {
                      return (
                        <RichText
                          key={block.id}
                          data={block.richText as DefaultTypedEditorState}
                          enableGutter={false}
                        />
                      )
                    }
                    if (block.blockType === 'mediaBlock') {
                      return (
                        <MediaBlock key={block.id} media={block.media} blockType={'mediaBlock'} />
                      )
                    }
                  })}

                {enableLink && <CMSLink {...link} />}
              </div>
            )
          })}
      </div>
    </div>
  )
}
