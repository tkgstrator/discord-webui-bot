import { Expose, Transform, Type, plainToInstance } from 'class-transformer';
import 'reflect-metadata';
import { SamplerType } from './sampler.dto.js';
import { UpscalerType } from './upscaler.dto.js';

class Settings {
  @Expose()
  readonly CLIP_stop_at_last_layers: number;

  @Expose()
  readonly eta_noise_seed_delta: number;
}

export class Txt2ImgParams {
  // alwayson_scripts:                     AlwaysonScripts;
  // do_not_save_grid:                     boolean;
  // do_not_save_samples:                  boolean;
  // firstphase_height:                    number;
  // firstphase_width:                     number;
  // hr_checkpoint_name:                   string;
  // hr_negative_prompt:                   string;
  // hr_prompt:                            string;
  // hr_resize_x:                          number;
  // hr_resize_y:                          number;
  // hr_sampler_name:                      string;
  // n_iter:                               number;
  // override_settings_restore_afterwards: boolean;
  // restore_faces:                        boolean;
  // s_churn:                              number;
  // s_min_uncond:                         number;
  // s_noise:                              number;
  // s_tmax:                               number;
  // s_tmin:                               number;
  // sampler_index:                        string;
  // script_args:                          any[];
  // script_name:                          string;
  // seed_resize_from_h:                   number;
  // seed_resize_from_w:                   number;
  // styles:                               string[];
  // subseed:                              number;
  // subseed_strength:                     number;
  // tiling:                               boolean;
  @Expose()
  readonly batch_size: number;

  @Expose()
  readonly cfg_scale: number;

  @Expose()
  readonly denoising_strength: number;

  @Expose()
  readonly enable_hr: boolean;

  @Expose()
  readonly height: number;

  @Expose()
  readonly hr_scale: number;

  @Expose()
  readonly hr_upscaler: string;

  @Expose()
  readonly negative_prompt: string;

  @Expose()
  readonly prompt: string;

  @Expose()
  readonly sampler_name: SamplerType;

  @Expose()
  readonly save_images: boolean = true;

  @Expose()
  readonly seed: number;

  @Expose()
  readonly hr_second_pass_steps: number;

  @Expose()
  readonly send_images: boolean;

  @Expose()
  readonly steps: number;

  @Expose()
  readonly width: number;

  @Expose()
  @Type(() => Settings)
  readonly override_settings: Settings;

  constructor(
    prompt: string,
    negative_prompt: string,
    batch_size: number = 4,
    cfg_scale: number = 12.0,
    denoising_strength: number = 0.55,
    enable_hr: boolean = true,
    height: number = 768,
    hr_scale: number = 1.5,
    hr_upscaler: UpscalerType = UpscalerType.Anime6B,
    sampler_name: SamplerType = SamplerType.DDIM,
    save_images: boolean = true,
    seed: number = -1,
    send_images: boolean = true,
    steps: number = 28,
    width: number = 512,
  ) {
    this.batch_size = batch_size;
    this.cfg_scale = cfg_scale;
    this.denoising_strength = denoising_strength;
    this.enable_hr = enable_hr;
    this.height = height;
    this.hr_scale = hr_scale;
    this.hr_upscaler = hr_upscaler;
    this.hr_second_pass_steps = steps >> 2;
    this.negative_prompt = negative_prompt;
    this.prompt = prompt;
    this.sampler_name = sampler_name;
    this.save_images = save_images;
    this.seed = seed;
    this.send_images = send_images;
    this.steps = steps;
    this.width = width;
  }
}

class Txt2ImgInfo {
  @Expose()
  readonly prompt: string;

  @Expose()
  readonly negative_prompt: string;

  @Expose()
  readonly seed: number;

  @Expose()
  readonly all_seeds: number[];

  @Expose()
  readonly subseed: number;

  @Expose()
  readonly all_subseeds: number[];

  @Expose()
  readonly width: number;

  @Expose()
  readonly height: number;

  @Expose()
  readonly sampler_name: SamplerType

  @Expose()
  readonly cfg_scale: number;

  @Expose()
  readonly steps: number;

  @Expose()
  readonly batch_size: number;

  @Expose()
  readonly clip_skip: number;
}

export class Txt2ImgResponse {
  @Expose()
  readonly images: string[];

  @Expose()
  @Type(() => Txt2ImgParams)
  readonly parameters: Txt2ImgParams;

  @Expose()
  @Transform(({ value }) =>
    plainToInstance(Txt2ImgInfo, JSON.parse(value), {
      excludeExtraneousValues: true,
    }),
  )
  @Type(() => Txt2ImgInfo)
  readonly info: Txt2ImgInfo;
}
