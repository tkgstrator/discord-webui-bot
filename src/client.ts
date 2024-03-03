import fetch, { Headers } from 'node-fetch'

import { SDAPIOption } from './dto/options.dto'
import { SDAPISampler } from './dto/samplers.dto'
import { SDAPISDModel } from './dto/sd_model.dto'
import { SDAPITxt2Img } from './dto/txt2img.dto'
import { SDAPIUpcaler } from './dto/upscaler.dto'
import { SDOptionsRequest } from './requests/options'
import { SDSamplerRequest } from './requests/samplers'
import { SDModelsRequest } from './requests/sd_models'
import { SDTxt2ImgRequest } from './requests/txt2img'
import { SDUpscalerRequest } from './requests/upscaler'

import { config } from '@/config'
import { RequestType } from '@/request'

export class SDClient {
  private static readonly base_url: string = config.SDWEB_API_URL
  private static readonly version: string = config.SDWEB_API_VER

  static async txt2img(request: SDAPITxt2Img.Request): Promise<SDAPITxt2Img.Response> {
    return this.request(new SDTxt2ImgRequest(request))
  }

  static async get_sd_models(): Promise<SDAPISDModel[]> {
    return this.request(new SDModelsRequest())
  }

  static async get_sd_options(): Promise<SDAPIOption> {
    return this.request(new SDOptionsRequest())
  }

  static async get_sd_samplers(): Promise<SDAPISampler[]> {
    return this.request(new SDSamplerRequest())
  }

  static async get_sd_upscalers(): Promise<SDAPIUpcaler[]> {
    return this.request(new SDUpscalerRequest())
  }

  private static async request<T extends RequestType, U extends ReturnType<T['request']>>(request: T): Promise<U> {
    try {
      const url = new URL(request.path, `${this.base_url}/${this.version}/`)
      const headers = new Headers({
        ...request.headers,
        'CF-Access-Client-Id': config.CLOUDFLARE_ACCESS_CLIENT_ID,
      })
      const response = await fetch(url, {
        body: request.parameters,
        headers: headers,
        method: request.method,
      })
      return request.request(await response.json()) as U
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
