"use client";
import AllInboxRoundedIcon from '@mui/icons-material/AllInboxRounded';
import SideWindowSwitch from "@/app/Components/SideWindowSwitch";
import NoteList, {NoteListShowBehavior} from "@/app/Components/NoteList";
import {FormEventHandler, useEffect, useId, useState} from "react";
import {INoteItemParams} from "@/app/Components/NoteItem";
import {Snowflake} from "@/app/Entities/Snowflake";
import SearchInput from "@/app/Components/SearchInput";

export default function SideWindow(params: ISideWindowParams)
{
    const noCategoryOptionKey = useId();
    const [listBehavior, setlistBehavior] = useState<NoteListShowBehavior>(NoteListShowBehavior.ShowActive);
    const [notes, setNotes] = useState<INoteItemParams[]>([...params.notes]);

    const onSearchInput: FormEventHandler<HTMLInputElement> = (e) => {
        const textToSearchFor = (e.target as HTMLInputElement).value.toLowerCase();
        if (textToSearchFor === "") {
            setNotes([...params.notes]);
            return;
        }

        setNotes(params.notes.filter(n => n.name.toLowerCase().includes(textToSearchFor)));
    }
    
    return <div className="h-full w-96 flex flex-col px-4 py-3 gap-2 box-border bg-gray-200 rounded-md">
        <div className="flex flex-nowrap justify-between text-center box-border h-8 gap-2 rounded-md font-extralight">
            <div className="flex flex-col justify-center">
                <SearchInput onInput={onSearchInput}/>
            </div>
            <div>
                <SideWindowSwitch onClick={(s) => setlistBehavior(s as unknown as NoteListShowBehavior)}
                                  title="Archived" node={<AllInboxRoundedIcon/>}/>
            </div>
        </div>
        <NoteList onNoteSelection={params.onNoteSelection}
                  onNoteArchiveRequest={params.onNoteArchiveRequest}
                  onNoteUnarchiveRequest={params.onNoteUnarchiveRequest}
                  notes={params.notes.length > 0 && notes.length < 1 ? params.notes : notes} behavior={listBehavior}></NoteList>
    </div>;
}

export interface ISideWindowParams {
    readonly notes: readonly INoteItemParams[];
    onNoteSelection: (noteId: Snowflake) => unknown;
    onNoteArchiveRequest: (noteId: Snowflake) => unknown;
    onNoteUnarchiveRequest: (noteId: Snowflake) => unknown;
}