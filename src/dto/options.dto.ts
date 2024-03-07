import { Expose } from 'class-transformer'

export class SDAPIOptions {
  @Expose()
  readonly samples_save: boolean

  @Expose()
  readonly samples_format: string

  @Expose()
  readonly samples_filename_pattern: string

  @Expose()
  readonly save_images_add_number: boolean

  @Expose()
  readonly save_images_replace_action: string

  @Expose()
  readonly grid_save: boolean

  @Expose()
  readonly grid_format: string

  @Expose()
  readonly grid_extended_filename: boolean

  @Expose()
  readonly grid_only_if_multiple: boolean

  @Expose()
  readonly grid_prevent_empty_spots: boolean

  @Expose()
  readonly grid_zip_filename_pattern: string

  @Expose()
  readonly n_rows: number

  @Expose()
  readonly font: string

  @Expose()
  readonly grid_text_active_color: string

  @Expose()
  readonly grid_text_inactive_color: string

  @Expose()
  readonly grid_background_color: string

  @Expose()
  readonly save_images_before_face_restoration: boolean

  @Expose()
  readonly save_images_before_highres_fix: boolean

  @Expose()
  readonly save_images_before_color_correction: boolean

  @Expose()
  readonly save_mask: boolean

  @Expose()
  readonly save_mask_composite: boolean

  @Expose()
  readonly jpeg_quality: number

  @Expose()
  readonly webp_lossless: boolean

  @Expose()
  readonly export_for_4chan: boolean

  @Expose()
  readonly img_downscale_threshold: number

  @Expose()
  readonly target_side_length: number

  @Expose()
  readonly img_max_size_mp: number

  @Expose()
  readonly use_original_name_batch: boolean

  @Expose()
  readonly use_upscaler_name_as_suffix: boolean

  @Expose()
  readonly save_selected_only: boolean

  @Expose()
  readonly save_init_img: boolean

  @Expose()
  readonly temp_dir: string

  @Expose()
  readonly clean_temp_dir_at_start: boolean

  @Expose()
  readonly save_incomplete_images: boolean

  @Expose()
  readonly notification_audio: boolean

  @Expose()
  readonly notification_volume: number

  @Expose()
  readonly outdir_samples: string

  @Expose()
  readonly outdir_txt2img_samples: string

  @Expose()
  readonly outdir_img2img_samples: string

  @Expose()
  readonly outdir_extras_samples: string

  @Expose()
  readonly outdir_grids: string

  @Expose()
  readonly outdir_txt2img_grids: string

  @Expose()
  readonly outdir_img2img_grids: string

  @Expose()
  readonly outdir_save: string

  @Expose()
  readonly outdir_init_images: string

  @Expose()
  readonly save_to_dirs: boolean

  @Expose()
  readonly grid_save_to_dirs: boolean

  @Expose()
  readonly use_save_to_dirs_for_ui: boolean

  @Expose()
  readonly directories_filename_pattern: string

  @Expose()
  readonly directories_max_prompt_words: number

  @Expose()
  readonly ESRGAN_tile: number

  @Expose()
  readonly ESRGAN_tile_overlap: number

  @Expose()
  readonly realesrgan_enabled_models: string[]

  @Expose()
  readonly upscaler_for_img2img: null

  @Expose()
  readonly face_restoration: boolean

  @Expose()
  readonly face_restoration_model: string

  @Expose()
  readonly code_former_weight: number

  @Expose()
  readonly face_restoration_unload: boolean

  @Expose()
  readonly auto_launch_browser: string

  @Expose()
  readonly enable_console_prompts: boolean

  @Expose()
  readonly show_warnings: boolean

  @Expose()
  readonly show_gradio_deprecation_warnings: boolean

  @Expose()
  readonly memmon_poll_rate: number

  @Expose()
  readonly samples_log_stdout: boolean

  @Expose()
  readonly multiple_tqdm: boolean

  @Expose()
  readonly print_hypernet_extra: boolean

  @Expose()
  readonly list_hidden_files: boolean

  @Expose()
  readonly disable_mmap_load_safetensors: boolean

  @Expose()
  readonly hide_ldm_prints: boolean

  @Expose()
  readonly dump_stacks_on_signal: boolean

  @Expose()
  readonly api_enable_requests: boolean

  @Expose()
  readonly api_forbid_local_requests: boolean

  @Expose()
  readonly api_useragent: string

  @Expose()
  readonly unload_models_when_training: boolean

  @Expose()
  readonly pin_memory: boolean

  @Expose()
  readonly save_optimizer_state: boolean

  @Expose()
  readonly save_training_settings_to_txt: boolean

  @Expose()
  readonly dataset_filename_word_regex: string

  @Expose()
  readonly dataset_filename_join_string: string

  @Expose()
  readonly training_image_repeats_per_epoch: number

  @Expose()
  readonly training_write_csv_every: number

  @Expose()
  readonly training_xattention_optimizations: boolean

  @Expose()
  readonly training_enable_tensorboard: boolean

  @Expose()
  readonly training_tensorboard_save_images: boolean

  @Expose()
  readonly training_tensorboard_flush_every: number

  @Expose()
  readonly sd_model_checkpoint: string

  @Expose()
  readonly sd_checkpoints_limit: number

  @Expose()
  readonly sd_checkpoints_keep_in_cpu: boolean

  @Expose()
  readonly sd_checkpoint_cache: number

  @Expose()
  readonly sd_unet: string

  @Expose()
  readonly enable_quantization: boolean

  @Expose()
  readonly enable_emphasis: boolean

  @Expose()
  readonly enable_batch_seeds: boolean

  @Expose()
  readonly comma_padding_backtrack: number

  @Expose()
  readonly CLIP_stop_at_last_layers: number

  @Expose()
  readonly upcast_attn: boolean

  @Expose()
  readonly randn_source: string

  @Expose()
  readonly tiling: boolean

  @Expose()
  readonly hires_fix_refiner_pass: string

  @Expose()
  readonly sdxl_crop_top: number

  @Expose()
  readonly sdxl_crop_left: number

  @Expose()
  readonly sdxl_refiner_low_aesthetic_score: number

  @Expose()
  readonly sdxl_refiner_high_aesthetic_score: number

  @Expose()
  readonly sd_vae_explanation: string

  @Expose()
  readonly sd_vae_checkpoint_cache: number

  @Expose()
  readonly sd_vae: string

  @Expose()
  readonly sd_vae_overrides_per_model_preferences: boolean

  @Expose()
  readonly auto_vae_precision: boolean

  @Expose()
  readonly sd_vae_encode_method: string

  @Expose()
  readonly sd_vae_decode_method: string

  @Expose()
  readonly inpainting_mask_weight: number

  @Expose()
  readonly initial_noise_multiplier: number

  @Expose()
  readonly img2img_extra_noise: number

  @Expose()
  readonly img2img_color_correction: boolean

  @Expose()
  readonly img2img_fix_steps: boolean

  @Expose()
  readonly img2img_background_color: string

  @Expose()
  readonly img2img_editor_height: number

  @Expose()
  readonly img2img_sketch_default_brush_color: string

  @Expose()
  readonly img2img_inpaint_mask_brush_color: string

  @Expose()
  readonly img2img_inpaint_sketch_default_brush_color: string

  @Expose()
  readonly return_mask: boolean

  @Expose()
  readonly return_mask_composite: boolean

  @Expose()
  readonly img2img_batch_show_results_limit: number

  @Expose()
  readonly cross_attention_optimization: string

  @Expose()
  readonly s_min_uncond: number

  @Expose()
  readonly token_merging_ratio: number

  @Expose()
  readonly token_merging_ratio_img2img: number

  @Expose()
  readonly token_merging_ratio_hr: number

  @Expose()
  readonly pad_cond_uncond: boolean

  @Expose()
  readonly persistent_cond_cache: boolean

  @Expose()
  readonly batch_cond_uncond: boolean

  @Expose()
  readonly use_old_emphasis_implementation: boolean

  @Expose()
  readonly use_old_karras_scheduler_sigmas: boolean

  @Expose()
  readonly no_dpmpp_sde_batch_determinism: boolean

  @Expose()
  readonly use_old_hires_fix_width_height: boolean

  @Expose()
  readonly dont_fix_second_order_samplers_schedule: boolean

  @Expose()
  readonly hires_fix_use_firstpass_conds: boolean

  @Expose()
  readonly use_old_scheduling: boolean

  @Expose()
  readonly interrogate_keep_models_in_memory: boolean

  @Expose()
  readonly interrogate_return_ranks: boolean

  @Expose()
  readonly interrogate_clip_num_beams: number

  @Expose()
  readonly interrogate_clip_min_length: number

  @Expose()
  readonly interrogate_clip_max_length: number

  @Expose()
  readonly interrogate_clip_dict_limit: number

  @Expose()
  readonly interrogate_clip_skip_categories: any[]

  @Expose()
  readonly interrogate_deepbooru_score_threshold: number

  @Expose()
  readonly deepbooru_sort_alpha: boolean

  @Expose()
  readonly deepbooru_use_spaces: boolean

  @Expose()
  readonly deepbooru_escape: boolean

  @Expose()
  readonly deepbooru_filter_tags: string

  @Expose()
  readonly extra_networks_show_hidden_directories: boolean

  @Expose()
  readonly extra_networks_dir_button_function: boolean

  @Expose()
  readonly extra_networks_hidden_models: string

  @Expose()
  readonly extra_networks_default_multiplier: number

  @Expose()
  readonly extra_networks_card_width: number

  @Expose()
  readonly extra_networks_card_height: number

  @Expose()
  readonly extra_networks_card_text_scale: number

  @Expose()
  readonly extra_networks_card_show_desc: boolean

  @Expose()
  readonly extra_networks_card_order_field: string

  @Expose()
  readonly extra_networks_card_order: string

  @Expose()
  readonly extra_networks_add_text_separator: string

  @Expose()
  readonly ui_extra_networks_tab_reorder: string

  @Expose()
  readonly textual_inversion_print_at_load: boolean

  @Expose()
  readonly textual_inversion_add_hashes_to_infotext: boolean

  @Expose()
  readonly sd_hypernetwork: string

  @Expose()
  readonly keyedit_precision_attention: number

  @Expose()
  readonly keyedit_precision_extra: number

  @Expose()
  readonly keyedit_delimiters: string

  @Expose()
  readonly keyedit_delimiters_whitespace: string[]

  @Expose()
  readonly keyedit_move: boolean

  @Expose()
  readonly disable_token_counters: boolean

  @Expose()
  readonly return_grid: boolean

  @Expose()
  readonly do_not_show_images: boolean

  @Expose()
  readonly js_modal_lightbox: boolean

  @Expose()
  readonly js_modal_lightbox_initially_zoomed: boolean

  @Expose()
  readonly js_modal_lightbox_gamepad: boolean

  @Expose()
  readonly js_modal_lightbox_gamepad_repeat: number

  @Expose()
  readonly gallery_height: string

  @Expose()
  readonly compact_prompt_box: boolean

  @Expose()
  readonly samplers_in_dropdown: boolean

  @Expose()
  readonly dimensions_and_batch_together: boolean

  @Expose()
  readonly sd_checkpoint_dropdown_use_short: boolean

  @Expose()
  readonly hires_fix_show_sampler: boolean

  @Expose()
  readonly hires_fix_show_prompts: boolean

  @Expose()
  readonly txt2img_settings_accordion: boolean

  @Expose()
  readonly img2img_settings_accordion: boolean

  @Expose()
  readonly localization: string

  @Expose()
  readonly quicksettings_list: string[]

  @Expose()
  readonly ui_tab_order: any[]

  @Expose()
  readonly hidden_tabs: string[]

  @Expose()
  readonly ui_reorder_list: any[]

  @Expose()
  readonly gradio_theme: string

  @Expose()
  readonly gradio_themes_cache: boolean

  @Expose()
  readonly show_progress_in_title: boolean

  @Expose()
  readonly send_seed: boolean

  @Expose()
  readonly send_size: boolean

  @Expose()
  readonly infotext_explanation: string

  @Expose()
  readonly enable_pnginfo: boolean

  @Expose()
  readonly save_txt: boolean

  @Expose()
  readonly add_model_name_to_info: boolean

  @Expose()
  readonly add_model_hash_to_info: boolean

  @Expose()
  readonly add_vae_name_to_info: boolean

  @Expose()
  readonly add_vae_hash_to_info: boolean

  @Expose()
  readonly add_user_name_to_info: boolean

  @Expose()
  readonly add_version_to_infotext: boolean

  @Expose()
  readonly disable_weights_auto_swap: boolean

  @Expose()
  readonly infotext_skip_pasting: any[]

  @Expose()
  readonly infotext_styles: string

  @Expose()
  readonly show_progressbar: boolean

  @Expose()
  readonly live_previews_enable: boolean

  @Expose()
  readonly live_previews_image_format: string

  @Expose()
  readonly show_progress_grid: boolean

  @Expose()
  readonly show_progress_every_n_steps: number

  @Expose()
  readonly show_progress_type: string

  @Expose()
  readonly live_preview_allow_lowvram_full: boolean

  @Expose()
  readonly live_preview_content: string

  @Expose()
  readonly live_preview_refresh_period: number

  @Expose()
  readonly live_preview_fast_interrupt: boolean

  @Expose()
  readonly js_live_preview_in_modal_lightbox: boolean

  @Expose()
  readonly hide_samplers: any[]

  @Expose()
  readonly eta_ddim: number

  @Expose()
  readonly eta_ancestral: number

  @Expose()
  readonly ddim_discretize: string

  @Expose()
  readonly s_churn: number

  @Expose()
  readonly s_tmin: number

  @Expose()
  readonly s_tmax: number

  @Expose()
  readonly s_noise: number

  @Expose()
  readonly k_sched_type: string

  @Expose()
  readonly sigma_min: number

  @Expose()
  readonly sigma_max: number

  @Expose()
  readonly rho: number

  @Expose()
  readonly eta_noise_seed_delta: number

  @Expose()
  readonly always_discard_next_to_last_sigma: boolean

  @Expose()
  readonly sgm_noise_multiplier: boolean

  @Expose()
  readonly uni_pc_variant: string

  @Expose()
  readonly uni_pc_skip_type: string

  @Expose()
  readonly uni_pc_order: number

  @Expose()
  readonly uni_pc_lower_order_final: boolean

  @Expose()
  readonly postprocessing_enable_in_main_ui: any[]

  @Expose()
  readonly postprocessing_operation_order: any[]

  @Expose()
  readonly upscaling_max_images_in_cache: number

  @Expose()
  readonly postprocessing_existing_caption_action: string

  @Expose()
  readonly disabled_extensions: any[]

  @Expose()
  readonly disable_all_extensions: string

  @Expose()
  readonly restore_config_state_file: string

  @Expose()
  readonly sd_checkpoint_hash: string

  @Expose()
  readonly sd_lora: string

  @Expose()
  readonly lora_preferred_name: string

  @Expose()
  readonly lora_add_hashes_to_infotext: boolean

  @Expose()
  readonly lora_show_all: boolean

  @Expose()
  readonly lora_hide_unknown_for_versions: any[]

  @Expose()
  readonly lora_in_memory_limit: number

  @Expose()
  readonly lora_functional: boolean

  @Expose()
  readonly canvas_hotkey_zoom: string

  @Expose()
  readonly canvas_hotkey_adjust: string

  @Expose()
  readonly canvas_hotkey_move: string

  @Expose()
  readonly canvas_hotkey_fullscreen: string

  @Expose()
  readonly canvas_hotkey_reset: string

  @Expose()
  readonly canvas_hotkey_overlap: string

  @Expose()
  readonly canvas_show_tooltip: boolean

  @Expose()
  readonly canvas_auto_expand: boolean

  @Expose()
  readonly canvas_blur_prompt: boolean

  @Expose()
  readonly canvas_disabled_functions: string[]

  @Expose()
  readonly settings_in_ui: string

  @Expose()
  readonly extra_options_txt2img: any[]

  @Expose()
  readonly extra_options_img2img: any[]

  @Expose()
  readonly extra_options_cols: number

  @Expose()
  readonly extra_options_accordion: boolean
}
