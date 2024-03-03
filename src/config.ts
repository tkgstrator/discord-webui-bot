import { plainToInstance } from 'class-transformer'
import { validateSync } from 'class-validator'
import * as dotenv from 'dotenv'

export class SDBotConfig {}

export const config: SDBotConfig = (() => {
  dotenv.config({ path: '.env' })

  const configuration = plainToInstance(
    SDBotConfig,
    {
      application_id: process.env.DISCORD_APPLICATION_ID,
      application_secret: process.env.DISCORD_APPLICATION_SECRET,
      bot_version: process.env.BOT_VERSION,
      f_api_url: process.env.F_API_URL,
      guild_id: process.env.DISCORD_GUILD_ID,
      is_development: process.env.NODE_ENV === 'development',
      url: process.env.API_URL,
      version: process.env.VERSION,
    },
    { enableImplicitConversion: true, excludeExtraneousValues: false },
  )
  const errors = validateSync(configuration, { enableDebugMessages: true, stopAtFirstError: true, whitelist: true })
  if (errors.length > 0) {
    throw new Error(errors.toString())
  }
  return configuration
})()
