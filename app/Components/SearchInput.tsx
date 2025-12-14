import {FormEventHandler} from "react";

export default function SearchInput(params: ISearchInputParams)
{
    return <div className="flex flex-col">
        <input onInput={params.onInput} placeholder="Search" className={`mt-1 bg-white border-gray-100 border-b-gray-300 rounded-sm 
        border-2 box-border w-full h-8 py-2 px-2 focus:border-blue-400 transition-all`} />
    </div>;
}

export interface ISearchInputParams {
    onInput: FormEventHandler<HTMLInputElement>;
}