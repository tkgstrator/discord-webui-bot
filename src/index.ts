import { SDClient } from './client.js';
import { Client, Events, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import { registration } from './deploy.js';
import { options } from './commands/options.js';
import { generate } from './commands/generate.js';
import { Command } from './commands/commands.js';

dotenv.config();

export const service: SDClient = new SDClient()
export const token: string = process.env.DISCORD_TOKEN!
export const guild_id: string = process.env.GUILD_ID!
export const application_id: string = process.env.APPLICATION_ID!

console.log(token, guild_id)
registration(token, application_id, guild_id)
const client = new Client({ intents: [GatewayIntentBits.Guilds] })
client.once(Events.ClientReady, () => {
    console.log("Client ready")
})
client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.commandName === Command.Generate) {
        generate.execute(interaction)
    }
    if (interaction.commandName === Command.Status) {
        options.execute(interaction)
    }
})
client.login(token)
// const client = new SDClient()

// // const models = await client.get_sd_models()
// // console.log(models)

// // const request: Txt2ImgParams = new Txt2ImgParams("1girl, glasses, black long straight hair", "EasyNegative,EasyNegativev2,negative_hand-neg")
// // const response = await client.txt2img(request)

// // console.log(await client.get_system_info(true, true, true, true))
// console.log(await client.get_upscalers())
// console.log(await client.get_progress(true))
// console.log(await client.get_sd_vae())
// console.log(await client.get_options())
// console.log(await client.set_options({
//     CLIP_stop_at_last_layers: 1,
//     eta_noise_seed_delta: 0,
//     sd_model_checkpoint: "breakdomainanime_A0440.safetensors [f1c731fd51]",
//     sd_vae: "None"
// }))
// console.log(await client.get_options())
// console.log(await client.get_samplers())
