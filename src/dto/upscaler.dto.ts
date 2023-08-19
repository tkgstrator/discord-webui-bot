import { Expose } from 'class-transformer';

export class Upscaler {
  @Expose()
  name: string;

  @Expose()
  model_name: null | string;

  @Expose()
  model_path: null | string;

  @Expose()
  model_url: null;

  @Expose()
  scale: number;
}

export enum UpscalerType {
  Latent = 'Latent',
  Anime6B = 'R-ESRGAN 4x+ Anime6B',
  Anime500000G = '4x_fatal_Anime_500000_G',
  SwinIR = 'SwinIR_4x'
}
