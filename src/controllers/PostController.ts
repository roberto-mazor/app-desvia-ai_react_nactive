import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { PostModel } from '../models/PostModel';
import { IPost } from '../types';

interface ICreatePostInput {
    photo: string | null;
    location: string;
    details: string;
    author: string;
}

export const PostController = {
    takePhoto: async (): Promise<string | null> => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') throw new Error('Permissão da câmera negada.');

        const result = await ImagePicker.launchCameraAsync({ quality: 0.5 });
        if (result.canceled) return null;
        return result.assets[0].uri;
    },
    getLocation: async (): Promise<string> => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') throw new Error('Permissão de localização negada.');

        const loc = await Location.getCurrentPositionAsync({});
        return `Lat: ${loc.coords.latitude.toFixed(4)}, Long: ${loc.coords.longitude.toFixed(4)}`;
    },
    createPost: async ({ photo, location, details, author }: ICreatePostInput): Promise<IPost[]> => {
        if (!photo || !location || !details) throw new Error('Preencha a foto, local e detalhes.');

        const newPost: IPost = {
            id: Date.now().toString(),
            author,
            photo,
            location,
            details,
            date: new Date().toLocaleDateString('pt-BR')
        };
        return await PostModel.savePost(newPost);
    }
};