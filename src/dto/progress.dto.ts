export interface Progress {
    progress:      number;
    eta_relative:  number;
    state:         State;
    current_image: null;
    textinfo:      null;
}

export interface State {
    skipped:        boolean;
    interrupted:    boolean;
    job:            string;
    job_count:      number;
    job_timestamp:  string;
    job_no:         number;
    sampling_step:  number;
    sampling_steps: number;
}
