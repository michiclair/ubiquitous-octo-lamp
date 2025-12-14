import {FormEventHandler} from "react";

export default function SideWindowButton(params: ISideWindowButtonParams) {
    return <button onClick={params.onClick} className="flex flex-nowrap box-border size-8 pt-1 justify-center rounded-sm
    transition-colors hover:bg-gray-300 opacity-70 hover:opacity-100" title={params.title}>
        {params.node}
    </button>;
}

export interface ISideWindowButtonParams {
    readonly title: string;
    readonly node: React.ReactNode | string;
    onClick: FormEventHandler<HTMLButtonElement>;
}