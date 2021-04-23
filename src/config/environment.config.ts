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
  appName: process.env.APP_NAME ? process.env.APP_NAME : 'template-hapi',
  projectVersion: pack.version,
  host: 'localhost',
  port: 9000,
  service: {
    enabled: process.env.ENABLED_SERVICE === 'true'
  },
  plugins: {
    swagger: {
      options: {
        info: {
          title: 'Test API Documentation',
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
    starwars: {
      url: process.env.STAR_WARS_API || 'https://swapi.dev/api/',
      retry: Number(process.env.STAR_WARS_RETRY_TIMES) || defaultRetry.times,
      delay: Number(process.env.STAR_WARS_RETRY_DELAY) || defaultRetry.delay
    }
  }
}

export default config
