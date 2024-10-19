export interface IUser {
    userId: string;
    email: string | null;
    displayName?: string | null;
    role?: string | null;
}