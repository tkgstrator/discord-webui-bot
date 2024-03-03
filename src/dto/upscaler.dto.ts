import { Expose } from 'class-transformer'

export class SDAPIUpcaler {
  @Expose()
  readonly name: string

  @Expose()
  readonly model_name: null | string

  @Expose()
  readonly model_path: null | string

  @Expose()
  readonly model_url: null

  @Expose()
  readonly scale: number
}
