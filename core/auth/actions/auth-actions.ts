import { prodcutsApi } from "../api/productsApi";
import { User } from "../interfaces/user";

export interface AuthResponse {
    id: string;
    email: string;
    fullName: string;
    isActive: boolean;
    roles: string[];
    token: string;
}

const resturnUserToken = (data: AuthResponse): {
    user: User;
    token: string;
} => {
    const { token, ...user } = data;

    return {
        user,
        token,
    }
}



export const authLogin = async (email: string, password: string) => {
    email = email.toLowerCase()

    try {
        const { data } = await prodcutsApi.post<AuthResponse>('/auth/login', {
            email,
            password,
        });

        return resturnUserToken(data)

    } catch (error) {
        console.log(error)
        return null
    }
}


export const authCheckStatus = async () => {
    try {
        const { data } = await prodcutsApi.get<AuthResponse>('/auth/check-status')        
        return resturnUserToken(data)
    } catch (error) {
        return null
    }
}

export const authRegister = async (email: string, password: string, fullName: string) => {
    email = email.toLowerCase()

    try {
        const { data } = await prodcutsApi.post<AuthResponse>('/auth/register', {
            email,
            password,
            fullName,
        });

        return resturnUserToken(data)

    } catch (error) {
        console.log(error)
        return null
    }
}