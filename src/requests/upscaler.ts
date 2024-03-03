import { plainToInstance } from 'class-transformer'

import { SDAPIUpcaler } from '@/dto/upscaler.dto'
import { SDAPIPath } from '@/enum/path'
import { Method, RequestType } from '@/request'

export class SDUpscalerRequest implements RequestType {
  readonly method: Method = Method.GET
  readonly path: SDAPIPath = SDAPIPath.UPSCALERS
  readonly headers: Record<string, string>
  readonly parameters: string | URLSearchParams | undefined

  constructor() {
    this.parameters = undefined
  }

  request(response: any): SDAPIUpcaler[] {
    return response.map((res: any) => plainToInstance(SDAPIUpcaler, res, { excludeExtraneousValues: true }))
  }
}
