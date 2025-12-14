import {Snowflake} from "@/app/Entities/Snowflake";

export interface IGetNotesQuery {
    readonly categoryId?: Snowflake;
}