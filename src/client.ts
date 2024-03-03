import fetch, { Headers } from 'node-fetch'

import { config } from '@/config'
import { SDModel } from '@/dto/models.dto'
import { Txt2ImgParams, Txt2ImgResponse } from '@/dto/txt2img.dto'
import { RequestType } from '@/request'
import { SDModelsRequest } from '@/requests/sd_models'
import { Txt2ImgRequest } from '@/requests/txt2img'

export class SDClient {
  private static readonly base_url: string = config.SDWEB_API_URL
  private static readonly version: string = config.SDWEB_API_VER

  static async txt2img(request: Txt2ImgParams): Promise<Txt2ImgResponse> {
    return this.request(new Txt2ImgRequest(request))
  }

  static async get_sd_models(): Promise<SDModel[]> {
    return this.request(new SDModelsRequest())
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
