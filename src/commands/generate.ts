import { Attachment, AttachmentBuilder, SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { Extension, base64ToPng } from "../base64.js";
import { SDClient } from "../client.js";
import { Upscaler } from "../dto/upscaler.dto.js";
import { SDProgress } from "../dto/progress.dto.js";
import '../extension.js'
import { Txt2ImgResponse } from "~/dto/txt2img.dto";

export const generate = async (service: SDClient) => {
    const upscalers: Upscaler[] = await service.get_upscalers()
    return {
        data: new SlashCommandBuilder()
            .setName('generate')
            .setDescription('Generate an image from a text prompt')
            .addStringOption(option => option
                .setName('prompt')
                .setDescription('Prompt')
                .setRequired(true))
            // .addStringOption(option => option
            //     .setName('negative')
            //     .setDescription('Netagive prompt')
            //     .setRequired(false))
            .addNumberOption(option => option
                .setName('batch_size')
                .setDescription('Batch size')
                .setRequired(false)
                .setChoices(
                    { name: "1", value: 1 },
                    { name: "2", value: 2 },
                    { name: "3", value: 3 },
                    { name: "4", value: 4 }
                ))
            .addStringOption(option => option
                .setName('upscaler')
                .setDescription('Upscaler')
                .setChoices(...upscalers.map((upscaler: Upscaler) => {
                    return {
                        name: upscaler.name,
                        value: upscaler.name
                    }
                })))
            .addNumberOption(option => option
                .setName('upscale')
                .setDescription('Upscale by')
                .setRequired(false)
                .setChoices(
                    { name: "1.0", value: 1.0 },
                    { name: "1.5", value: 1.5 },
                    { name: "2.0", value: 2.0 }
                ))
            .addNumberOption(option => option
                .setName('seed')
                .setDescription('Seed')
                .setRequired(false)),
        execute: async (interaction: any) => {
            await interaction.deferReply({ ephemeral: false });
            const author_id: string = interaction.user.id
            const sdxl_support: boolean = await service.sdxl_support()
            /**
             * パラメータの取得
             * デフォルト設定を読み込めるようにしたい所存
             */
            const prompt: string | undefined = interaction.options.getString('prompt')
            const upscaler: string = interaction.options.getString('upscaler') ?? (sdxl_support ? "R-ESRGAN 4x+ Anime6B" : "Latent")
            const batch_size: number = interaction.options.getNumber('batch_size') ?? 1
            const seed: number = interaction.options.getNumber('seed') ?? -1
            /**
             * Hires fix.
             * SDXLをサポートしていたら未指定では1.0倍, そうでなければ1.5倍
             */
            const hr_scale: number = interaction.options.getNumber('upscale') ?? (sdxl_support ? 1.0 : 1.5)
            const enable_hr: boolean = hr_scale !== 1.0 
            
            try {
                let is_finished: boolean = false
                const { sd_model_checkpoint } = await service.get_options()
                const waiting = async () => {
                    while (!is_finished) {
                        await new Promise(resolve => setTimeout(resolve, 500));
                        const progress: SDProgress = await service.get_progress(true)
                        if (progress.progress === 0)
                            continue
                        // /**
                        //  * 進捗100%か残り時間が0になったら完了
                        //  */
                        // if (progress.progress === 1 || progress.eta_relative === 0)
                        //     is_finished = true
                        
                        const estimated_time: string = Math.max(0, progress.eta_relative).toFixed(2)
                        const content = new EmbedBuilder()
                        .setColor('#0099FF')
                        .setTitle(is_finished ? 'Generated' : 'Generating')
                        .setDescription(is_finished ? 'Done' : 'Generating image...')
                            .addFields(
                                {
                                    name: "Checkpoint",
                                    value: sd_model_checkpoint!.toCode(),
                                    inline: true
                                },
                                {
                                    name: "Progress",
                                    value: `${(progress.progress * 100).toFixed(2)}%`.toCode(),
                                    inline: true
                                },
                                {
                                    name: "Operation",
                                    value: (progress.state.sampling_steps === 20 ? 'Generating' : 'Upscaling').toCode(),
                                    inline: true
                                },
                                {
                                    name: "ETA",
                                    value: `${estimated_time}s`.toCode(),
                                    inline: true
                                },
                                {
                                    name: "Steps",
                                    value: `${progress.state.sampling_step}/${progress.state.sampling_steps}`.toCode(),
                                    inline: true
                                },
                            )
                            .setTimestamp()
                        await interaction.editReply({ embeds: [content] });
                    }
                }
                
                /**
                 * 生成完了
                 */
                const generate = service.txt2img({
                        prompt: sdxl_support ? `face focus, cute, masterpiece, best quality, ${prompt}` : prompt,
                        negative_prompt: sdxl_support ? "lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry" : "EasyNegative, EasyNegativev2, negative_hand-neg",
                        batch_size: sdxl_support ? 1 : batch_size,
                        sampler_name: sdxl_support ? "DPM++ 2M SDE Karras" : "DDIM",
                        hr_scale: hr_scale,
                        hr_upscaler: upscaler,
                        cfg_scale: sdxl_support ? 12 : 7,
                        seed: seed,
                        enable_hr: enable_hr,
                        steps: sdxl_support ? 30 : 20,
                        width: sdxl_support ? 512 * 1.5 : 512,
                        height: sdxl_support ? 768 * 1.5 : 768,
                    })
                    .then((result: Txt2ImgResponse) => {
                        is_finished = true
                        return result
                    })

                const [response, _] = await Promise.all([generate, waiting()])
                /**
                 * 画像を添付
                 */
                const attachments = response.images.map((image: string) => new AttachmentBuilder(base64ToPng(image)).setName('image.png'))
                const content = new EmbedBuilder()
                    .setColor('#0099FF')
                    .setTitle('Generated')
                    .setDescription('Done')
                    .addFields(
                        {
                            name: "Checkpoint",
                            value: sd_model_checkpoint!.toCode(),
                            inline: true
                        },
                        {
                            name: "Sampler",
                            value: response.info.sampler_name.toCode(),
                            inline: true
                        },
                        {
                            name: "Prompt",
                            value: response.info.prompt.toCode(), 
                        },
                        {
                            name: "CFG Scale",
                            value: response.info.cfg_scale.toCode(),
                            inline: true
                        },
                        {
                            name: "Seed",
                            value: response.info.seed.toCode(),
                            inline: true
                        },
                        {
                            name: "Size",
                            value: `${response.info.width}x${response.info.height}`.toCode(), 
                            inline: true
                        },
                        {
                            name: "Clip skip",
                            value: response.info.clip_skip.toCode(), 
                            inline: true
                        },
                        {
                            name: "Batch size",
                            value: response.info.batch_size.toCode(),
                            inline: true
                        },
                        {
                            name: "Steps",
                            value: response.info.steps.toCode(),
                            inline: true
                        },
                    )
                    .setTimestamp()
                await interaction.editReply({ content: `Done - <@${author_id}>`, embeds: [content], files: attachments, ephemeral: false });
            } catch(error) {
                await interaction.deleteReply()
            }
        }
    }
}
