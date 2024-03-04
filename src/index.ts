import {
  ChatInputCommandInteraction,
  Client,
  Events,
  GatewayIntentBits,
  ModalSubmitInteraction,
  REST,
  Routes,
} from 'discord.js'

import { DiscordCommandId } from './commands/command_id'
import { DiscordCommnadManager } from './commands/txt2img'
import { config } from './config'

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
})
const rest = new REST({ version: '10' }).setToken(config.DISCORD_APPLICATION_SECRET)
rest
  .put(Routes.applicationGuildCommands(config.DISCORD_APPLICATION_ID, config.DISCORD_GUILD_ID), {
    body: [DiscordCommnadManager.txt2img.slash],
  })
  .then(() => {
    console.log('Successfully registered application commands.')
  })
client.on(Events.InteractionCreate, async (interaction) => {
  /**
   * チャットへの入力
   */
  if (!interaction.isChatInputCommand()) {
    /**
     * ボタンコマンド
     */
    if (interaction.isButton()) {
    }
  }
  if (interaction.isModalSubmit()) {
    switch (interaction.customId) {
      case DiscordCommandId.Txt2Img.modal:
        DiscordCommnadManager.txt2img.post(interaction as ModalSubmitInteraction)
        break
      default:
        break
    }
  }
  /**
   * スラッシュコマンド
   */
  if (interaction.isCommand()) {
    switch (interaction.commandName) {
      case DiscordCommandId.Txt2Img.slash:
        DiscordCommnadManager.txt2img.get(interaction as ChatInputCommandInteraction)
        break
      default:
        break
    }
  }
})
client.on(Events.MessageCreate, async (message) => {})
client.login(config.DISCORD_APPLICATION_SECRET)
