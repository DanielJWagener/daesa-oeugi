export type Line = {
    speaker: string;
    line: string;
}

export type Scene = {
    key: string;
    title: string;
    lines: Line[]
}

export type Script = Scene[];

export type ScriptDynamicImport = {
    default: Script;
}