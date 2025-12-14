import {Snowflake} from "@/app/Entities/Snowflake";

export interface INoteApiObject {
    readonly id: Snowflake;
    readonly name: string;
    readonly content: string;
    readonly isArchived: boolean;
    readonly categoryIds: Snowflake[];
}
