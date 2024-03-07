import { plainToInstance } from 'class-transformer'

import { SDAPIOptions } from '@/dto/options.dto'
import { SDAPIPath } from '@/enum/path'
import { Method, RequestType } from '@/request'

export class SDOptionsRequest implements RequestType {
  readonly method: Method = Method.GET
  readonly path: SDAPIPath = SDAPIPath.OPTIONS
  readonly headers: Record<string, string>
  readonly parameters: string | URLSearchParams | undefined

  constructor() {
    this.parameters = undefined
  }

  request(response: any): SDAPIOptions {
    return plainToInstance(SDAPIOptions, response, { excludeExtraneousValues: true })
  }
}
