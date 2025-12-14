import {HttpClient, HttpMethod, HttpRequestMessage, JsonContent} from "michi-http-abstractions";
import {HttpFetchHandler} from "@/app/Utilities/HttpFetchHandler";
import {INoteApiObject} from "@/app/Entities/INoteApiObject";
import {IModifyNoteParams} from "@/app/Services/IModifyNoteParams";
import {Snowflake} from "@/app/Entities/Snowflake";
import {ICategoryApiObject} from "@/app/Entities/ICategoryApiObject";
import {ICreateNoteParams} from "@/app/Services/ICreateNoteParams";
import {ICreateCategoryParams} from "@/app/Services/ICreateCategoryParams";
import {IGetNotesQuery} from "@/app/Services/IGetNotesQuery";
import {LocalStorageFacade} from "@/app/Services/LocalStorageFacade";

export class NoteService
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

    public async getNotes(query: IGetNotesQuery = {}): Promise<INoteApiObject[]>
    {
        const path = "notes/" + (query.categoryId ? `?category=${query.categoryId}` : "");
        const request = new HttpRequestMessage(HttpMethod.Get, path);
        const response = await this._httpClient.send(request);
        response.ensureSuccessStatusCode();
        return JSON.parse(await response.content.readAsString());
    }

    public async getNote(noteId: Snowflake): Promise<INoteApiObject>
    {
        const request = new HttpRequestMessage(HttpMethod.Get, `notes/${noteId}`);
        const response = await this._httpClient.send(request);
        response.ensureSuccessStatusCode();
        return JSON.parse(await response.content.readAsString());
    }

    public async createNote(params: ICreateNoteParams): Promise<INoteApiObject>
    {
        const request = new HttpRequestMessage(HttpMethod.Post, `notes`);
        request.content = new JsonContent(params);
        const response = await this._httpClient.send(request);
        response.ensureSuccessStatusCode();
        return JSON.parse(await response.content.readAsString());
    }
    
    public async modifyNote(noteId: Snowflake, params: IModifyNoteParams): Promise<INoteApiObject>
    {
        const request = new HttpRequestMessage(HttpMethod.Patch, `notes/${noteId}`);
        request.content = new JsonContent(params);
        const response = await this._httpClient.send(request);
        response.ensureSuccessStatusCode();
        return JSON.parse(await response.content.readAsString());
    }
    
    public async deleteNote(noteId: Snowflake): Promise<void>
    {
        const request = new HttpRequestMessage(HttpMethod.Delete, `notes/${noteId}`);
        const response = await this._httpClient.send(request);
        response.ensureSuccessStatusCode();
    }
    
    public async getCategories(): Promise<ICategoryApiObject[]>
    {
        const request = new HttpRequestMessage(HttpMethod.Get, "note-categories");
        const response = await this._httpClient.send(request);
        response.ensureSuccessStatusCode();
        return JSON.parse(await response.content.readAsString());
    }

    public async getCategory(categoryId: Snowflake): Promise<ICategoryApiObject>
    {
        const request = new HttpRequestMessage(HttpMethod.Get, `note-categories/${categoryId}`);
        const response = await this._httpClient.send(request);
        response.ensureSuccessStatusCode();
        return JSON.parse(await response.content.readAsString());
    }

    public async createCategory(params: ICreateCategoryParams): Promise<ICategoryApiObject>
    {
        const request = new HttpRequestMessage(HttpMethod.Post, `note-categories`);
        request.content = new JsonContent(params);
        const response = await this._httpClient.send(request);
        response.ensureSuccessStatusCode();
        return JSON.parse(await response.content.readAsString());
    }
    
    public async deleteCategory(categoryId: Snowflake): Promise<void>
    {
        const request = new HttpRequestMessage(HttpMethod.Delete, `note-categories/${categoryId}`);
        const response = await this._httpClient.send(request);
        response.ensureSuccessStatusCode();
    }
}
