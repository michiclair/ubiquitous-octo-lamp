import {Snowflake} from "@/app/Entities/Snowflake";

export interface IModifyNoteParams {
    readonly name?: string;
    readonly content?: string;
    readonly isArchived?: boolean;
    readonly categoryNames?: string[];
}

