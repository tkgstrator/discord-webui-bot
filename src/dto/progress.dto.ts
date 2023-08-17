import { Expose, Type } from 'class-transformer';
import 'reflect-metadata';

class State {
  @Expose()
  skipped: boolean;

  @Expose()
  interrupted: boolean;

  @Expose()
  job: string;

  @Expose()
  job_count: number;

  @Expose()
  job_timestamp: string;

  @Expose()
  job_no: number;

  @Expose()
  sampling_step: number;

  @Expose()
  sampling_steps: number;
}

export class SDProgress {
  @Expose()
  progress: number;

  @Expose()
  eta_relative: number;

  @Expose()
  @Type(() => State)
  state: State;

  @Expose()
  current_image: null;

  @Expose()
  textinfo: null;
}
