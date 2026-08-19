import AsyncStorage from '@react-native-async-storage/async-storage';
import { IUser } from '../types';

const USERS_KEY = '@users';

export const UserModel = {
    // Retorna sempre um Array de IUser
    getUsers: async (): Promise<IUser[]> => {
        try {
            const data = await AsyncStorage.getItem(USERS_KEY);
            if (!data) return [];

            const parsed = JSON.parse(data);
            // Obs: ocorreu um erro ao tentar registrar, o erro "Propriedade "users" não foi encontrada"
            // Garante que o retorno seja um Array, mesmo que o storage esteja corrompido
            return Array.isArray(parsed) ? parsed : [];
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
            return [];
        }
    },

    // Recebe um novo usuário e salva no AsyncStorage
    saveUser: async (newUser: IUser): Promise<IUser[]> => {
        try {
            const currentUsers = await UserModel.getUsers();
            const updatedUsers = [...currentUsers, newUser];

            await AsyncStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
            return updatedUsers;
        } catch (error) {
            console.error('Erro ao salvar usuário:', error);
            throw new Error('Falha ao armazenar os dados no dispositivo.');
        }
    }
};