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

    constructor(parameters: Partial<Txt2ImgParams>) {
        /**
         * Hires stepsは実ステップの半分
         */
        const params: Partial<Txt2ImgParams> = {
            batch_size: 1,
            cfg_scale: 12.0,
            denoising_strength: 0.55,
            height: 768,
            hr_upscaler: "Latent",
            sampler_name: "DPM++ 2S a",
            save_images: true,
            seed: -1,
            send_images: true,
            width: 512,
            steps: 20,
            hr_second_pass_steps: (parameters.steps || 20) >> 1
        }
        this.parameters = JSON.stringify({
            ...params,
            ...parameters,
        })
        console.log(this.parameters)
    }

    request(response: any): Txt2ImgResponse {
        return plainToInstance(Txt2ImgResponse, response, { excludeExtraneousValues: true })
    }
}
