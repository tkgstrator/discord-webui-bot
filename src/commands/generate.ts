import { SlashCommandBuilder } from "discord.js";

export const generate = {
    data: new SlashCommandBuilder()
        .setName('meowing')
        .setDescription('Generate an image from a text prompt'),
    execute: async (interaction: any) => {
        console.log("Meowing", interaction)
        await interaction.reply('Meowing');
    }
}
