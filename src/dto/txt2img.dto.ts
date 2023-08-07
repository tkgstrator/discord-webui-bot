import { Expose, Transform, Type } from "class-transformer";
import "reflect-metadata";

export class Txt2ImgParams {
    // alwayson_scripts:                     AlwaysonScripts;
    // do_not_save_grid:                     boolean;
    // do_not_save_samples:                  boolean;
    // firstphase_height:                    number;
    // firstphase_width:                     number;
    // hr_checkpoint_name:                   string;
    // hr_negative_prompt:                   string;
    // hr_prompt:                            string;
    // hr_resize_x:                          number;
    // hr_resize_y:                          number;
    // hr_sampler_name:                      string;
    // n_iter:                               number;
    // override_settings:                    AlwaysonScripts;
    // override_settings_restore_afterwards: boolean;
    // restore_faces:                        boolean;
    // s_churn:                              number;
    // s_min_uncond:                         number;
    // s_noise:                              number;
    // s_tmax:                               number;
    // s_tmin:                               number;
    // sampler_index:                        string;
    // script_args:                          any[];
    // script_name:                          string;
    // seed_resize_from_h:                   number;
    // seed_resize_from_w:                   number;
    // styles:                               string[];
    // subseed:                              number;
    // subseed_strength:                     number;
    // tiling:                               boolean;
    @Expose()
    readonly batch_size: number;

    @Expose()
    readonly cfg_scale: number;

    @Expose()
    readonly denoising_strength: number;

    @Expose()
    readonly enable_hr: boolean;

    @Expose()
    readonly height: number;

    @Expose()
    readonly hr_scale: number;

    @Expose()
    readonly hr_upscaler: string;
    
    @Expose()
    readonly negative_prompt: string;

    @Expose()
    readonly prompt: string;

    @Expose()
    readonly sampler_name: string;

    @Expose()
    readonly save_images: boolean;

    @Expose()
    readonly seed: number;
    
    @Expose()
    hr_second_pass_steps: number;

    @Expose()
    readonly send_images: boolean;

    @Expose()
    readonly steps: number;

    @Expose()
    readonly width: number;

    constructor(
        prompt: string,
        negative_prompt: string,
        batch_size: number = 4,
        cfg_scale: number = 12.0,
        denoising_strength: number = 0.55,
        enable_hr: boolean = true,
        height: number = 768,
        hr_scale: number = 1.5,
        hr_upscaler: string = "Latent",
        sampler_name: string = "DPM++ 2S a",
        save_images: boolean = true,
        seed: number = -1,
        send_images: boolean = true,
        steps: number = 28,
        width: number = 512
    ) {
        this.batch_size = batch_size
        this.cfg_scale = cfg_scale
        this.denoising_strength = denoising_strength
        this.enable_hr = enable_hr
        this.height = height
        this.hr_scale = hr_scale
        this.hr_upscaler = hr_upscaler
        this.hr_second_pass_steps = steps >> 2
        this.negative_prompt = negative_prompt
        this.prompt = prompt
        this.sampler_name = sampler_name
        this.save_images = save_images
        this.seed = seed
        this.send_images = send_images
        this.steps = steps
        this.width = width
    }
}

export class Txt2ImgResponse {
    @Expose()
    readonly images: string[];
    
    @Expose()
    @Type(() => Txt2ImgParams)
    readonly parameters: Txt2ImgParams;
    
    @Expose()
    readonly info: string
}
