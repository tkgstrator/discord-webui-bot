import { plainToInstance } from 'class-transformer'
import { Method, RequestType } from "../request.js";
import { Sampler } from '../dto/sampler.dto.js';

export class SamplerRequest implements RequestType {
    readonly method: Method = Method.GET
    readonly path: string = "samplers"
    readonly headers: Record<string, string>
    readonly parameters: string | URLSearchParams | undefined 

    constructor() {}

    request(response: any): Sampler[] {
        return response.map((res: any) => plainToInstance(Sampler, res, { excludeExtraneousValues: true, exposeUnsetFields: false, enableCircularCheck: true }))
    }
}
