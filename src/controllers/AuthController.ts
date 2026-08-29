import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserModel } from '../models/UserModel';
import { IUser } from '../types';

const CURRENT_USER_KEY = '@current_user';

export const AuthController = {
    login: async (email: string, password: string): Promise<IUser> => {
        const users = await UserModel.getUsers();
        const user = users.find((u) => u.email === email && u.password === password);

        if (!user) {
            throw new Error('E-mail ou senha incorretos.');
        }

        await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
        return user;
    },

    register: async (name: string, email: string, password: string): Promise<IUser> => {
        const users = await UserModel.getUsers();
        const userExists = users.some((u) => u.email === email);

        if (userExists) {
            throw new Error('Este e-mail já está cadastrado.');
        }

        const newUser: IUser = {
            id: Date.now().toString(),
            name,
            email,
            password,
        };

        await UserModel.saveUser(newUser);
        return newUser;
    },

    getCurrentUser: async (): Promise<IUser | null> => {
        const userJson = await AsyncStorage.getItem(CURRENT_USER_KEY);
        return userJson ? JSON.parse(userJson) : null;
    },

    logout: async (): Promise<void> => {
        await AsyncStorage.removeItem(CURRENT_USER_KEY);
    },

    formatGoogleUser: (userInfo: any): IUser => {
        return {
            id: userInfo.user.id,
            name: userInfo.user.name,
            email: userInfo.user.email,
        };
    },
};