import { Expose } from "class-transformer";

export class SDVae {
    @Expose()
    model_name: string;

    @Expose()
    filename: string;
}
