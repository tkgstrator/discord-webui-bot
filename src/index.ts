import { SDClient } from './client.js';
import { Txt2ImgParams } from './dto/txt2img.dto.js';
const client = new SDClient()

// const models = await client.get_sd_models()
// console.log(models)

// const request: Txt2ImgParams = new Txt2ImgParams("1girl, glasses, black long straight hair", "EasyNegative,EasyNegativev2,negative_hand-neg")
// const response = await client.txt2img(request)

console.log(await client.get_upscalers())
console.log(await client.get_progress(true))
console.log(await client.get_sd_vae())
console.log(await client.get_options())
console.log(await client.set_options({
    CLIP_stop_at_last_layers: 1,
    eta_noise_seed_delta: 0,
    sd_model_checkpoint: "breakdomainanime_A0440.safetensors [f1c731fd51]",
    sd_vae: "None"
}))
console.log(await client.get_options())
// console.log(await client.get_system_info(true, true, true, true))
