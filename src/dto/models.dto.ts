import { Expose } from 'class-transformer'
import { IsHash, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class SDModel {
  @Expose()
  @IsString()
  @IsNotEmpty()
  title: string

  @Expose()
  @IsString()
  @IsNotEmpty()
  model_name: string

  @Expose()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  hash: null | string

  @Expose()
  @IsHash('sha256')
  @IsOptional()
  sha256: null | string

  @Expose()
  @IsString()
  @IsNotEmpty()
  filename: string
  // config:     null;
}
