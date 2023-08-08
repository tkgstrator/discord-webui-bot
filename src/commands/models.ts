import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { SDModel } from "../dto/models.dto.js";
import { SDClient } from "~/client";
import '../extension.js'

export const models = async (service: SDClient) => {
    const checkpoints: SDModel[] = (await service.get_sd_models()).slice(0, 25)
    return {
        data: new SlashCommandBuilder()
            .setName('switch')
            .setDescription('Switch models')
            .addStringOption(option => option
                .setName('checkpoint')
                .setDescription('Set sd_model_checkpoint')
                .setRequired(true)
                .setChoices(
                    ...checkpoints.map((model: SDModel) => {
                        return {
                            name: model.model_name,
                            value: model.title
                        }
                    })
                )),
        execute: async (interaction: any) => {
            const checkpoint: string | undefined = interaction.options.getString('checkpoint') ?? undefined
            await interaction.deferReply({ ephemeral: true });
            const response = await service.set_options({
                sd_model_checkpoint: checkpoint
            })
            if (checkpoint !== undefined && response) {
                const content = new EmbedBuilder()
                    .setColor('#0099FF')
                    .setTitle('Model switched successfully!')
                    .setDescription('Current model')
                    .addFields(
                        {
                            name: "checkpoint",
                            value: checkpoint.toCode(),
                            inline: false
                        },
                    )
                    .setTimestamp()
                await interaction.editReply({ embeds: [content] });
            }
        }
    }
}
