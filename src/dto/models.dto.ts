import { Expose } from "class-transformer";

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
