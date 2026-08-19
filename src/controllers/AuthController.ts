import { UserModel } from '../models/UserModel';
import { IUser } from '../types';

export const AuthController = {
    login: async (email: string, password: string): Promise<IUser> => {
        if (!email || !password) {
            throw new Error('Preencha o e-mail e a senha.');
        }

        const users = await UserModel.getUsers();

        // Procura o usuário no array retornado
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

        if (!user) {
            throw new Error('E-mail ou senha incorretos.');
        }

        return user;
    },

    register: async (name: string, email: string, password: string): Promise<IUser> => {
        if (!name || !email || !password) {
            throw new Error('Preencha todos os campos do cadastro.');
        }

        const users = await UserModel.getUsers();

        // Verifica se o e-mail já foi cadastrado
        const userExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
        if (userExists) {
            throw new Error('Este e-mail já está cadastrado.');
        }

        const newUser: IUser = {
            name,
            email: email.toLowerCase(),
            password,
        };

        await UserModel.saveUser(newUser);
        return newUser;
    }
};