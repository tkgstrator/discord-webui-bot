import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { SDBaseModel, SDModel } from "../dto/models.dto.js";
import { SDClient } from "~/client";
import '../extension.js'

export const models = async (service: SDClient) => { 
    const checkpoints: SDModel[] = await service.get_checkpoints()
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
                ))
            .addStringOption(option => option
                .setName('base_model')
                .setDescription('Choose base model')
                .setChoices(
                    { name: 'SDXL1.0', value: SDBaseModel.SDXL1_0 },
                    { name: 'SDXL0.9', value: SDBaseModel.SDXL0_9 },
                    { name: 'SD2.1', value: SDBaseModel.SD2_1 },
                    { name: 'SD2.0', value: SDBaseModel.SD2_0 },
                    { name: 'SD1.5', value: SDBaseModel.SD1_5 },
                )),
        execute: async (interaction: any) => {
            const checkpoint: string | undefined = interaction.options.getString('checkpoint') ?? undefined
            await interaction.deferReply({ ephemeral: false });
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
