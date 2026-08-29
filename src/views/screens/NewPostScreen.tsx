import { Colors } from '@/Colors';
import { CustomButton } from '@/views/components/CustomButton';
import { LocationObjectCoords } from 'expo-location';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomInput from '../components/CustomInput';

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
    const insets = useSafeAreaInsets();

    return (
        <ScrollView
            contentContainerStyle={[
                styles.container,
                {
                    paddingTop: Math.max(insets.top, 20),
                    paddingBottom: Math.max(insets.bottom + 40, 50), // Garante espaço extra para a barra inferior
                },
            ]}
            showsVerticalScrollIndicator={false}
        >
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
                        key={`${coords.latitude}-${coords.longitude}`}
                        style={styles.map}
                        initialRegion={{
                            latitude: coords.latitude,
                            longitude: coords.longitude,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005,
                        }}
                    >
                        <Marker
                            coordinate={{
                                latitude: coords.latitude,
                                longitude: coords.longitude,
                            }}
                            title="Local do Buraco"
                            description={location}
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

            <View style={styles.actionsContainer}>
                <CustomButton title="Publicar Registro" onPress={onCreatePost} />
                <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
                    <Text style={styles.cancelLink}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: Colors.background,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#FFFFFF',
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
        backgroundColor: '#2A2A2A',
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#444',
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
    },
    galleryOptionButton: {
        marginRight: 0,
        marginLeft: 5,
        backgroundColor: '#1E2A38',
        borderColor: '#2E64E5',
    },
    photoOptionText: {
        fontSize: 14,
        color: '#EEEEEE',
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
    changeText: { color: '#4DA6FF', fontWeight: '600' },
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
        backgroundColor: '#2A2A2A',
        borderWidth: 1,
        borderColor: '#444',
        borderRadius: 8,
        marginVertical: 10,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    textArea: {
        minHeight: 80,
        textAlignVertical: 'top',
        fontSize: 14,
        color: '#FFFFFF',
    },
    actionsContainer: {
        width: '100%',
        marginTop: 10,
    },
    cancelButton: {
        alignItems: 'center',
        paddingVertical: 12,
    },
    cancelLink: {
        color: '#FF6B6B',
        fontWeight: '600',
    },
});