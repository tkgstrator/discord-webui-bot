import { plainToInstance } from 'class-transformer'

import { SDVae } from '@/dto/vae.dto.js'
import { SDAPIPath } from '@/enum/path'
import { Method, RequestType } from '@/request.js'

export class SDVaeRequest implements RequestType {
  readonly method: Method = Method.GET
  readonly path: SDAPIPath = SDAPIPath.SD_VAE
  readonly headers: Record<string, string>
  readonly parameters: string | URLSearchParams | undefined

  constructor() {}

  request(response: any): SDVae[] {
    return response.map((res: any) => plainToInstance(SDVae, res, { excludeExtraneousValues: true }))
  }
}
