import { plainToInstance } from 'class-transformer'

import { SDModel } from '@/dto/models.dto'
import { Method, RequestType } from '@/request'

export class SDModelsRequest implements RequestType {
  readonly method: Method = Method.GET
  readonly path: string = 'sd-models'
  readonly headers: Record<string, string>
  readonly parameters: string | URLSearchParams | undefined

  constructor() {
    this.parameters = undefined
  }

  request(response: any): SDModel[] {
    return response.map((res: any) => plainToInstance(SDModel, res, { excludeExtraneousValues: true }))
  }
}
