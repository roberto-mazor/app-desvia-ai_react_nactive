import { Colors } from '@/Colors';
import { CustomButton } from '@/views/components/CustomButton';
import CustomInput from '@/views/components/CustomInput';
import { LocationObjectCoords } from 'expo-location';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
                    paddingTop: Math.max(insets.top + 10, 20),
                    paddingBottom: Math.max(insets.bottom + 30, 40),
                },
            ]}
            showsVerticalScrollIndicator={false}
        >
            {/* Header com Botão Voltar */}
            <View style={styles.header}>
                <TouchableOpacity onPress={onCancel} style={styles.backButton} activeOpacity={0.7}>
                    <Text style={styles.backText}>← Voltar</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Registrar Buraco</Text>
                <View style={styles.headerPlaceholder} />
            </View>

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
                    <TouchableOpacity style={styles.photoOptionButton} activeOpacity={0.8} onPress={onTakePhoto}>
                        <Text style={styles.photoOptionIcon}>📸</Text>
                        <Text style={styles.photoOptionText}>Tirar Foto</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.photoOptionButton, styles.galleryOptionButton]} activeOpacity={0.8} onPress={onPickGallery}>
                        <Text style={styles.photoOptionIcon}>🖼️</Text>
                        <Text style={styles.photoOptionText}>Galeria de Fotos</Text>
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
                    placeholderTextColor={Colors.textSecondary}
                    value={details}
                    onChangeText={setDetails}
                    multiline
                    numberOfLines={3}
                    style={styles.textArea}
                />
            </View>

            {/* Botão de Ação Único em Largura Total */}
            <View style={styles.actionsContainer}>
                <CustomButton title="Publicar Registro" onPress={onCreatePost} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: Colors.background,
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 24,
    },
    backButton: {
        paddingVertical: 8,
        paddingHorizontal: 4,
    },
    backText: {
        color: Colors.secondary,
        fontSize: 16,
        fontWeight: '700',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: Colors.textPrimary,
        letterSpacing: -0.5,
    },
    headerPlaceholder: {
        width: 60, // Equilibra o espaço ocupado pelo botão Voltar para centralizar o título
    },
    photoBoxContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
        gap: 12,
    },
    photoOptionButton: {
        flex: 1,
        height: 110,
        backgroundColor: Colors.surface,
        borderRadius: 14,
        borderWidth: 1.5,
        borderColor: Colors.border,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
    },
    galleryOptionButton: {
        backgroundColor: Colors.surface,
        borderColor: Colors.border,
    },
    photoOptionIcon: {
        fontSize: 26,
        marginBottom: 6,
    },
    photoOptionText: {
        fontSize: 13,
        color: Colors.textPrimary,
        fontWeight: '700',
    },
    imageContainer: {
        width: '100%',
        marginBottom: 16,
        alignItems: 'center',
    },
    preview: {
        width: '100%',
        height: 200,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    changeButtonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 10,
    },
    changeButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
    },
    changeText: {
        color: Colors.secondary,
        fontWeight: '700',
        fontSize: 13,
    },
    fullWidthButton: {
        width: '100%',
        marginBottom: 16,
    },
    mapContainer: {
        width: '100%',
        height: 180,
        borderRadius: 14,
        overflow: 'hidden',
        marginBottom: 16,
        borderWidth: 1.5,
        borderColor: Colors.border,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    textAreaContainer: {
        width: '100%',
        backgroundColor: Colors.surface,
        borderWidth: 1.5,
        borderColor: Colors.border,
        borderRadius: 12,
        marginBottom: 16,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    textArea: {
        minHeight: 80,
        textAlignVertical: 'top',
        fontSize: 15,
        color: Colors.textPrimary,
    },
    actionsContainer: {
        width: '100%',
        marginTop: 8,
    },
});