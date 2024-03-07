import { Expose, Transform, Type, plainToInstance } from 'class-transformer'
import { IsArray, IsBase64 } from 'class-validator'
import 'reflect-metadata'

class APIPayload {
  @Expose()
  readonly args: Array<boolean | number | string>
}

class Comments {}

class AlwaysonScripts {
  @Expose()
  @Type(() => APIPayload)
  readonly 'API payload': APIPayload

  @Expose()
  @Type(() => APIPayload)
  readonly 'Danbooru Tags Upsampler': APIPayload

  @Expose()
  @Type(() => APIPayload)
  readonly 'Dynamic Prompts v2.17.1': APIPayload

  @Expose()
  @Type(() => APIPayload)
  readonly 'Extra options': APIPayload

  @Expose()
  @Type(() => APIPayload)
  readonly Hypertile: APIPayload

  @Expose()
  @Type(() => APIPayload)
  readonly Refiner: APIPayload

  @Expose()
  @Type(() => APIPayload)
  readonly Seed: APIPayload

  @Expose()
  @Type(() => APIPayload)
  readonly TensorRT: APIPayload
}

export namespace SDAPITxt2Img {
  export class Param implements Partial<SDAPITxt2Img.Request> {
    @Expose()
    @Type(() => AlwaysonScripts)
    readonly alwayson_scripts: AlwaysonScripts

    @Expose()
    readonly batch_size: number

    @Expose()
    readonly cfg_scale: number

    @Expose()
    readonly enable_hr: boolean

    @Expose()
    readonly height: number

    @Expose()
    readonly hr_scale: number

    @Expose()
    readonly hr_upscaler: string

    @Expose()
    readonly negative_prompt: string

    @Expose()
    readonly prompt: string

    @Expose()
    readonly sampler_name: string

    @Expose()
    readonly save_images: boolean

    @Expose()
    readonly seed: number

    @Expose()
    readonly steps: number

    @Expose()
    readonly styles: string[]

    @Expose()
    readonly width: number
  }

  export class Request {
    @Expose()
    @Type(() => AlwaysonScripts)
    readonly alwayson_scripts: AlwaysonScripts

    @Expose()
    readonly batch_size: number

    @Expose()
    readonly cfg_scale: number

    @Expose()
    @Type(() => Comments)
    readonly comments: Comments

    @Expose()
    readonly disable_extra_networks: boolean

    @Expose()
    readonly do_not_save_grid: boolean

    @Expose()
    readonly do_not_save_samples: boolean

    @Expose()
    readonly enable_hr: boolean

    @Expose()
    readonly height: number

    @Expose()
    readonly hr_negative_prompt: string

    @Expose()
    readonly hr_prompt: string

    @Expose()
    readonly hr_resize_x: number

    @Expose()
    readonly hr_resize_y: number

    @Expose()
    readonly hr_scale: number

    @Expose()
    readonly hr_second_pass_steps: number

    @Expose()
    readonly hr_upscaler: string

    @Expose()
    readonly n_iter: number

    @Expose()
    readonly negative_prompt: string

    @Expose()
    @Type(() => Comments)
    readonly override_settings: Comments

    @Expose()
    readonly override_settings_restore_afterwards: boolean

    @Expose()
    readonly prompt: string

    @Expose()
    readonly restore_faces: boolean

    @Expose()
    readonly s_churn: number

    @Expose()
    readonly s_min_uncond: number

    @Expose()
    readonly s_noise: number

    @Expose()
    readonly s_tmax: null

    @Expose()
    readonly s_tmin: number

    @Expose()
    readonly sampler_name: string

    @Expose()
    readonly save_images: boolean

    @Expose()
    readonly send_images: boolean

    @Expose()
    readonly script_args: any[]

    @Expose()
    readonly script_name: null

    @Expose()
    readonly seed: number

    @Expose()
    readonly seed_enable_extras: boolean

    @Expose()
    readonly seed_resize_from_h: number

    @Expose()
    readonly seed_resize_from_w: number

    @Expose()
    readonly steps: number

    @Expose()
    readonly styles: string[]

    @Expose()
    readonly subseed: number

    @Expose()
    readonly subseed_strength: number

    @Expose()
    readonly tiling: boolean

    @Expose()
    readonly width: number
  }

  export class Response {
    get buffers(): Buffer[] {
      return this.images.map((image) => Buffer.from(image, 'base64'))
    }

    @Expose()
    @IsBase64(undefined, { each: true })
    @IsArray()
    readonly images: string[]

    @Expose()
    @Type(() => SDAPITxt2Img.Request)
    readonly parameters: SDAPITxt2Img.Request

    @Expose()
    @Transform(({ value }) =>
      plainToInstance(SDAPITxt2Img.Request, JSON.parse(value), { excludeExtraneousValues: true }),
    )
    @Type(() => SDAPITxt2Img.Request)
    readonly info: SDAPITxt2Img.Request
  }
}
