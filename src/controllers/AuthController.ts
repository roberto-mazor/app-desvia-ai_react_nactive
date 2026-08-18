import { UserModel } from "@/models/UserModel";
import { IUser } from "@/types";

export const AuthController = {
    login: async (email: string, password: string): Promise<IUser> => {
        if (!email || !password) throw new Error('Preencha e-mail e senha.');
        const users = await UserModel.getUsers();
        const user = users.find(u => u.email === email && u.password === password);
        if (!user) throw new Error('E-mail ou senha incorretos.');
        return user;
    },
    register: async (name: string, email: string, password: string): Promise<IUser> => {
        if (!name || !email || !password) throw new Error('Preencha todos os campos.');
        const newUser: IUser = { name, email, password};
        const emailExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
        await UserModel.saveUser(newUser);
        return newUser;
    }
}


