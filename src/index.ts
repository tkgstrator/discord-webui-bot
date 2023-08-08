import { SDClient } from './client.js';
import { Client, Events, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import { registration } from './deploy.js';
import { status } from './commands/status.js';
import { generate } from './commands/generate.js';
import { Command } from './commands/commands.js';
import { options } from './commands/options.js';
import { models } from './commands/models.js';

dotenv.config();

export const service: SDClient = new SDClient()
export const token: string = process.env.DISCORD_TOKEN!
export const guild_id: string = process.env.GUILD_ID!
export const application_id: string = process.env.APPLICATION_ID!

registration(token, application_id, guild_id)

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

client.once(Events.ClientReady, () => {
    console.log("Client ready")
})

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.commandName === Command.Generate) {
        const command = await generate(service)
        command.execute(interaction)
    }
    if (interaction.commandName === Command.Status) {
        status.execute(interaction)
    }
    if (interaction.commandName === Command.Options) {
        options.execute(interaction)
    }
    if (interaction.commandName === Command.Switch) {
        const command = await models(service)
        command.execute(interaction)
    }
})
client.login(token)
