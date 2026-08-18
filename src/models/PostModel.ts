import AsyncStorage from "@react-native-async-storage/async-storage";
import { IPost } from "@/types";

export const PostModel = {
    getPosts: async (): Promise<IPost[]> => {
        const posts = await AsyncStorage.getItem('@post');
        return posts ? JSON.parse(posts) : [];
    },
    savePost: async (newPost: IPost): Promise<IPost[]> => {
        const posts = await PostModel.getPosts();
        const updated = [newPost, ...posts];
        await AsyncStorage.setItem('@posts', JSON.stringify(updated));
        return updated
    }
};