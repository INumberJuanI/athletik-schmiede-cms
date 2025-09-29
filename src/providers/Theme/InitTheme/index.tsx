import Script from 'next/script'
import React from 'react'

import { defaultTheme, themeLocalStorageKey } from '../ThemeSelector/types'

export const InitTheme: React.FC = () => {
  return (
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    <Script
      dangerouslySetInnerHTML={{
        __html: `
        (function () {
          var themeToSet = '${defaultTheme}'
          themeToSet = 'light'
          document.documentElement.setAttribute('data-theme', themeToSet)
        })();
        `,
      }}
      id="theme-script"
      strategy="beforeInteractive"
    />
  )
}
