import { plainToInstance } from 'class-transformer'
import {
  ActionRowBuilder,
  ChatInputCommandInteraction,
  TextInputBuilder,
  TextInputStyle,
  SlashCommandBuilder,
  ModalBuilder,
  ModalSubmitInteraction,
  AttachmentBuilder,
  EmbedBuilder,
} from 'discord.js'

import prompt from '../../test/txt2img.json'

import { DiscordCommandId } from './command_id'

import { SDClient } from '@/client'
import { SDAPITxt2Img } from '@/dto/txt2img.dto'

export class DiscordCommnadManager {
  static readonly txt2img = {
    get: async (interaction: ChatInputCommandInteraction): Promise<void> => {
      const modal: ModalBuilder = new ModalBuilder()
        .setCustomId(DiscordCommandId.Txt2Img.modal)
        .setTitle('Input Parameters')
      const content: TextInputBuilder = new TextInputBuilder()
        .setCustomId(DiscordCommandId.Txt2Img.prompt)
        .setLabel('Prompt')
        .setPlaceholder('Positive prompt')
        .setValue('1girl, solo')
        .setRequired(true)
        .setStyle(TextInputStyle.Short)
      const action = new ActionRowBuilder().addComponents(content)
      // @ts-ignore
      modal.addComponents(action)
      await interaction.showModal(modal)
    },
    post: async (interaction: ModalSubmitInteraction): Promise<void> => {
      const message = await interaction.deferReply({ fetchReply: true })
      const positive_prompt: string = interaction.fields.getTextInputValue(DiscordCommandId.Txt2Img.prompt)
      const parameters: SDAPITxt2Img.Request = plainToInstance(
        SDAPITxt2Img.Request,
        Object.assign({}, prompt, { prompt: positive_prompt }),
        { excludeExtraneousValues: true },
      )
      const response = await SDClient.txt2img(parameters)
      const attachments: AttachmentBuilder[] = response.buffers.map((buffer) =>
        new AttachmentBuilder(buffer).setName('image.png'),
      )
      const components: EmbedBuilder = new EmbedBuilder()
        .setTitle('Generated')
        .setColor('#0099FF')
        .addFields(
          {
            name: 'Prompt',
            value: response.info.prompt,
          },
          {
            inline: true,
            name: 'Width',
            value: response.info.width.toString(),
          },
          {
            inline: true,
            name: 'Height',
            value: response.info.height.toString(),
          },
          {
            inline: true,
            name: 'Sampler',
            value: response.info.sampler_name,
          },
        )
        .setFooter({ text: 'Stable Diffusion WebUI' })
        .setTimestamp()
      await interaction.editReply({ embeds: [components], files: attachments })
      // await message.edit({ content: 'Generated Image', files: attachments })
    },
    slash: new SlashCommandBuilder()
      .setName(DiscordCommandId.Txt2Img.slash)
      .setDescription('Thinking to the world of dreams...'),
  }
}
