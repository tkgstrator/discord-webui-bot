import { Expose, Type, instanceToPlain, plainToInstance } from 'class-transformer'
import { Method, RequestType } from "../request.js";
import { SystemInfoResponse } from '../dto/system.info.dto.js';
import { SDVae } from '../dto/vae.dto.js';

export class SDVaeRequest implements RequestType {
    readonly method: Method = Method.GET
    readonly path: string = "sd-vae"
    readonly headers: Record<string, string>
    readonly parameters: string | URLSearchParams | undefined 

    constructor() {}

    request(response: any): SDVae[] {
        return response.map((res: any) => plainToInstance(SDVae, res, { excludeExtraneousValues: true }))
    }
}
