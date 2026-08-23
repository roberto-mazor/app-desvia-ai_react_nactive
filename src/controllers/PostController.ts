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

    pickImageFromGallery: async (): Promise<string | null> => {
        const mediaPermission = await MediaLibrary.requestPermissionsAsync(true);
        if (mediaPermission.status !== 'granted') {
            throw new Error('Permissão para acessar a galeria negada.');
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

    // Retorna o Endereço Formatado + Objeto de Coordenadas
    getLocation: async (): Promise<{ formattedAddress: string; coords: Location.LocationObjectCoords }> => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            throw new Error('Permissão de localização negada.');
        }

        const loc = await Location.getCurrentPositionAsync({});

        // Geolocalização Reversa para obter o nome da rua/bairro
        const addressResponse = await Location.reverseGeocodeAsync({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
        });

        let addressString = `Lat: ${loc.coords.latitude.toFixed(4)}, Long: ${loc.coords.longitude.toFixed(4)}`;

        if (addressResponse.length > 0) {
            const addr = addressResponse[0];
            const street = addr.street || addr.name || '';
            const district = addr.district || addr.subregion || '';
            const city = addr.city || '';

            if (street || district) {
                addressString = [street, district, city].filter(Boolean).join(', ');
            }
        }

        return {
            formattedAddress: addressString,
            coords: loc.coords,
        };
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