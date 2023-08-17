import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

import { service } from '../index.js';
import '../extension.js';

export const status = {
  data: new SlashCommandBuilder().setName('status').setDescription('Show current status'),
  execute: async (interaction: any) => {
    const response = await service.get_options();
    const content = new EmbedBuilder()
      .setColor('#0099FF')
      .setTitle('Generate options')
      .setDescription('Current status')
      .addFields(
        {
          inline: false,
          name: 'checkpoint',
          value: response.sd_model_checkpoint!.toCode(),
        },
        {
          inline: true,
          name: 'clip_skip',
          value: response.CLIP_stop_at_last_layers!.toCode(),
        },
        {
          inline: true,
          name: 'ensd',
          value: response.eta_noise_seed_delta!.toCode(),
        },
        {
          inline: true,
          name: 'vae',
          value: response.sd_vae!.toCode(),
        },
      )
      .setTimestamp();
    await interaction.reply({ embeds: [content] });
  },
};
