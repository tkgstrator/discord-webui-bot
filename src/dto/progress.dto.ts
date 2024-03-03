export interface Progress {
  readonly current_image: null
  readonly eta_relative: number
  readonly progress: number
  readonly state: State
  readonly textinfo: null
}

export interface State {
  readonly interrupted: boolean
  readonly job: string
  readonly job_count: number
  readonly job_no: number
  readonly job_timestamp: string
  readonly sampling_step: number
  readonly sampling_steps: number
  readonly skipped: boolean
}
