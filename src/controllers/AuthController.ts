import * as WebBrowser from 'expo-web-browser';
import { UserModel } from '../models/UserModel';
import { IUser } from '../types';

WebBrowser.maybeCompleteAuthSession();

export const AuthController = {
    login: async (email: string, password: string): Promise<IUser> => {
        if (!email || !password) {
            throw new Error('Preencha o e-mail e a senha.');
        }

        const users = await UserModel.getUsers();
        const user = users.find(
            u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );

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
    },

    // Formata os dados recebidos da API do Google via expo-auth-session
    formatGoogleUser: (userInfo: any): IUser => {
        return {
            id: userInfo.id,
            name: userInfo.name || 'Usuário Google',
            email: userInfo.email,
        };
    },
};