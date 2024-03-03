import { plainToInstance } from 'class-transformer'

import { SDAPITxt2Img } from '@/dto/txt2img.dto'
import { SDAPIPath } from '@/enum/path'
import { Method, RequestType } from '@/request'

export class SDTxt2ImgRequest implements RequestType {
  readonly method: Method = Method.POST
  readonly path: SDAPIPath = SDAPIPath.TXT2IMG
  readonly headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  readonly parameters: string | URLSearchParams | undefined

  constructor(parameters: SDAPITxt2Img.Request) {
    this.parameters = JSON.stringify(parameters)
  }

  request(response: any): SDAPITxt2Img.Response {
    return plainToInstance(SDAPITxt2Img.Response, response, { excludeExtraneousValues: true })
  }
}
