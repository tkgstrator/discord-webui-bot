import { Expose, Transform, Type } from 'class-transformer'

class Options {
  @Expose()
  @Transform(({ value }) => value === 'True')
  uses_ensd?: boolean

  @Expose()
  @Transform(({ value }) => value === 'True')
  second_order?: boolean

  @Expose()
  @Transform(({ value }) => value === 'True')
  discard_next_to_last_sigma?: boolean

  @Expose()
  @Transform(({ value }) => value === 'True')
  brownian_noise?: boolean

  @Expose()
  @Transform(({ value }) => value === 'True')
  scheduler?: string

  @Expose()
  @Transform(({ value }) => value === 'True')
  default_eta_is_0?: boolean

  @Expose()
  @Transform(({ value }) => value === 'True')
  no_sdxl?: string
}

export class Sampler {
  @Expose()
  name: string

  @Expose()
  aliases: string[]

  @Expose()
  @Type(() => Options)
  options: Options
}

export enum SamplerType {
  DPM2Sa = 'DPM++ 2S a',
  DPM2MKarras = 'DPM++ 2M Karras',
  DPM2MSDEKarras = 'DPM++ 2M SDE Karras',
  DDIM = 'DDIM',
}
