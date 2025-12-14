export class LocalStorageFacade
{
    private constructor() {
    }

    public static get authorizationToken()
    {
        return localStorage.getItem("authorizationToken");
    }

    public static set authorizationToken(value: string | null)
    {
        if (value == null) {
            localStorage.removeItem("authorizationToken");
            return;
        }

        localStorage.setItem("authorizationToken", value);
    }
}