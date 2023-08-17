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
