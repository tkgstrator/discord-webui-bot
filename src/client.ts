import * as dotenv from 'dotenv'
import fetch, { Headers } from 'node-fetch'

import { SDModel } from './dto/models.dto.js'
import { Txt2ImgParams, Txt2ImgResponse } from './dto/txt2img.dto.js'
import { RequestType } from './request.js'
import { SDModelsRequest } from './requests/sd_models.js'
import { Txt2ImgRequest } from './requests/txt2img.js'

dotenv.config()

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

  async get_sd_models(): Promise<SDModel[]> {
    return this.request(new SDModelsRequest())
  }

  private async request<T extends RequestType, U extends ReturnType<T['request']>>(request: T): Promise<U> {
    try {
      const url = new URL(request.path, `${this.base_url}/${this.version}/`)
      const headers = new Headers(request.headers)
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
