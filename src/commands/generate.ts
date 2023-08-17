import {
  AttachmentBuilder,
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from 'discord.js';

import { base64ToPng } from '../base64.js';
import { SDClient } from '../client.js';
import { SDProgress } from '../dto/progress.dto.js';
import { Upscaler } from '../dto/upscaler.dto.js';

import '../extension.js';
import { Txt2ImgResponse } from '~/dto/txt2img.dto';

export async function generateImageAndReply(
  interaction: any,
  service: SDClient,
  sdxl_support: boolean,
  author_id: string,
  prompt: string,
  upscaler: string,
  batch_size: number,
  seed: number = -1,
  hr_scale: number = 1.5,
  enable_hr: boolean = true,
) {
  try {
    let is_finished: boolean = false;
    const { sd_model_checkpoint } = await service.get_options();
    const waiting = async () => {
      while (!is_finished) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const progress: SDProgress = await service.get_progress(true);
        if (progress.progress === 0) continue;
        /**
         * 進捗100%か残り時間が0になったら完了
         */
        if (progress.progress === 1 || progress.eta_relative === 0) is_finished = true;

        const estimated_time: string = Math.max(0, progress.eta_relative).toFixed(2);
        const content = new EmbedBuilder()
          .setColor('#0099FF')
          .setTitle(is_finished ? 'Generated' : 'Generating')
          .setDescription(is_finished ? 'Done' : 'Generating image...')
          .addFields(
            {
              name: 'Checkpoint',
              value: sd_model_checkpoint!.toCode(),
            },
            {
              inline: true,
              name: 'Progress',
              value: `${(progress.progress * 100).toFixed(2)}%`.toCode(),
            },
            {
              inline: true,
              name: 'Operation',
              value: (progress.state.sampling_steps === 20 ? 'Generating' : 'Upscaling').toCode(),
            },
            {
              inline: true,
              name: 'ETA',
              value: `${estimated_time}s`.toCode(),
            },
            {
              inline: true,
              name: 'Steps',
              value: `${progress.state.sampling_step}/${progress.state.sampling_steps}`.toCode(),
            },
          )
          .setTimestamp();
        await interaction.editReply({ embeds: [content] });
      }
    };

    /**
     * 生成完了
     */
    const generate = service
      .txt2img({
        batch_size: sdxl_support ? 1 : batch_size,
        cfg_scale: sdxl_support ? 12 : 7,
        enable_hr: enable_hr,
        height: sdxl_support ? 768 * 1.5 : 768,
        hr_scale: hr_scale,
        hr_upscaler: upscaler,
        negative_prompt: sdxl_support
          ? 'lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry'
          : 'EasyNegative, EasyNegativev2, negative_hand-neg',
        prompt: sdxl_support ? `face focus, cute, masterpiece, best quality, ${prompt}` : prompt,
        sampler_name: sdxl_support ? 'DPM++ 2M SDE Karras' : 'DDIM',
        seed: seed,
        steps: sdxl_support ? 30 : 20,
        width: sdxl_support ? 512 * 1.5 : 512,
      })
      .then((result: Txt2ImgResponse) => {
        is_finished = true;
        return result;
      });

    const [response, _] = await Promise.all([generate, waiting()]);
    /**
     * 画像を添付
     */
    const attachments = response.images.map((image: string) =>
      new AttachmentBuilder(base64ToPng(image)).setName('image.png'),
    );
    const content = new EmbedBuilder()
      .setColor('#0099FF')
      .setTitle('Generated')
      .setDescription('Done')
      .addFields(
        {
          name: 'Checkpoint',
          value: sd_model_checkpoint!.toCode(),
        },
        {
          name: 'Prompt',
          value: response.info.prompt.toCode(),
        },
        {
          inline: true,
          name: 'CFG Scale',
          value: response.info.cfg_scale.toCode(),
        },
        {
          inline: true,
          name: 'Seed',
          value: response.info.seed.toCode(),
        },
        {
          inline: true,
          name: 'Size',
          value: `${response.info.width}x${response.info.height}`.toCode(),
        },
        {
          inline: true,
          name: 'Clip skip',
          value: response.info.clip_skip.toCode(),
        },
        {
          inline: true,
          name: 'Batch size',
          value: response.info.batch_size.toCode(),
        },
        {
          inline: true,
          name: 'Steps',
          value: response.info.steps.toCode(),
        },
        {
          inline: true,
          name: 'Scale',
          value: response.parameters.hr_scale.toCode(),
        },
        {
          inline: true,
          name: 'Sampler',
          value: response.info.sampler_name.toCode(),
        },
        {
          inline: true,
          name: 'SDXL',
          value: sdxl_support.toString().toCode(),
        },
      )
      .setTimestamp();

    const action = new ActionRowBuilder().addComponents(
      ...[
        new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel('Retry').setCustomId('retry'),
        new ButtonBuilder().setStyle(ButtonStyle.Danger).setLabel('Delete').setCustomId('delete'),
      ],
    );
    await interaction.editReply({
      components: [action],
      content: `Done - <@${author_id}>`,
      embeds: [content],
      ephemeral: false,
      files: attachments,
    });
  } catch (error) {
    await interaction.deleteReply();
  }
}

export const generate = async (service: SDClient) => {
  const upscalers: Upscaler[] = await service.get_upscalers();
  return {
    data: new SlashCommandBuilder()
      .setName('generate')
      .setDescription('Thinking to the world of dreams...')
      .addStringOption((option) => option.setName('prompt').setDescription('Prompt').setRequired(true))
      .addStringOption((option) => option.setName('negative').setDescription('Netagive prompt').setRequired(false))
      .addNumberOption((option) =>
        option
          .setName('batch_size')
          .setDescription('Batch size')
          .setRequired(false)
          .setChoices(
            { name: '1', value: 1 },
            { name: '2', value: 2 },
            { name: '3', value: 3 },
            { name: '4', value: 4 },
          ),
      )
      .addStringOption((option) =>
        option
          .setName('upscaler')
          .setDescription('Upscaler')
          .setChoices(
            ...upscalers.map((upscaler: Upscaler) => {
              return {
                name: upscaler.name,
                value: upscaler.name,
              };
            }),
          ),
      )
      .addNumberOption((option) =>
        option
          .setName('upscale')
          .setDescription('Upscale by')
          .setRequired(false)
          .setChoices({ name: '1.0', value: 1.0 }, { name: '1.5', value: 1.5 }, { name: '2.0', value: 2.0 }),
      )
      .addNumberOption((option) => option.setName('seed').setDescription('Seed').setRequired(false)),
    execute: async (interaction: any) => {
      await interaction.deferReply({ ephemeral: false });
      const author_id: string = interaction.user.id;
      const sdxl_support: boolean = await service.sdxl_support();
      /**
       * パラメータの取得
       * デフォルト設定を読み込めるようにしたい所存
       */
      const prompt: string | undefined = interaction.options.getString('prompt');
      const upscaler: string =
        interaction.options.getString('upscaler') ?? (sdxl_support ? 'R-ESRGAN 4x+ Anime6B' : 'Latent');
      const batch_size: number = interaction.options.getNumber('batch_size') ?? 1;
      const seed: number = interaction.options.getNumber('seed') ?? -1;
      /**
       * Hires fix.
       * SDXLをサポートしていたら未指定では1.0倍, そうでなければ1.5倍
       */
      const hr_scale: number = interaction.options.getNumber('upscale') ?? (sdxl_support ? 1.0 : 1.5);
      const enable_hr: boolean = hr_scale !== 1.0;

      await generateImageAndReply(
        interaction,
        service,
        sdxl_support,
        author_id,
        prompt!,
        upscaler,
        batch_size,
        seed,
        hr_scale,
        enable_hr,
      );
    },
  };
};
