export interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    image?: string; // Поле необов'язкове
}