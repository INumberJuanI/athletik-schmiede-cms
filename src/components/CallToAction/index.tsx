import Link from 'next/link'
import { Button } from '../ui/button'

type Props = {
  url: string
  variant?:
    | 'default'
    | 'destructive'
    | 'ghost'
    | 'link'
    | 'outline'
    | 'secondary'
    | null
    | undefined
}
export const CallToAction: React.FC<Props> = (props) => {
  const { url, variant } = props

  return (
    <Button variant={variant} asChild className="border-background border-solid border">
      <Link href={url}>Starte jetzt durch!</Link>
    </Button>
  )
}
