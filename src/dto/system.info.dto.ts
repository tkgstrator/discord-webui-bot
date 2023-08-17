import { Expose, Type } from 'class-transformer';

class Device {
  @Expose()
  active: string;

  @Expose()
  dtype: string;

  @Expose()
  vae: string;

  @Expose()
  unet: string;
}

class SystemInfoGPU {
  @Expose()
  device: string;

  @Expose()
  cuda: string;

  @Expose()
  cudnn: number;

  @Expose()
  driver: string;
}

class Events {
  @Expose()
  retries: number;

  @Expose()
  oom: number;
}

class RAMClass {
  @Expose()
  free: number;

  @Expose()
  used: number;

  @Expose()
  total: number;
}

class GPU {
  @Expose()
  current: number;

  @Expose()
  peak: number;
}

class Platform {
  @Expose()
  arch: string;

  @Expose()
  cpu: string;

  @Expose()
  system: string;

  @Expose()
  release: string;

  @Expose()
  python: string;
}

class Memory {
  @Expose()
  @Type(() => RAMClass)
  ram: RAMClass;

  @Expose()
  @Type(() => RAMClass)
  gpu: RAMClass;

  @Expose({ name: 'gpu-active' })
  @Type(() => GPU)
  gpu_active: GPU;

  @Expose({ name: 'gpu-allocated' })
  @Type(() => GPU)
  gpu_allocated: GPU;

  @Expose({ name: 'gpu-reserved' })
  @Type(() => GPU)
  gpu_reserved: GPU;

  @Expose({ name: 'gpu-inactive' })
  @Type(() => GPU)
  gpu_inactive: GPU;

  @Expose()
  @Type(() => Events)
  events: Events;

  @Expose()
  utilization: number;
}

class State {
  @Expose()
  started: string;

  @Expose()
  step: string;

  @Expose()
  jobs: string;

  @Expose()
  flags: string;

  @Expose()
  job: string;

  // @Expose({ name: "text-info" })
  // text_info: null;
}

class Version {
  @Expose()
  app: string;

  @Expose()
  updated: Date;

  @Expose()
  hash: string;

  @Expose()
  url: string;
}

export class SystemInfoResponse {
  @Expose()
  @Type(() => Version)
  version: Version;

  @Expose()
  uptime: string;

  @Expose()
  timestamp: string;

  @Expose()
  @Type(() => State)
  state: State;

  @Expose()
  @Type(() => Memory)
  memory: Memory;

  @Expose()
  @Type(() => Platform)
  platform: Platform;

  @Expose()
  torch: string;

  @Expose()
  @Type(() => SystemInfoGPU)
  gpu: SystemInfoGPU;

  @Expose()
  optimizations: string[];

  @Expose()
  crossatention: string;

  @Expose()
  @Type(() => Device)
  device: Device;

  @Expose()
  backend: string;

  @Expose()
  pipeline: string;
}
