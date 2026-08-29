import AsyncStorage from '@react-native-async-storage/async-storage';
import { IPost } from '../types';

const POSTS_STORAGE_KEY = '@posts_data';

export const PostModel = {
    // 1. Busca todos os posts salvos
    getPosts: async (): Promise<IPost[]> => {
        try {
            const data = await AsyncStorage.getItem(POSTS_STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Erro ao buscar posts:', error);
            return [];
        }
    },

    // 2. Adiciona o novo post à lista existente sem sobrescrever
    savePost: async (newPost: IPost): Promise<IPost[]> => {
        try {
            const currentPosts = await PostModel.getPosts();
            // Coloca o novo post no topo da lista
            const updatedPosts = [newPost, ...currentPosts];

            await AsyncStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(updatedPosts));
            return updatedPosts;
        } catch (error) {
            console.error('Erro ao salvar post:', error);
            throw new Error('Não foi possível salvar o post.');
        }
    },

    // Limpar post
    clearPosts: async (): Promise<void> => {
        try {
            await AsyncStorage.removeItem(POSTS_STORAGE_KEY);
        } catch (error) {
            console.error('Erro ao limpar posts:', error);
        }
    },
};