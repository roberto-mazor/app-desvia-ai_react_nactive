import React from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT, UrlTile } from 'react-native-maps';
import { LocationObjectCoords } from 'expo-location';
import CustomInput from '../components/CustomInput';
import { CustomButton } from '@/views/components/CustomButton';

interface NewPostScreenProps {
    photo: string | null;
    location: string;
    setLocation: (value: string) => void;
    coords: LocationObjectCoords | null;
    details: string;
    setDetails: (value: string) => void;
    onTakePhoto: () => void;
    onPickGallery: () => void;
    onGetLocation: () => void;
    onCreatePost: () => void;
    onCancel: () => void;
}

export default function NewPostScreen({
    photo,
    location,
    setLocation,
    coords,
    details,
    setDetails,
    onTakePhoto,
    onPickGallery,
    onGetLocation,
    onCreatePost,
    onCancel,
}: NewPostScreenProps) {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Registrar Buraco 🕳️</Text>

            {/* Opções de Foto */}
            {photo ? (
                <View style={styles.imageContainer}>
                    <Image source={{ uri: photo }} style={styles.preview} />
                    <View style={styles.changeButtonsRow}>
                        <TouchableOpacity style={styles.changeButton} onPress={onTakePhoto}>
                            <Text style={styles.changeText}>📸 Nova Foto</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.changeButton} onPress={onPickGallery}>
                            <Text style={styles.changeText}>🖼️ Escolher da Galeria</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <View style={styles.photoBoxContainer}>
                    <TouchableOpacity style={styles.photoOptionButton} onPress={onTakePhoto}>
                        <Text style={styles.photoOptionText}>📸 Tirar Foto</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.photoOptionButton, styles.galleryOptionButton]} onPress={onPickGallery}>
                        <Text style={styles.photoOptionText}>🖼️ Galeria de Fotos</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Botão de Buscar GPS */}
            <View style={styles.fullWidthButton}>
                <CustomButton
                    title="📍 Pegar Localização Atual (GPS)"
                    onPress={onGetLocation}
                    variant="secondary"
                />
            </View>

            {/* Exibição do MapView */}
            {coords && (
                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.map}
                        mapType="none" // Remove a camada nativa do Google
                        initialRegion={{
                            latitude: coords.latitude,
                            longitude: coords.longitude,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005,
                        }}
                    >
                        <UrlTile
                            urlTemplate="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            maximumZ={19}
                            flipY={false}
                        />

                        <Marker
                            coordinate={{
                                latitude: coords.latitude,
                                longitude: coords.longitude,
                            }}
                            title="Local do Buraco"
                        />
                    </MapView>
                </View>
            )}

            <CustomInput
                placeholder="Ou digite o endereço (Rua, Bairro...)"
                value={location}
                onChangeText={setLocation}
            />

            <View style={styles.textAreaContainer}>
                <TextInput
                    placeholder="Detalhes (Ex: Buraco profundo na faixa da direita)"
                    placeholderTextColor="#888"
                    value={details}
                    onChangeText={setDetails}
                    multiline
                    numberOfLines={3}
                    style={styles.textArea}
                />
            </View>

            <CustomButton title="Publicar Registro" onPress={onCreatePost} />

            <TouchableOpacity onPress={onCancel}>
                <Text style={styles.cancelLink}>Cancelar</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        padding: 20,
        paddingTop: 50,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    photoBoxContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    photoOptionButton: {
        flex: 1,
        height: 120,
        backgroundColor: '#e1e1e1',
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#ccc',
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
    },
    galleryOptionButton: {
        marginRight: 0,
        marginLeft: 5,
        backgroundColor: '#e8f0fe',
        borderColor: '#2e64e5',
    },
    photoOptionText: {
        fontSize: 14,
        color: '#333',
        fontWeight: '600',
        textAlign: 'center',
    },
    imageContainer: {
        width: '100%',
        marginBottom: 15,
        alignItems: 'center',
    },
    preview: {
        width: '100%',
        height: 200,
        borderRadius: 8,
    },
    changeButtonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 10,
    },
    changeButton: { padding: 8 },
    changeText: { color: '#2e64e5', fontWeight: '600' },
    fullWidthButton: {
        width: '100%',
        marginVertical: 10,
    },
    mapContainer: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        overflow: 'hidden',
        marginVertical: 10,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    textAreaContainer: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        marginVertical: 10,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    textArea: {
        minHeight: 80,
        textAlignVertical: 'top',
        fontSize: 14,
        color: '#333333',
    },
    cancelLink: {
        color: '#d9534f',
        marginTop: 10,
        fontWeight: '600',
    },
});