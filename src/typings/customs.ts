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
    Transaction: "transactions",
} as const;
// type Table = (typeof Tables)[keyof typeof Tables];

// Table Types
export const TransactionType = {
    Deposit: "deposit",
    Withdrawal: "withdrawal",
    Transfer: "transfer",
} as const;
// type Table = (typeof Tables)[keyof typeof Tables];

export interface IUserSignUp {
    email: string;
    password: string;
    fullname: string;
    pin: string;
}
