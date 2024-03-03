import { plainToInstance } from 'class-transformer'

import txt2img from './txt2img.json'

import { SDClient } from '@/client'
import { SDAPITxt2Img } from '@/dto/txt2img.dto'

describe('Txt2Img', () => {
  beforeAll(() => {})

  it('Request', async () => {
    const request = plainToInstance(SDAPITxt2Img.Request, txt2img)
    const response = await SDClient.txt2img(request)
  })
})
