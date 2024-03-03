import { plainToInstance } from 'class-transformer'
import { IsNotEmpty, IsSemVer, IsString, IsUrl, validateSync } from 'class-validator'
import * as dotenv from 'dotenv'
import 'reflect-metadata'
import content from 'package.json'

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

  @IsUrl()
  readonly SDWEB_API_URL: string

  @IsString()
  @IsNotEmpty()
  readonly SDWEB_API_VER: string

  @IsString()
  @IsNotEmpty()
  readonly CLOUDFLARE_ACCESS_CLIENT_ID: string
}

export const config: SDBotConfig = (() => {
  dotenv.config({ override: true, path: '.env' })

  const configuration = plainToInstance(
    SDBotConfig,
    {
      CLOUDFLARE_ACCESS_CLIENT_ID: process.env.CLOUDFLARE_ACCESS_CLIENT_ID,
      DISCORD_APPLICATION_ID: process.env.DISCORD_APPLICATION_ID,
      DISCORD_APPLICATION_SECRET: process.env.DISCORD_APPLICATION_SECRET,
      DISCORD_BOT_VERSION: content.version,
      DISCORD_GUILD_ID: process.env.DISCORD_GUILD_ID,
      SDWEB_API_URL: process.env.SDWEB_API_URL,
      SDWEB_API_VER: process.env.SDWEB_API_VER,
    },
    { enableImplicitConversion: true, excludeExtraneousValues: false },
  )
  const errors = validateSync(configuration, { enableDebugMessages: true, stopAtFirstError: false, whitelist: true })
  if (errors.length > 0) {
    throw new Error(errors.toString())
  }
  return configuration
})()
