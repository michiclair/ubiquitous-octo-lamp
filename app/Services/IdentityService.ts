import {HttpClient, HttpMethod, HttpRequestMessage, JsonContent} from "michi-http-abstractions";
import {HttpFetchHandler} from "@/app/Utilities/HttpFetchHandler";
import {ILogInParams} from "@/app/Services/ILogInParams";
import {ILogInResponse} from "@/app/Services/ILogInResponse";
import {LocalStorageFacade} from "@/app/Services/LocalStorageFacade";

export class IdentityService
{
    private readonly _httpClient: HttpClient;
    
    public constructor() {
        this._httpClient = new HttpClient(new HttpFetchHandler());
        this._httpClient.baseAddress = new URL("https://localhost:5017/api/v1/");
        if (LocalStorageFacade.authorizationToken)
            this.authorizationToken = LocalStorageFacade.authorizationToken;
    }
    public get serverAddress()
    {
        return this._httpClient.baseAddress;
    }

    public set serverAddress(serverAddress: URL | null)
    {
        this._httpClient.baseAddress = serverAddress;
    }

    public get authorizationToken()
    {
        return this._httpClient.defaultRequestHeaders.get("authorization")?.[0] ?? null;
    }
    
    public set authorizationToken(authorizationToken: string | null)
    {
        this._httpClient.defaultRequestHeaders.delete("authorization");
        this._httpClient.defaultRequestHeaders.add("authorization", `Bearer ${authorizationToken}`);
    }

    public async logIn(params: ILogInParams): Promise<ILogInResponse>
    {
        const request = new HttpRequestMessage(HttpMethod.Post, "identity/log-in");
        request.content = new JsonContent(params);
        const response = await this._httpClient.send(request);
        response.ensureSuccessStatusCode();
        return JSON.parse(await response.content.readAsString());
    }
}
