import { Expose, Type, instanceToPlain, plainToInstance } from 'class-transformer'
import { Method, RequestType } from "../request.js";
import { Txt2ImgParams, Txt2ImgResponse } from '../dto/txt2img.dto.js';
import { ProgressResponse } from '../dto/progress.dto.js';

export class ProgressRequest implements RequestType {
    readonly method: Method = Method.GET
    readonly path: string = "progress"
    readonly headers: Record<string, string>
    readonly parameters: string | URLSearchParams | undefined 

    constructor(skip_current_image: boolean) {
        this.parameters = new URLSearchParams({ skip_current_image: skip_current_image.toString() })
    }

    request(response: any): ProgressResponse {
        return plainToInstance(ProgressResponse, response, { excludeExtraneousValues: true })
    }
}
