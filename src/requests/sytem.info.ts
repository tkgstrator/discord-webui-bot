import { Expose, Type, instanceToPlain, plainToInstance } from 'class-transformer'
import { Method, RequestType } from "../request.js";
import { SystemInfoResponse } from '../dto/system.info.dto.js';

export class SystemInfoRequest implements RequestType {
    readonly method: Method = Method.GET
    readonly path: string = "system-info/status"
    readonly headers: Record<string, string>
    readonly parameters: string | URLSearchParams | undefined 

    constructor(state: boolean, memory: boolean, full: boolean, refresh: boolean) {
        this.parameters = new URLSearchParams({ 
            state: state.toString(),
            memory: memory.toString(),
            full: full.toString(),
            refresh: refresh.toString()
         })
    }

    request(response: any): SystemInfoResponse {
        return plainToInstance(SystemInfoResponse, response, { excludeExtraneousValues: true })
    }
}
