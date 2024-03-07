import { plainToInstance } from 'class-transformer'

import { SystemInfoResponse } from '../dto/system.info.dto.js'
import { Method, RequestType } from '../request.js'

export class SystemInfoRequest implements RequestType {
  readonly method: Method = Method.GET
  readonly path: string = 'system-info/status'
  readonly headers: Record<string, string>
  readonly parameters: string | URLSearchParams | undefined

  constructor(state: boolean, memory: boolean, full: boolean, refresh: boolean) {
    this.parameters = new URLSearchParams({
      full: full.toString(),
      memory: memory.toString(),
      refresh: refresh.toString(),
      state: state.toString(),
    })
  }

  request(response: any): SystemInfoResponse {
    return plainToInstance(SystemInfoResponse, response, {
      excludeExtraneousValues: true,
    })
  }
}
