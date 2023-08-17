export const Command = {
  Delete: 'delete',
  Generate: 'generate',
  Options: 'options',
  Retry: 'retry',
  Status: 'status',
  Switch: 'switch',
} as const;

export type Command = (typeof Command)[keyof typeof Command];
