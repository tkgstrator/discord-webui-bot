import { plainToInstance } from 'class-transformer'

import { Txt2ImgParams, Txt2ImgResponse } from '@/dto/txt2img.dto'
import { SDAPIPath } from '@/enum/path'
import { Method, RequestType } from '@/request'

export class Txt2ImgRequest implements RequestType {
  readonly method: Method = Method.POST
  readonly path: SDAPIPath = SDAPIPath.TXT2IMG
  readonly headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  readonly parameters: string | URLSearchParams | undefined

  constructor(parameters: Txt2ImgParams) {
    this.parameters = JSON.stringify(parameters)
  }

  request(response: any): Txt2ImgResponse {
    return plainToInstance(Txt2ImgResponse, response, { excludeExtraneousValues: true })
  }
}
