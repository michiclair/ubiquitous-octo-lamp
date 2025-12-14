import NoteItem, {INoteItemParams} from "@/app/Components/NoteItem";
import {INoteApiObject} from "@/app/Entities/INoteApiObject";
import {Snowflake} from "@/app/Entities/Snowflake";
import {useEffect} from "react";

export default function NoteList(params: INoteListParams) {

    const noteItems = params.notes
        .filter(n =>
            params.behavior == NoteListShowBehavior.ShowActive && !n.isArchived ||
            params.behavior == NoteListShowBehavior.ShowArchived && n.isArchived)
        .map(n => <NoteItem key={n.id} onClick={params.onNoteSelection}
                            id={n.id} name={n.name} isArchived={n.isArchived}
                            onArchiveRequest={params.onNoteArchiveRequest}
                            onUnarchiveRequest={params.onNoteUnarchiveRequest}/>);

    return <div className="flex flex-nowrap flex-col box-border gap-1 p-2 h-full bg-gray-50 rounded-md">
        {noteItems}
    </div>
}

export interface INoteListParams
{
    readonly notes: readonly INoteItemParams[];
    readonly behavior: NoteListShowBehavior;
    readonly onNoteSelection: (noteId: Snowflake) => unknown;
    readonly onNoteArchiveRequest: (noteId: Snowflake) => unknown;
    readonly onNoteUnarchiveRequest: (noteId: Snowflake) => unknown;
}

export enum NoteListShowBehavior {
    ShowActive = 0,
    ShowArchived = 1,
}