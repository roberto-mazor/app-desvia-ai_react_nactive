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
    // Tirar foto com a Câmera e salvar na galeria
    takePhoto: async (): Promise<string | null> => {
        const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
        if (cameraPermission.status !== 'granted') {
            throw new Error('Permissão de acesso à câmera negada.');
        }

        const mediaPermission = await MediaLibrary.requestPermissionsAsync(true);
        if (mediaPermission.status !== 'granted') {
            throw new Error('Permissão para salvar na galeria negada.');
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.7,
            allowsEditing: true,
        });

        if (result.canceled || !result.assets[0].uri) {
            return null;
        }

        const photoUri = result.assets[0].uri;
        await MediaLibrary.saveToLibraryAsync(photoUri);

        return photoUri;
    },

    // Selecionar imagem já existente da Galeria de Fotos
    pickImageFromGallery: async (): Promise<string | null> => {
        const mediaPermission = await MediaLibrary.requestPermissionsAsync(true);
        if (mediaPermission.status !== 'granted') {
            throw new Error('Permissão para acessar as fotos da galeria negada.');
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.7,
            allowsEditing: true,
        });

        if (result.canceled || !result.assets[0].uri) {
            return null;
        }

        return result.assets[0].uri;
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