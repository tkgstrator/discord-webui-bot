import { plainToInstance } from 'class-transformer'

import { SDAPISampler } from '@/dto/samplers.dto'
import { SDAPIPath } from '@/enum/path'
import { Method, RequestType } from '@/request'

export class SDSamplerRequest implements RequestType {
  readonly method: Method = Method.GET
  readonly path: SDAPIPath = SDAPIPath.SAMPLERS
  readonly headers: Record<string, string>
  readonly parameters: string | URLSearchParams | undefined

  constructor() {
    this.parameters = undefined
  }

  request(response: any): SDAPISampler[] {
    return response.map((res: any) => plainToInstance(SDAPISampler, res, { excludeExtraneousValues: true }))
  }
}
