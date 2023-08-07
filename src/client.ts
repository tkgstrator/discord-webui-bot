import { SDModel } from "./dto/models.dto.js"
import { Txt2ImgParams, Txt2ImgResponse } from "./dto/txt2img.dto.js";
import { Method, RequestType } from "./request.js"
import { SDModelsRequest } from "./requests/sd_models.js"
import * as dotenv from 'dotenv';
import fetch, { Headers } from 'node-fetch';
import { Txt2ImgRequest } from "./requests/txt2img.js";
import { ProgressResponse } from "./dto/progress.dto.js";
import { ProgressRequest } from "./requests/progress.js";
import { SystemInfoRequest } from "./requests/sytem.info.js";
import { SystemInfoResponse } from "./dto/system.info.dto.js";
import { SDVaeRequest } from "./requests/vae.js";
import { SDVae } from "./dto/vae.dto.js";

dotenv.config();

export class SDClient {
    private readonly base_url: string
    private readonly version: string

    constructor() {
        this.base_url = process.env.API_URL!
        this.version = process.env.API_VER!
    }

    async txt2img(request: Txt2ImgParams): Promise<Txt2ImgResponse> {
        return this.request(new Txt2ImgRequest(request))
    }
    
    async get_sd_vae(): Promise<SDVae[]> {
        return this.request(new SDVaeRequest())
    }

    async get_progress(skip_current_image: boolean): Promise<ProgressResponse> {
        return this.request(new ProgressRequest(skip_current_image))
    }
    
    async get_system_info(state: boolean, memory: boolean, full: boolean, refresh: boolean):Promise<SystemInfoResponse> {
        return this.request(new SystemInfoRequest(state, memory, full, refresh))
    }
    async get_sd_models(): Promise<SDModel[]> {
        return this.request(new SDModelsRequest())
    }

    private async request<T extends RequestType, U extends ReturnType<T["request"]>>(request: T): Promise<U> {
        if (request.method === Method.POST) {
            const url = new URL(request.path, `${this.base_url}/${this.version}/`)
            const headers = new Headers(request.headers)
            const response = await fetch(url, {
                method: request.method,
                headers: headers,
                body: request.parameters
            })
            return request.request(await response.json()) as U
        } else {
            const url = new URL(`${request.path}?${request.parameters}`, `${this.base_url}/${this.version}/`)
            const headers = new Headers(request.headers)
            const response = await fetch(url, {
                method: request.method,
                headers: headers
            })
            return request.request(await response.json()) as U
        }
    }
}
