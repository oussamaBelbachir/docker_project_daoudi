import baseUrl from "./baseUrl";

export const getAllUsers = async (search) => {
        console.log(`--------------- api/v1/users${search}`);
        const res = await baseUrl.get(`api/v1/users${search}`);
        return res;
}

export const getUserById = async id => {
        const res = await baseUrl.get(`api/v1/users/${id}`);
        return res;
}

export const createUser = async (data) => {
        const res = await baseUrl.post("api/v1/users", data);
        return res;
}

export const updateUserById = async (id, data) => {
        const res = await baseUrl.patch(`api/v1/users/${id}`,data);
        return res;
}

