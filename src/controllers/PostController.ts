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
        const cameraPerm = await ImagePicker.requestCameraPermissionsAsync();
        if (cameraPerm.status !== 'granted') {
            throw new Error('Permissão da câmera negada.');
        }

        // Solicita a permissão da biblioteca de mídia
        const mediaPerm = await MediaLibrary.requestPermissionsAsync();
        if (mediaPerm.status !== 'granted') {
            throw new Error('Permissão para salvar na galeria negada.');
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 0.8,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            const uri = result.assets[0].uri;
            await MediaLibrary.saveToLibraryAsync(uri); // Salva na galeria
            return uri;
        }

        return null;
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
    // Retorna o Endereço Formatado + Objeto de Coordenadas
    getLocation: async (): Promise<{ formattedAddress: string; coords: Location.LocationObjectCoords }> => {
        // 1. Verifica se os serviços de GPS do aparelho estão ativos
        const isLocationEnabled = await Location.hasServicesEnabledAsync();
        if (!isLocationEnabled) {
            throw new Error('O GPS do dispositivo está desligado. Por favor, ative a localização nas configurações.');
        }

        // 2. Solicita as permissões do usuário
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            throw new Error('Permissão de localização negada.');
        }

        // 3. Força precisão máxima (obrigatório para emulador ler nova coordenada)
        let loc: Location.LocationObject;
        try {
            loc = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Highest,
            });
        } catch {
            const lastKnown = await Location.getLastKnownPositionAsync();
            if (lastKnown) {
                loc = lastKnown;
            } else {
                throw new Error('Não foi possível obter a localização atual. Defina uma coordenada no emulador.');
            }
        }

        console.log("Coordenadas capturadas do GPS:", loc.coords.latitude, loc.coords.longitude);

        // 4. Geolocalização Reversa para obter o nome da rua/bairro
        let addressString = `Lat: ${loc.coords.latitude.toFixed(4)}, Long: ${loc.coords.longitude.toFixed(4)}`;

        try {
            const addressResponse = await Location.reverseGeocodeAsync({
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude,
            });

            if (addressResponse && addressResponse.length > 0) {
                const addr = addressResponse[0];
                const street = addr.street || addr.name || '';
                const district = addr.district || addr.subregion || '';
                const city = addr.city || addr.region || '';

                if (street || district || city) {
                    addressString = [street, district, city].filter(Boolean).join(', ');
                }
            }
        } catch {
            // Mantém as coordenadas caso a geolocalização reversa falhe
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