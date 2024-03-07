import { plainToInstance } from 'class-transformer'

import txt2img from './txt2img.json'

import { SDClient } from '@/client'
import { SDAPITxt2Img } from '@/dto/txt2img.dto'

describe('Txt2Img', () => {
  beforeAll(() => {})

  it('Request', async () => {
    const request: SDAPITxt2Img.Request = plainToInstance(SDAPITxt2Img.Request, txt2img)
    const response = await SDClient.txt2img(request)
    expect(response.images.length).toEqual(3)
    expect(response.parameters.prompt).toEqual(request.prompt)
    expect(response.parameters.negative_prompt).toEqual(request.negative_prompt)
    expect(response.parameters.sampler_name).toEqual(request.sampler_name)
    expect(response.parameters.styles).toEqual(request.styles)
    expect(response.parameters.alwayson_scripts).toEqual(request.alwayson_scripts)
    expect(response.parameters.batch_size).toEqual(request.batch_size)
    expect(response.parameters.cfg_scale).toEqual(request.cfg_scale)
    expect(response.parameters.enable_hr).toEqual(request.enable_hr)
    expect(response.parameters.height).toEqual(request.height)
    expect(response.parameters.hr_scale).toEqual(request.hr_scale)
    expect(response.parameters.hr_upscaler).toEqual(request.hr_upscaler)
    expect(response.parameters.save_images).toEqual(request.save_images)
    expect(response.parameters.seed).toEqual(request.seed)
    expect(response.parameters.steps).toEqual(request.steps)
    expect(response.parameters.width).toEqual(request.width)
  }, 20000)
})
