export interface MakeResponse<T = Record<string, any>> {
    status: boolean;
    message: string;
    data?: T;
    statusCode?: number;
}

// Table Types
export const Tables = {
    User: "users",
    Wallet: "wallets",
} as const;
// type Table = (typeof Tables)[keyof typeof Tables];

export interface IUserSignUp {
    email: string;
    password: string;
    fullname: string;
    pin: string;
}
