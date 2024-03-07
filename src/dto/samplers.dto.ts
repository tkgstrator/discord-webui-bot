import { Expose, Type } from 'class-transformer'
import 'reflect-metadata'

enum BrownianNoise {
  TRUE = 'True',
  FALSE = 'False',
}

enum Scheduler {
  KARRAS = 'karras',
  EXPONENTIAL = 'exponential',
}

export class SDAPISampler {
  @Expose()
  readonly aliases: string[]

  @Expose()
  readonly name: string

  @Expose()
  @Type(() => SDAPISamplerOption)
  readonly options: SDAPISamplerOption
}

class SDAPISamplerOption {
  @Expose()
  readonly brownian_noise: BrownianNoise | undefined

  @Expose()
  readonly discard_next_to_last_sigma: BrownianNoise | undefined

  @Expose()
  readonly scheduler: Scheduler | undefined

  @Expose()
  readonly second_order: BrownianNoise | undefined

  @Expose()
  readonly solver_type: string | undefined

  @Expose()
  readonly uses_ensd: BrownianNoise | undefined
}
