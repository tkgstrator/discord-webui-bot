import { plainToInstance } from 'class-transformer';

import { SDProgress } from '../dto/progress.dto.js';
import { Method, RequestType } from '../request.js';

export class ProgressRequest implements RequestType {
  readonly method: Method = Method.GET;
  readonly path: string = 'progress';
  readonly headers: Record<string, string>;
  readonly parameters: string | URLSearchParams | undefined;

  constructor(skip_current_image: boolean) {
    this.parameters = new URLSearchParams({
      skip_current_image: skip_current_image.toString(),
    });
  }

  request(response: any): SDProgress {
    return plainToInstance(SDProgress, response, {
      excludeExtraneousValues: true,
    });
  }
}
