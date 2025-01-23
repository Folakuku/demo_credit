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

// Table Types
export const TransactionType = {
    Deposit: "deposit",
    Withdrawal: "withdrawal",
    Transfer: "transfer",
} as const;

export interface IUserSignUp {
    email: string;
    password: string;
    fullname: string;
    pin: string;
}
