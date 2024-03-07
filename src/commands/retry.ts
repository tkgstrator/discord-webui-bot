import { ButtonInteraction } from 'discord.js'

import { generateImageAndReply } from './generate.js'

import { SDClient } from '~/client'

export const retry = {
  execute: async (service: SDClient, interaction: ButtonInteraction) => {
    /**
     * パラメータをフィールドから取得する
     */
    const fields = interaction.message.embeds[0].fields
    const parameters = Object.assign(
      {},
      ...fields.map((field) => {
        const value: string = field.value.replace(/`/g, '')
        // @ts-ignore
        return { [field.name.replace(/\s/g, '_').toLowerCase()]: !isNaN(value) ? parseFloat(value) : value }
      }),
    )
    const author_id: string = interaction.user.id
    const sdxl_support: boolean = await service.sdxl_support()
    /**
     * 画像を生成
     */
    await generateImageAndReply(
      interaction,
      service,
      sdxl_support,
      author_id,
      parameters.prompt,
      parameters.upscaler,
      parameters.batch_size,
      -1,
      parameters.scale,
      sdxl_support ? false : true,
    )
  },
}
