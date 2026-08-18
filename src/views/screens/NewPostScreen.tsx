TypeScript
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
container:{
    flexGrow:1
},

title: {
        
    },

    photoBox: {

    },
    photoBoxText: {

    },
    ImageContainer: {

    },
    preview: {

    },
    changePhotoButton: {

    },
    changePhotoText: {

    },
    gpsButton: {

    },
    textArea: {

    },
    cancelLink: {

    },

})