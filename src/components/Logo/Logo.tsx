import React from 'react'
import Image from 'next/image'
import { cn } from '@/utilities/ui'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    <Image
      width={72}
      height={75}
      alt="Logo"
      loading={loading}
      fetchPriority={priority}
      src="/logo.svg"
    />
  )
}
