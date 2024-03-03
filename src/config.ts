import { plainToInstance } from 'class-transformer'
import { IsNotEmpty, IsSemVer, IsString, validateSync } from 'class-validator'
import * as dotenv from 'dotenv'

export class SDBotConfig {
  @IsString()
  @IsNotEmpty()
  readonly DISCORD_APPLICATION_ID: string

  @IsString()
  @IsNotEmpty()
  readonly DISCORD_APPLICATION_SECRET: string

  @IsSemVer()
  readonly DISCORD_BOT_VERSION: string

  @IsString()
  @IsNotEmpty()
  readonly DISCORD_GUILD_ID: string
}

export const config: SDBotConfig = (() => {
  dotenv.config({ override: true, path: '.env' })

  const configuration = plainToInstance(
    SDBotConfig,
    {
      DISCORD_APPLICATION_ID: process.env.DISCORD_APPLICATION_ID,
      DISCORD_APPLICATION_SECRET: process.env.DISCORD_APPLICATION_SECRET,
      DISCORD_BOT_VERSION: process.env.DISCORD_BOT_VERSION,
      DISCORD_GUILD_ID: process.env.DISCORD_GUILD_ID,
    },
    { enableImplicitConversion: true, excludeExtraneousValues: false },
  )
  const errors = validateSync(configuration, { enableDebugMessages: true, stopAtFirstError: false, whitelist: true })
  if (errors.length > 0) {
    throw new Error(errors.toString())
  }
  return configuration
})()
