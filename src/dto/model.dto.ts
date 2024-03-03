import { Expose } from 'class-transformer'
import { IsHash, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class SDAPISDModel {
  @Expose()
  @IsString()
  @IsNotEmpty()
  readonly title: string

  @Expose()
  @IsString()
  @IsNotEmpty()
  readonly model_name: string

  @Expose()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly hash: null | string

  @Expose()
  @IsHash('sha256')
  @IsOptional()
  readonly sha256: null | string

  @Expose()
  @IsString()
  @IsNotEmpty()
  readonly filename: string
  // config:     null;
}
