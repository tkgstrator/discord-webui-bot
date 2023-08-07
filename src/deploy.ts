import { REST, Routes } from 'discord.js';
import { generate } from './commands/generate.js';
import { status } from './commands/status.js';
import { options } from './commands/options.js';

export const registration = (async (token: string, application_id: string, guild_id: string) => {
    const commands = [generate.data, status.data, options.data].map((command) => command.toJSON())
    const rest = new REST({ version: '10' }).setToken(token);
    try {
        await rest.put(
            Routes.applicationGuildCommands(application_id, guild_id),
            { body: commands },
        )
        console.info("Commands registration is successfully")
    } catch (error) {
        console.error("Commands registration is failed", error)
    }
})
