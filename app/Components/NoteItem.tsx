import {Snowflake} from "@/app/Entities/Snowflake";
import SideWindowButton from "@/app/Components/SideWindowButton";
import ArchiveRoundedIcon from '@mui/icons-material/ArchiveRounded';
import UnarchiveRoundedIcon from '@mui/icons-material/UnarchiveRounded';

export default function NoteItem(params: INoteItemParams)
{
    return <div
        onClick={() => params.onClick ? params.onClick(params.id) : null}
        className="flex flex-nowrap justify-between box-border h-12 items-center p-2 bg-gray-100 cursor-pointer">
        <div className="opacity-70 ">{params.name}</div>
        <div>
            <div>{!params.isArchived ?
                <SideWindowButton
                    onClick={() => params.onArchiveRequest ? params.onArchiveRequest(params.id) : null}
                    title="Archive" node={<ArchiveRoundedIcon/>}></SideWindowButton>
                : null }</div>
            <div>{params.isArchived ?
                <SideWindowButton
                    onClick={() => params.onUnarchiveRequest ? params.onUnarchiveRequest(params.id) : null}
                    title="Unarchive" node={<UnarchiveRoundedIcon/>}></SideWindowButton>
                : null }</div>
        </div>
    </div>
}

export interface INoteItemParams {
    id: Snowflake;
    name: string;
    isArchived: boolean;
    onClick?: (params: Snowflake) => unknown;
    onArchiveRequest?: (params: Snowflake) => unknown;
    onUnarchiveRequest?: (params: Snowflake) => unknown;
}