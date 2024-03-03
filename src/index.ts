import { SDClient } from '@/client'

const response = await SDClient.get_sd_models()
console.log(response)
