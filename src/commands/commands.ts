export const Command = {
    Generate: "generate",
    Options: "options",
    Status: "status",
    Switch: "switch",
} as const

export type Command = typeof Command[keyof typeof Command];
