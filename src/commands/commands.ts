export const Command = {
    Generate: "generate",
    Options: "options",
    Status: "status",
    Switch: "switch",
} as const

type Command = typeof [keyof typeof Command];
