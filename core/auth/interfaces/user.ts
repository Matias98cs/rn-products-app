export interface User {
    id: string;
    email: string;
    fullName: string;
    isActive: boolean;
    roles: string[];
}


export interface newUser {
    fullName: string;
    email: string;
    password: string;
}