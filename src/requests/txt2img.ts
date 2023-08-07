import { Expose, Type, instanceToPlain, plainToInstance } from 'class-transformer'
import { Method, RequestType } from "../request.js";
import { Txt2ImgParams, Txt2ImgResponse } from '../dto/txt2img.dto.js';

export class Txt2ImgRequest implements RequestType {
    readonly method: Method = Method.POST
    readonly path: string = "txt2img"
    readonly headers: Record<string, string> = {
        "Content-Type": "application/json"
    }
    readonly parameters: string | URLSearchParams | undefined 

    constructor(parameters: Txt2ImgParams) {
        this.parameters = JSON.stringify(parameters)
    }

    request(response: any): Txt2ImgResponse {
        return plainToInstance(Txt2ImgResponse, response, { excludeExtraneousValues: true })
    }
}
