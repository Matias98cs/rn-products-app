import { authCheckStatus, authLogin } from "@/core/auth/actions/auth-actions";
import { User } from "@/core/auth/interfaces/user";
import { create } from "zustand";


export type AuthStatus = 'authenticated' | 'unauthenticated' | 'checking';

export interface AuthState {
    status: AuthStatus;
    token?: string;
    user?: User;

    login: (email: string, password: string) => Promise<boolean>;
    checkStatus: () => Promise<void>;
    logout: () => Promise<void>;
    changeStatus: (token?: string, user?: User) => boolean;
}


export const useAuthStore = create<AuthState>()((set, get) => ({
    //Propiedades
    status: 'checking',
    token: undefined,
    user: undefined,

    //Acciones
    changeStatus: (token?: string, user?: User) => {

        if (!token || !user) {
            set({ status: 'authenticated', token: undefined, user: undefined });
            return false
        }

        set({ status: 'authenticated', token: token, user: user });

        return true
    },
    login: async (email: string, password: string) => {
        const resp = await authLogin(email, password);
        return get().changeStatus(resp?.token, resp?.user)
    },
    checkStatus: async () => {
        const resp = await authCheckStatus();
        get().changeStatus(resp?.token, resp?.user)
    },
    logout: async () => {
        // borrar el token del secure storage

        set({ status: 'unauthenticated', token: undefined, user: undefined });

        return
    },
}))