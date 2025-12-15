"use client";
import AllInboxRoundedIcon from '@mui/icons-material/AllInboxRounded';
import SideWindowSwitch from "@/app/Components/SideWindowSwitch";
import NoteList, {NoteListShowBehavior} from "@/app/Components/NoteList";
import {FormEventHandler, useEffect, useId, useState} from "react";
import {INoteItemParams} from "@/app/Components/NoteItem";
import {Snowflake} from "@/app/Entities/Snowflake";
import SearchInput from "@/app/Components/SearchInput";
import {Option, Select} from "@mui/joy";
import {NoteService} from "@/app/Services/NoteService";

export default function SideWindow(params: ISideWindowParams)
{
    const defaultOptionNodeKey = useId();
    const noCategoryOptionKey = useId();
    const [listBehavior, setlistBehavior] = useState<NoteListShowBehavior>(NoteListShowBehavior.ShowActive);
    const [notes, setNotes] = useState<INoteItemParams[]>([...params.notes]);
    const [optionNodes, setOptionNodes] = useState<React.ReactNode[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
    const [searchInput, setSearchInput] = useState<string>("");

    useEffect(() => {
        (async () => {
            const activeCategoryIds = new Set((await new NoteService().getNotes()).map(n => n.categories).flat());
            const allCategories = await new NoteService().getCategories();
            const activeCategories = allCategories.filter(c => activeCategoryIds.has(c.id));
            const nodes = activeCategories.map(c => <Option key={c.id} value={c.id}>{c.name}</Option>);
            nodes.push(<Option key={defaultOptionNodeKey} value=""><i>None</i></Option>);
            setOptionNodes(prev => nodes);
        })();
    }, [selectedCategoryId]);
    
    const onCategorySelection = async (_1: unknown, categoryId: string | null) => {
        setSelectedCategoryId(categoryId ?? "");
        if (categoryId === "" || categoryId == null) {
            setNotes([...params.notes]);
            return;
        }

        setNotes(params.notes
            .filter(n => n.categories.includes(categoryId))
            .filter(n => n.name.toLowerCase().includes(searchInput)));
    }

    const onSearchInput: FormEventHandler<HTMLInputElement> = (e) => {
        const textToSearchFor = (e.target as HTMLInputElement).value.toLowerCase();
        setSearchInput(textToSearchFor);

        if (textToSearchFor === "") {
            setNotes([...params.notes]);
            return;
        }

        setNotes(params.notes
            .filter(n => n.name.toLowerCase().includes(textToSearchFor))
            .filter(n => n.categories.includes(selectedCategoryId)));
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
        <Select onChange={onCategorySelection} placeholder="Filter by cateogry...">
            {optionNodes}
        </Select>
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