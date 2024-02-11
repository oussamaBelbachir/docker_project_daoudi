import baseUrl from "./baseUrl";

export const login = async (data) => {
        const res = await baseUrl.post("api/v1/users/login",data);
        return res;
}

export const logout = async (data) => {
        const res = await baseUrl.get("api/v1/users/logout");
        return res;
}


export const checkUser = async () => {
        const res = await baseUrl.get("api/v1/users/check");
        return res;
}