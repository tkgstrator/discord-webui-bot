import * as dotenv from 'dotenv';
import fetch, { Headers } from 'node-fetch';

import { SDModel } from './dto/models.dto.js';
import { SDOptions } from './dto/options.dto.js';
import { SDProgress } from './dto/progress.dto.js';
import { Sampler } from './dto/sampler.dto.js';
import { SystemInfoResponse } from './dto/system.info.dto.js';
import { Txt2ImgParams, Txt2ImgResponse } from './dto/txt2img.dto.js';
import { Upscaler } from './dto/upscaler.dto.js';
import { SDVae } from './dto/vae.dto.js';
import { Method, RequestType } from './request.js';
import { GetSDOptionsRequest, SetSDOptionsRequest } from './requests/options.js';
import { ProgressRequest } from './requests/progress.js';
import { SamplerRequest } from './requests/sampler.js';
import { SDModelsRequest } from './requests/sd_models.js';
import { SystemInfoRequest } from './requests/sytem.info.js';
import { Txt2ImgRequest } from './requests/txt2img.js';
import { UpscalerRequest } from './requests/upscaler.js';
import { SDVaeRequest } from './requests/vae.js';

dotenv.config();

function chunked<T extends any[]>(arr: T, size: number) {
  return arr.reduce((newarr, _, i) => (i % size ? newarr : [...newarr, arr.slice(i, i + size)]), [] as T[][]);
}

export class SDClient {
  private readonly base_url: string;
  private readonly version: string;
  private readonly checkpoint_offset = 0;
  private readonly api_token: string | undefined;

  constructor() {
    this.base_url = process.env.API_URL!;
    this.version = process.env.API_VER!;
    if (process.env.API_USER_ID !== undefined || process.env.API_PASSWORD !== undefined)
      this.api_token = Buffer.from(`${process.env.API_USER_ID!}:${process.env.API_PASSWORD!}`).toString('base64');
  }

  async txt2img(request: Partial<Txt2ImgParams>): Promise<Txt2ImgResponse> {
    return this.request(new Txt2ImgRequest(request));
  }

  async sdxl_support(): Promise<boolean> {
    const { sd_model_checkpoint } = await this.get_options();
    const models = (await this.get_sd_models()).filter((model) => model.title === sd_model_checkpoint);
    return models.length === 0 ? false : models[0].is_sdxl;
  }

  async set_options(request: SDOptions): Promise<boolean> {
    return this.request(new SetSDOptionsRequest(request));
  }

  async get_options(): Promise<SDOptions> {
    return this.request(new GetSDOptionsRequest());
  }

  async get_sd_vae(): Promise<SDVae[]> {
    return this.request(new SDVaeRequest());
  }

  async get_samplers(): Promise<Sampler[]> {
    return this.request(new SamplerRequest());
  }

  async get_upscalers(): Promise<Upscaler[]> {
    return this.request(new UpscalerRequest());
  }

  async get_progress(skip_current_image: boolean): Promise<SDProgress> {
    return this.request(new ProgressRequest(skip_current_image));
  }

  async get_system_info(state: boolean, memory: boolean, full: boolean, refresh: boolean): Promise<SystemInfoResponse> {
    return this.request(new SystemInfoRequest(state, memory, full, refresh));
  }

  async get_sd_models(): Promise<SDModel[]> {
    return this.request(new SDModelsRequest());
  }

  async get_checkpoints(): Promise<SDModel[]> {
    return chunked(await this.get_sd_models(), 25)[this.checkpoint_offset];
  }

  private async request<T extends RequestType, U extends ReturnType<T['request']>>(request: T): Promise<U> {
    if (request.method === Method.POST) {
      const url = new URL(request.path, `${this.base_url}/${this.version}/`);
      const headers = ((): Headers => {
        return this.api_token === undefined
          ? new Headers(request.headers)
          : new Headers({
              ...request.headers,
              ...{
                Authorization: `Basic ${this.api_token}`,
              },
            });
      })();
      const response = await fetch(url, {
        body: request.parameters,
        headers: headers,
        method: request.method,
      });
      return request.request(await response.json()) as U;
    } else {
      const url = ((): URL => {
        return request.parameters === undefined
          ? new URL(request.path, `${this.base_url}/${this.version}/`)
          : new URL(`${request.path}?${request.parameters}`, `${this.base_url}/${this.version}/`);
      })();
      const headers = ((): Headers => {
        return this.api_token === undefined
          ? new Headers(request.headers)
          : new Headers({
              ...request.headers,
              ...{
                Authorization: `Basic ${this.api_token}`,
              },
            });
      })();
      const response = await fetch(url, {
        headers: headers,
        method: request.method,
      });
      return request.request(await response.json()) as U;
    }
  }
}
