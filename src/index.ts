import { SDClient } from '@/client'

console.log(await SDClient.get_sd_options())
console.log(await SDClient.get_sd_models())
console.log(await SDClient.get_sd_samplers())
console.log(await SDClient.get_sd_upscalers())
