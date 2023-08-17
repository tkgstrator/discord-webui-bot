import { ButtonInteraction } from 'discord.js';

export const deleteReply = {
  execute: async (interaction: ButtonInteraction) => {
    await interaction.message.delete();
  },
};
