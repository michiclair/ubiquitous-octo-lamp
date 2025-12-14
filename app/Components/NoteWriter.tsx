import {FormEventHandler, useId} from "react";

export default function NoteWriter(params: INoteWriterParams)
{
    const textareaPlaceholder = "Hi, Welcome to the note app! Start writing your text here.";
    // To add a tag, simply use the hash symbol (#) followed by the category name, like #Ideas.
    // ^Discarded, no time to end the category related functions.
    return <div className="flex flex-nowrap flex-col h-full min-w-[50%] w-full box-border p-8 bg-white rounded-md">
        <input disabled={params.disabled} onInput={params.onNameInput} type="text" value={params.name}
               placeholder="<Untitled Note>" className="text-6xl opacity-70 focus:opacity-100 transition-opacity
        pb-2 border-b-2 border-b-transparent hover:border-b-gray-200 focus:border-b-blue-500 select-none
        mb-2"></input>
        <textarea disabled={params.disabled} value={params.content} onInput={params.onContentInput}
                  placeholder={textareaPlaceholder} className="text-2xl opacity-70 focus:opacity-100 h-full"></textarea>
    </div>;
}

export interface INoteWriterParams {
    readonly disabled: boolean;
    readonly name: string;
    readonly content: string;
    readonly onNameInput: FormEventHandler<HTMLInputElement>;
    readonly onContentInput: FormEventHandler<HTMLTextAreaElement>;
}