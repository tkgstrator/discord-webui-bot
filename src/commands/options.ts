import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { service } from "../index.js";
import '../extension.js'

export const options = {
    data: new SlashCommandBuilder()
        .setName('options')
        .setDescription('Set options')
        .addNumberOption(option => option
            .setName('clip_skip')
            .setDescription('Set CLIP_stop_at_last_layers')
            .setRequired(false)
            .setChoices(
                {
                    name: "Default",
                    value: 1
                },
                {
                    name: "NovelAI",
                    value: 2
                })
        )
        .addNumberOption(option => option
            .setName('ensd')
            .setDescription('Set ensd eta_noise_seed_delta')
            .setRequired(false)
            .setChoices(
                {
                    name: "Default",
                    value: 0
                },
                {
                    name: "NovelAI",
                    value: 31337
                })
        ),
    execute: async (interaction: any) => {
        const clip_skip: number | undefined = interaction.options.getNumber('clip_skip') ?? undefined
        const ensd: number | undefined = interaction.options.getNumber('ensd') ?? undefined
        await service.set_options({
            CLIP_stop_at_last_layers: clip_skip,
            eta_noise_seed_delta: ensd
        })
        const response = await service.get_options()
        const content = new EmbedBuilder()
            .setColor('#0099FF')
            .setTitle('Update options successfully')
            .setDescription('Current status')
            .addFields(
                {
                    name: "checkpoint",
                    value: response.sd_model_checkpoint!.toCode(),
                    inline: false
                },
                {
                    name: "clip_skip",
                    value: response.CLIP_stop_at_last_layers!.toCode(),
                    inline: true
                },
                {
                    name: "ensd",
                    value: response.eta_noise_seed_delta!.toCode(),
                    inline: true
                },
                {
                    name: "vae",
                    value: response.sd_vae!.toCode(),
                    inline: true
                })
            .setTimestamp()
            await interaction.reply({ embeds: [content] });
        }
}
