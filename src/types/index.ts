export interface IUser {
    name: string;
    email: string;
    password?: string;
}

export interface IPost {
    id: string;
    author: string;
    photo: string;
    location: string;
    details: string;
    date: string;
}