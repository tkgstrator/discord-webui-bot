import { Client, Events, GatewayIntentBits, TextChannel } from 'discord.js';
import dotenv from 'dotenv';

import { SDClient } from './client.js';
import { Command } from './commands/commands.js';
import { deleteReply } from './commands/delete.js';
import { generate, generateImageAndReply } from './commands/generate.js';
import { models } from './commands/models.js';
import { options } from './commands/options.js';
import { retry } from './commands/retry.js';
import { status } from './commands/status.js';
import { registration } from './deploy.js';

dotenv.config();

if (process.env.API_URL === undefined || process.env.API_VER === undefined)
  throw new Error('API_URL or API_VER is undefined');
if (
  process.env.DISCORD_TOKEN === undefined ||
  process.env.GUILD_ID === undefined ||
  process.env.APPLICATION_ID === undefined
)
  throw new Error('DISCORD_TOKEN, GUILD_ID or APPLICATION_ID is undefined');
export const service: SDClient = new SDClient();
export const token: string = process.env.DISCORD_TOKEN!;
export const guild_id: string = process.env.GUILD_ID!;
export const application_id: string = process.env.APPLICATION_ID!;

registration(token, application_id, guild_id);

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, async () => {
  const channel: TextChannel = client.channels.cache.get('1142545490848780419') as TextChannel;
});

client.on(Events.InteractionCreate, async (interaction) => {
  console.log(interaction.isChatInputCommand());
  if (!interaction.isChatInputCommand()) {
    if (interaction.isButton()) {
      if (interaction.customId === Command.Retry) {
        await retry.execute(service, interaction);
      }
      if (interaction.customId === Command.Delete) {
        await deleteReply.execute(interaction);
      }
    }
    return;
  }
  if (interaction.commandName === Command.Generate) {
    const command = await generate(service);
    command.execute(interaction);
  }
  if (interaction.commandName === Command.Status) {
    status.execute(interaction);
  }
  if (interaction.commandName === Command.Options) {
    options.execute(interaction);
  }
  if (interaction.commandName === Command.Switch) {
    const command = await models(service);
    command.execute(interaction);
  }
});
client.login(token);
