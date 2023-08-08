import { Expose } from "class-transformer";

export const SDBaseModel = {
    SD1_5: "SD1.5",
    SD2_0: "SD2.0",
    SD2_1: "SD2.1",
    SDXL0_9: "SDXL0.9",
    SDXL1_0: "SDXL1.0",
} as const

export type SDBaseModel = typeof SDBaseModel[keyof typeof SDBaseModel]

export class SDModel {
    @Expose()
    title: string;

    @Expose()
    model_name: string;

    @Expose()
    hash: null | string;

    @Expose()
    sha256: null | string;

    @Expose()
    filename: string;
    // config:     null;

    get is_sdxl(): boolean {
        return this.filename.includes("SDXL");
    }
}
