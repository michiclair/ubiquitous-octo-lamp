import {FormEventHandler, useState} from "react";

export default function InputWithLabel(params: IInputParams)
{
    return <div className="flex flex-col">
        <div className="opacity-70">{params.label}</div>
        <input onInput={params.onInput} className={`mt-1 bg-white border-gray-100 border-b-gray-300 rounded-sm 
        border-2 box-border h-12 py-4 px-2 focus:border-blue-400 transition-all` +
        (params.isWrong  ? " border-red-300 border-b-red-400" : "")} />
    </div>;
}

export interface IInputParams {
    isWrong: boolean;
    label: string;
    onInput: FormEventHandler<HTMLInputElement>;
}