import React from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

interface NewPostScreenProps {
    photo: string | null;
    location: string;
    setLocation: (value: string) => void;
    details: string;
    setDetails: (value: string) => void;
    onTakePhoto: () => void;
    onGetLocation: () => void;
    onCreatePost: () => void;
    onCancel: () => void;
}

export default function NewPostScreen({
    photo,
    location,
    setLocation,
    details,
    setDetails,
    onTakePhoto,
    onGetLocation,
    onCreatePost,
    onCancel,
}: NewPostScreenProps) {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Registrar Buraco 🕳️</Text>

            {/* Preview da Foto ou Botão para Abrir a Câmera */}
            {photo ? (
                <View style={styles.imageContainer}>
                    <Image source={{ uri: photo }} style={styles.preview} />
                    <TouchableOpacity style={styles.changePhotoButton} onPress={onTakePhoto}>
                        <Text style={styles.changePhotoText}>Tirar Outra Foto</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <TouchableOpacity style={styles.photoBox} onPress={onTakePhoto}>
                    <Text style={styles.photoBoxText}>📸 Tirar Foto do Buraco</Text>
                </TouchableOpacity>
            )}

            {/* Botão de Localização Automática (GPS) */}
            <CustomButton
                title="📍 Pegar Localização Atual (GPS)"
                onPress={onGetLocation}
                style={styles.gpsButton}
            />

            {/* Campo de Texto para Ajustar ou Digitar a Localização */}
            <CustomInput
                placeholder="Ou digite o endereço (Rua, Bairro...)"
                value={location}
                onChangeText={setLocation}
            />

            {/* Campo de Texto para Detalhes / Descrição */}
            <CustomInput
                placeholder="Detalhes (Ex: Buraco profundo na faixa da direita)"
                value={details}
                onChangeText={setDetails}
                multiline
                style={styles.textArea}
            />

            {/* Ações de Publicação */}
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
    photoBox: {
        width: '100%',
        height: 180,
        backgroundColor: '#e1e1e1',
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#ccc',
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    photoBoxText: {
        fontSize: 16,
        color: '#555',
        fontWeight: '600',
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
    changePhotoButton: {
        marginTop: 8,
    },
    changePhotoText: {
        color: '#2e64e5',
        fontWeight: '600',
    },
    gpsButton: {
        backgroundColor: '#4b5563', // Cinza escuro para diferenciar do botão principal
        marginBottom: 10,
    },
    textArea: {
        height: 80,
        textAlignVertical: 'top',
    },
    cancelLink: {
        color: '#d9534f',
        marginTop: 10,
        fontWeight: '600',
    },
});