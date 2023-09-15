import { REST, Routes } from 'discord.js';

import { generate } from './commands/generate.js';
import { models } from './commands/models.js';
import { options } from './commands/options.js';
import { start, stop } from './commands/start.js';
import { status } from './commands/status.js';

import { service } from './index.js';

export const registration = async (token: string, application_id: string, guild_id: string) => {
  const commands = [
    (await generate(service)).data,
    status.data,
    options.data,
    (await models(service)).data,
    start.data,
    stop.data,
  ].map((command) => command.toJSON());
  const rest = new REST({ version: '10' }).setToken(token);
  try {
    await rest.put(Routes.applicationGuildCommands(application_id, guild_id), {
      body: commands,
    });
    console.info('Commands registration is successfully');
  } catch (error) {
    console.error('Commands registration is failed', error);
  }
};
