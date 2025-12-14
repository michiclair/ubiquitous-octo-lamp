"use client";
import {useState} from "react";

export default function SideWindowSwitch(params: ISideWindowSwitchParams) {
    const [state, setState] = useState<boolean>(false);

    const onClick = () => {
        const newState = !state;
        setState(newState);
        params.onClick(newState);
    }

    return <button className={`flex flex-nowrap box-border size-8 pt-1 justify-center rounded-sm
        transition-all hover:bg-gray-300 opacity-70 hover:opacity-100` +
        (state ? " hover:bg-gray-400 bg-gray-300 opacity-100" : "")} title={params.title} onClick={onClick}>
        {params.node}
    </button>;
}

export interface ISideWindowSwitchParams {
    readonly title: string;
    readonly node: React.ReactNode | string;
    readonly onClick: (state: boolean) => unknown; 
}