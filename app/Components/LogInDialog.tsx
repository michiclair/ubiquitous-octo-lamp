import InputWithLabel from "@/app/Components/InputWithLabel";
import {useEffect, useState} from "react";
import {LocalStorageFacade} from "@/app/Services/LocalStorageFacade";
import {IdentityService} from "@/app/Services/IdentityService";

export default function LogInDialog()
{
    const [hidden, setHidden] = useState(true);
    const [isWrong, setWrong] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        setHidden(!!LocalStorageFacade.authorizationToken);
    }, []); 
    
    const logIn = async () => {
        try {
            const response = await new IdentityService().logIn({ userName, password });
            LocalStorageFacade.authorizationToken = response.token;
            setHidden(true);
        }
        catch {
            setWrong(true);
        }
    }

    return <div hidden={hidden} className="absolute w-screen h-screen z-10 flex flex-row justify-center items-center">
        <div className="absolute w-72 box-border p-8 bg-white rounded-sm z-30">
            <div className="flex flex-col  box-border gap-4 h-full">
                <InputWithLabel
                    isWrong={isWrong}
                    label="Username"
                    onInput={ev => {
                        setUserName((ev.target as HTMLInputElement).value.trim());
                        setWrong(false);
                    }} />
                <InputWithLabel
                    isWrong={isWrong}
                    label="Password"
                    onInput={ev => {
                        setPassword((ev.target as HTMLInputElement).value.trim());
                        setWrong(false);
                    }} />
                <button onClick={logIn} className="flex flex-row justify-center text-4xl font-bold h-18 py-4 mt-4 rounded-sm
                        text-white bg-purple-400 hover:bg-purple-500 active:bg-purple-600
                        cursor-pointer transition-all">LogIn</button>
            </div>
        </div>
        <div className="w-screen h-screen z-20 bg-black opacity-50"></div>
    </div>
}