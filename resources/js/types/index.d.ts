export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    company: {
        id: number,
        uuid: string,
        name: string,
        tin: string,
        email: string
    };
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User
    };
};
