import AsyncStorage from '@react-native-async-storage/async-storage'
import { IUser } from '@/types';

export const UserModel = {
    getUsers: async (): Promise<IUser[]> => {
        const users = await AsyncStorage.getItem('@users');
        return users ? JSON.parse(users) : [];
    },
    saveUser: async (newUser: IUser): Promise<IUser[]> => {
        const users = await UserModel.getUsers();
        const updated = [...users, newUser];
        await AsyncStorage.setItem('@users', JSON.stringify(updated));
        return updated;
    }
};