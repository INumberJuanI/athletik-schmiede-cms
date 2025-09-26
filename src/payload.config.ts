// storage-adapter-import-placeholder
import { sqliteAdapter } from '@payloadcms/db-sqlite'

import sharp from 'sharp' // sharp-import
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'
import { Projects } from './collections/Projects'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Helpful envs (optional, but tidy)
const PUBLIC_SERVER_URL =
  process.env.PAYLOAD_PUBLIC_SERVER_URL ||
  process.env.NEXT_PUBLIC_SERVER_URL || // fallback to what you already had
  getServerSideURL()

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

// If admin+API are same-site, LAX is ideal.
// If they’re different sites, set SAME_SITE to 'none' and ensure HTTPS in prod.
const SAME_SITE = (process.env.PAYLOAD_COOKIE_SAMESITE as 'lax' | 'strict' | 'none') || 'lax'
const COOKIE_SECURE = process.env.NODE_ENV === 'production'

export default buildConfig({
  // ✅ Must equal how the browser reaches the CMS (scheme + host [+ port])
  serverURL: PUBLIC_SERVER_URL,

  // ✅ Admin config
  admin: {
    theme: 'light',
    components: {
      beforeLogin: ['@/components/BeforeLogin'],
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },

  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,

  // DB
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || '',
    },
  }),

  // Collections
  collections: [Pages, Posts, Projects, Media, Categories, Users],

  // ✅ CORS & CSRF
  // Even if admin + API are same-origin, keeping localhost and APP_URL helps dev.
  cors: [PUBLIC_SERVER_URL, APP_URL, 'http://localhost:3000'].filter(Boolean) as string[],
  csrf: [PUBLIC_SERVER_URL, APP_URL, 'http://localhost:3000'].filter(Boolean) as string[],

  // Globals
  globals: [Header, Footer],

  // Plugins (keep your existing ones)
  plugins: [
    ...plugins,
    // storage-adapter-placeholder
  ],

  // ✅ Auth / Cookies
  auth: {
    // steuert nur noch die Reihenfolge, wie Payload das JWT sucht
    jwtOrder: ['cookie', 'Bearer', 'JWT'],
  },
  // auth: {
  //   cookies: {
  //     sameSite: SAME_SITE, // 'lax' for same-site; use 'none' if truly cross-site
  //     secure: COOKIE_SECURE, // must be true in prod if SameSite='none'
  //     // domain: '.example.com',   // uncomment if sharing cookies across subdomains in prod
  //   },
  // },

  // Secrets
  secret: process.env.PAYLOAD_SECRET,

  sharp,

  // TS types
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  // Jobs (unchanged)
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        if (req.user) return true
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
  upload: {
    limits: {
      fileSize: 5000000, // 5MB, written in bytes
    },
  },
})
