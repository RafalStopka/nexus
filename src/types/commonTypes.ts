export interface UserData {
    hex: string;
    currentColor: string;
    name: string;
}

export type UpdateType = (key: keyof UserData, value: string) => void;