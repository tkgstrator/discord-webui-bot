import { plainToInstance } from 'class-transformer';

import { SamplerType } from '../dto/sampler.dto.js';
import { Txt2ImgParams, Txt2ImgResponse } from '../dto/txt2img.dto.js';
import { UpscalerType } from '../dto/upscaler.dto.js';
import { Method, RequestType } from '../request.js';

export class Txt2ImgRequest implements RequestType {
  readonly method: Method = Method.POST;
  readonly path: string = 'txt2img';
  readonly headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  readonly parameters: string | URLSearchParams | undefined;

  constructor(parameters: Partial<Txt2ImgParams>) {
    /**
     * Hires stepsは実ステップの半分
     */
    const params: Partial<Txt2ImgParams> = {
      batch_size: 4,
      cfg_scale: 12.0,
      denoising_strength: 0.55,
      height: 768,
      hr_second_pass_steps: (parameters.steps || 20) >> 1,
      hr_upscaler: UpscalerType.Anime6B,
      sampler_name: SamplerType.DPM2MSDEKarras,
      save_images: true,
      seed: -1,
      send_images: true,
      steps: 20,
      width: 512,
    };
    this.parameters = JSON.stringify({
      ...params,
      ...parameters,
    });
  }

  request(response: any): Txt2ImgResponse {
    return plainToInstance(Txt2ImgResponse, response, {
      excludeExtraneousValues: true,
    });
  }
}
