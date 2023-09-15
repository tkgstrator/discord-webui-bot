import { ChatInputCommandInteraction, SlashCommandBuilder, TextChannel } from 'discord.js';

import { UpscalerType } from '../dto/upscaler.dto.js';
import prompts from '../prompts/prompts.json' assert { type: 'json' };

import { generateImageAndReply } from './generate.js';

import { SDClient } from '~/client';

export const start = {
  data: new SlashCommandBuilder()
    .setName('start')
    .setDescription('Start generating')
    .addIntegerOption((option) =>
      option.setName('count').setDescription('Count').setMaxValue(100).setMinValue(1).setRequired(true),
    )
    .addIntegerOption((option) =>
      option.setName('batch_size').setDescription('Batch size').setMaxValue(100).setMinValue(1),
    ),
  execute: async (interaction: ChatInputCommandInteraction, channel: TextChannel, service: SDClient) => {
    await interaction.reply({ content: 'Start generating', ephemeral: true });
    const count: number = interaction.options.getInteger('count') ?? 1;
    const batch_size: number = interaction.options.getInteger('batch_size') ?? 1;
    Array.from(Array(count).keys()).forEach(async (count) => {
      const prompt: string = prompts[Math.floor(Math.random() * prompts.length)];
      const size = [
        {
          height: 768,
          width: 512,
        },
        {
          height: 512,
          width: 768,
        },
      ][Math.floor(Math.random() * 2)];
      setTimeout(async () => {
        await generateImageAndReply(
          channel,
          service,
          false,
          interaction.user.id,
          prompt,
          UpscalerType.Anime6B,
          batch_size,
          -1,
          2.0,
          true,
          size.width,
          size.height,
        );
      }, 5000);
    });
    await interaction.deleteReply();
  },
};

export const stop = {
  data: new SlashCommandBuilder().setName('stop').setDescription('Stop generating'),
  execute: async (interaction: ChatInputCommandInteraction, channel: TextChannel, service: SDClient) => {
    await interaction.reply('Stop generating');
  },
};
