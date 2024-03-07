export const Command = {
  Delete: 'delete',
  Generate: 'generate',
  Options: 'options',
  Retry: 'retry',
  Start: 'start',
  Status: 'status',
  Stop: 'stop',
  Switch: 'switch',
} as const

export type Command = (typeof Command)[keyof typeof Command]
