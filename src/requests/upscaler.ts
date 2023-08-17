import { plainToInstance } from 'class-transformer';

import { Upscaler } from '../dto/upscaler.dto.js';
import { Method, RequestType } from '../request.js';

export class UpscalerRequest implements RequestType {
  readonly method: Method = Method.GET;
  readonly path: string = 'upscalers';
  readonly headers: Record<string, string>;
  readonly parameters: string | URLSearchParams | undefined;

  constructor() {}

  request(response: any): Upscaler[] {
    return response.map((res: any) => plainToInstance(Upscaler, res, { excludeExtraneousValues: true }));
  }
}
