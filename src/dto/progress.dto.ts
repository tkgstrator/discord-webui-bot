export interface Progress {
  current_image: null
  eta_relative: number
  progress: number
  state: State
  textinfo: null
}

export interface State {
  interrupted: boolean
  job: string
  job_count: number
  job_no: number
  job_timestamp: string
  sampling_step: number
  sampling_steps: number
  skipped: boolean
}
