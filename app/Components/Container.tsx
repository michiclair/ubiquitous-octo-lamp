"use client";

import SideWindow from "@/app/Components/SideWindow";
import NoteWriter from "@/app/Components/NoteWriter";
import {FormEventHandler, useState, useEffect, useId} from "react";
import {Snowflake} from "@/app/Entities/Snowflake";
import {INoteItemParams} from "@/app/Components/NoteItem";
import LogInDialog from "@/app/Components/LogInDialog";
import {LocalStorageFacade} from "@/app/Services/LocalStorageFacade";
import {NoteService} from "@/app/Services/NoteService";

export default function Container()
{
    const writerKey = useId();
    const [listNotes, setListNotes] = useState<INoteItemParams[]>([]);
    const [isWriterDisabled, setIsWriterDisabled] = useState<boolean>(false);
    const [note, setNote] = useState<{ id?: Snowflake, name: string, content: string }>({
        name: "",
        content: "",
    });
    const [saved, setSaved] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            if (LocalStorageFacade.authorizationToken)
                setListNotes(await new NoteService().getNotes());
        })();
    }, []);
    
    const onNoteSelection = async (noteId: Snowflake) =>
    {
        if (note.id)
            await new NoteService().modifyNote(note.id, { name: note.name, content: note.content });
        const newNote = await new NoteService().getNote(noteId);
        setNote(newNote);
    }

    const onNoteArchiveRequest = async (noteId: Snowflake) => {
        await new NoteService().modifyNote(noteId, { isArchived: true });
        setListNotes(await new NoteService().getNotes());
    }

    const onNoteUnarchiveRequest = async (noteId: Snowflake) => {
        await new NoteService().modifyNote(noteId, { isArchived: false });
        setListNotes(await new NoteService().getNotes());
    }
    
    const onNameInput: FormEventHandler<HTMLInputElement> = (event) => {
        setSaved(false);
        const name = (event.target as HTMLInputElement).value;
        setNote(prev => ({ ...prev, name })); 
    }

    const onContentInput: FormEventHandler<HTMLTextAreaElement> = (event) => {
        setSaved(false);
        const content = (event.target as HTMLTextAreaElement).value;
        setNote(prev => ({ ...prev, content }));
    }

    useEffect(() => {
        if (saved || note.name.length < 1)
            return;

        const timer = setTimeout(async () => {
            if (!note.id)
            {
                //setIsWriterDisabled(true);
                const apiNote = await new NoteService().createNote({
                    name: note.name.trim(),
                    content: note.content.trim(),
                    categoryNames: getTags(note.content.trim()).concat(getTags(note.content.trim())) });
                setSaved(true);
                setNote(apiNote);
                //setIsWriterDisabled(false);
                setListNotes(await new NoteService().getNotes());
                return;
            }

            await new NoteService().modifyNote(note.id, {
                name: note.name, 
                content: note.content,
                categoryNames: getTags(note.content.trim()).concat(getTags(note.content.trim())) });
            setListNotes(await new NoteService().getNotes());
        }, 800);

        return () => clearTimeout(timer);
    }, [note]);

    return <div className="flex flex-row flex-nowrap box-border gap-8 px-8 py-4 h-screen w-screen items-center
    justify-center bg-gray-50">
        <LogInDialog />
        <SideWindow notes={listNotes} onNoteSelection={onNoteSelection}
                    onNoteArchiveRequest={onNoteArchiveRequest} onNoteUnarchiveRequest={onNoteUnarchiveRequest}/>
        <NoteWriter key={writerKey} name={note?.name ?? ""} content={note?.content ?? ""}
                    disabled={isWriterDisabled} onNameInput={onNameInput} onContentInput={onContentInput} />
    </div>;
}

const tagsRegExp = /#([a-zA-Z0-9_-]+)/g;

function getTags(text: string): string[]
{
    return Array.from(text.matchAll(tagsRegExp), match => match[1]);
}