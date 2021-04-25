import dotenv from 'dotenv'
import * as path from 'path'
import * as pack from '../../package.json'

(() => {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development'
  const NODE_ENV = process.env.NODE_ENV
  dotenv.config({ path: path.join(__dirname , `/../../env/.env-${NODE_ENV}`) })
})()

const defaultRetry = { times: 3, delay: 5000 }

const config = {
  env: process.env.NODE_ENV || 'development',
  appName: process.env.APP_NAME ? process.env.APP_NAME : 'worker-generous',
  projectVersion: pack.version,
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 9001,
  auth: process.env.AUTH_SECRET || '',
  service: {
    enabled: process.env.ENABLED_SERVICE === 'true'
  },
  plugins: {
    swagger: {
      options: {
        info: {
          title: 'Worker Generous',
          version: pack.version
        },
        securityDefinitions: {
          jwt: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header'
            // 'x-keyPrefix': 'Bearer '
          }
        },
        security: [{ jwt: [] }]
      }
    }
  },
  apis: {
    netlify: {
      url: process.env.NETLIFY_API || '',
      retry: Number(process.env.NETLIFY_RETRY_TIMES) || defaultRetry.times,
      delay: Number(process.env.NETLIFY_RETRY_DELAY) || defaultRetry.delay
    },
    commerce: {
      url: process.env.COMMERCE_PRODUCTS_API || '',
      retry: Number(process.env.COMMERCE_RETRY_TIMES) || defaultRetry.times,
      delay: Number(process.env.COMMERCE_RETRY_DELAY) || defaultRetry.delay,
      token: process.env.COMMERCE_PRODUCTS_TOKEN || ''
    }
  }
}

export default config
