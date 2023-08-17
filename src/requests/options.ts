import { plainToInstance } from 'class-transformer';

import { SDOptions } from '../dto/options.dto.js';
import { Method, RequestType } from '../request.js';

export class GetSDOptionsRequest implements RequestType {
  readonly method: Method = Method.GET;
  readonly path: string = 'options';
  readonly headers: Record<string, string>;
  readonly parameters: string | URLSearchParams | undefined;

  constructor() {}

  request(response: any): SDOptions {
    return plainToInstance(SDOptions, response, {
      excludeExtraneousValues: true,
    });
  }
}

export class SetSDOptionsRequest implements RequestType {
  readonly method: Method = Method.POST;
  readonly path: string = 'options';
  readonly headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  readonly parameters: string | URLSearchParams | undefined;

  constructor(options: SDOptions) {
    this.parameters = JSON.stringify(options);
  }

  request(response: any): boolean {
    return plainToInstance(SDOptions, response, { excludeExtraneousValues: true }) == null;
  }
}
