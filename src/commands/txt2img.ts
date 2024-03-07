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
  ButtonBuilder,
  ButtonStyle,
  ButtonInteraction,
  APIEmbedField,
  MessagePayload,
} from 'discord.js'

import prompt from '../../test/txt2img.json'

import { DiscordCommandId } from './command_id'

import { SDClient } from '@/client'
import { SDAPITxt2Img } from '@/dto/txt2img.dto'

export class DiscordCommnadManager {
  static readonly txt2img = {
    generate: async (
      positive_prompt: string,
      alwayson_scripts: object | undefined = undefined,
    ): Promise<MessagePayload> => {
      const options =
        alwayson_scripts === undefined
          ? { prompt: positive_prompt }
          : { alwayson_scripts: alwayson_scripts, prompt: positive_prompt }
      const parameters: SDAPITxt2Img.Request = plainToInstance(
        SDAPITxt2Img.Request,
        Object.assign({}, prompt, options),
        { excludeExtraneousValues: true },
      )
      const response = await SDClient.txt2img(parameters)
      const attachments: AttachmentBuilder[] = response.buffers.map((buffer) =>
        new AttachmentBuilder(buffer).setName('image.png'),
      )
      const components: EmbedBuilder = new EmbedBuilder()
        .setTitle('Generated Image')
        .setColor('#0099FF')
        .addFields(
          {
            name: 'Positive Prompt',
            value: response.parameters.prompt,
          },
          {
            name: 'Upsampled Prompt',
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
            name: 'Seed',
            value: response.info.seed.toString(),
          },
          {
            inline: true,
            name: 'Sampler',
            value: response.info.sampler_name,
          },
        )
        .setFooter({ text: 'Stable Diffusion WebUI' })
        .setTimestamp()
      const action: ActionRowBuilder<ButtonBuilder> = new ActionRowBuilder<ButtonBuilder>().addComponents([
        new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel('Retry').setCustomId(DiscordCommandId.Txt2Img.retry),
        new ButtonBuilder()
          .setStyle(ButtonStyle.Secondary)
          .setLabel('Regenerate')
          .setCustomId(DiscordCommandId.Txt2Img.original),
      ])
      // @ts-ignore
      return { components: [action], embeds: [components], files: attachments }
    },
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
      const content = await this.txt2img.generate(positive_prompt)
      await interaction.editReply(content)
    },
    retry: async (interaction: ButtonInteraction): Promise<void> => {
      const command =
        Object.values(DiscordCommandId.Txt2Img).find((command) => command === interaction.customId) ??
        DiscordCommandId.Txt2Img.retry
      await interaction.deferReply()
      const fields: APIEmbedField[] = interaction.message.embeds[0].fields
      const options = (() => {
        switch (command) {
          case DiscordCommandId.Txt2Img.retry:
            return {}
          case DiscordCommandId.Txt2Img.original:
            return undefined
          default:
            return undefined
        }
      })()
      const positive_prompt: string | undefined = (() => {
        switch (command) {
          case DiscordCommandId.Txt2Img.retry:
            return fields.find((field) => field.name === 'Upsampled Prompt')?.value
          case DiscordCommandId.Txt2Img.original:
            return fields.find((field) => field.name === 'Positive Prompt')?.value
          default:
            return undefined
        }
      })()
      if (positive_prompt === undefined) {
        await interaction.editReply('Prompt is not found.')
        return
      }
      const content = await this.txt2img.generate(positive_prompt, options)
      await interaction.editReply(content)
    },
    slash: new SlashCommandBuilder()
      .setName(DiscordCommandId.Txt2Img.slash)
      .setDescription('Thinking to the world of dreams...'),
  }
}
