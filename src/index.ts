import { SDClient } from './client.js'
import { Txt2ImgParams } from './dto/txt2img.dto.js'
const client = new SDClient()

dotenv.config()

const request: Txt2ImgParams = new Txt2ImgParams(
  '1girl, glasses, black long straight hair',
  'EasyNegative,EasyNegativev2,negative_hand-neg',
)
const response = await client.txt2img(request)
