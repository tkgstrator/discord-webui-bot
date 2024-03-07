import { plainToInstance } from 'class-transformer'

import { SDAPISDModel } from '@/dto/sd_model.dto'
import { SDAPIPath } from '@/enum/path'
import { Method, RequestType } from '@/request'

export class SDModelsRequest implements RequestType {
  readonly method: Method = Method.GET
  readonly path: SDAPIPath = SDAPIPath.SD_MODELS
  readonly headers: Record<string, string>
  readonly parameters: string | URLSearchParams | undefined

  constructor() {
    this.parameters = undefined
  }

  request(response: any): SDAPISDModel[] {
    return response.map((res: any) => plainToInstance(SDAPISDModel, res, { excludeExtraneousValues: true }))
  }
}
