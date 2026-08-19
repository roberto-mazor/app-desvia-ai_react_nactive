import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
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
        // 1. Permissão da Câmera
        const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
        if (cameraPermission.status !== 'granted') {
            throw new Error('Permissão de acesso à câmera negada.');
        }

        // 2. Permissão da Galeria especificando SOMENTE ESCRITA (evita pedir áudio)
        const mediaPermission = await MediaLibrary.requestPermissionsAsync(true);
        if (mediaPermission.status !== 'granted') {
            throw new Error('Permissão para salvar na galeria negada.');
        }

        // 3. Captura a imagem
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.7,
            allowsEditing: true,
        });

        if (result.canceled || !result.assets[0].uri) {
            return null;
        }

        const photoUri = result.assets[0].uri;

        // 4. Salva a imagem tirada no álbum/galeria
        await MediaLibrary.saveToLibraryAsync(photoUri);

        return photoUri;
    },

    getLocation: async (): Promise<string> => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            throw new Error('Permissão de localização negada.');
        }

        const loc = await Location.getCurrentPositionAsync({});
        return `Lat: ${loc.coords.latitude.toFixed(4)}, Long: ${loc.coords.longitude.toFixed(4)}`;
    },

    createPost: async ({ photo, location, details, author }: ICreatePostInput): Promise<IPost[]> => {
        if (!photo || !location || !details) {
            throw new Error('Preencha a foto, localização e detalhes!');
        }

        const newPost: IPost = {
            id: Date.now().toString(),
            author,
            photo,
            location,
            details,
            date: new Date().toLocaleDateString('pt-BR'),
        };

        return await PostModel.savePost(newPost);
    },
};