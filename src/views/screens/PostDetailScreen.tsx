import { Colors } from '@/Colors';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IPost } from '../../types';

interface PostDetailScreenProps {
    post: IPost;
    onBack: () => void;
}

export default function PostDetailScreen({ post, onBack }: PostDetailScreenProps) {
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
            {/* Botão de Voltar */}
            <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
                <Text style={styles.backText}>← Voltar para o Feed</Text>
            </TouchableOpacity>

            {/* Imagem em Destaque */}
            <Image source={{ uri: post.photo }} style={styles.image} />

            {/* Metadados: Autor e Data */}
            <View style={styles.infoCard}>
                <Text style={styles.author}>Publicado por: <Text style={styles.metaHighlight}>{post.author}</Text></Text>
                <Text style={styles.date}>Data: <Text style={styles.metaHighlight}>{post.date}</Text></Text>
            </View>

            {/* Seção Localização */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>📍 Localização</Text>
                <Text style={styles.sectionContent}>{post.location}</Text>
            </View>

            {/* Mapa Interativo */}
            {post.coords && (
                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: post.coords.latitude,
                            longitude: post.coords.longitude,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005,
                        }}
                    >
                        <Marker coordinate={post.coords} title="Local do Buraco" description={post.location} />
                    </MapView>
                </View>
            )}

            {/* Seção Detalhes */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>📝 Detalhes do Registro</Text>
                <Text style={styles.sectionContent}>{post.details}</Text>
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
    backButton: {
        marginBottom: 16,
        paddingVertical: 8,
        alignSelf: 'flex-start',
    },
    backText: {
        color: Colors.secondary,
        fontSize: 16,
        fontWeight: '700',
    },
    image: {
        width: '100%',
        height: 230,
        borderRadius: 16,
        marginBottom: 16,
        borderWidth: 1.5,
        borderColor: Colors.border,
    },
    infoCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 4,
        borderBottomWidth: 1,
        borderBottomColor: Colors.surface,
        marginBottom: 16,
    },
    author: {
        color: Colors.textSecondary,
        fontSize: 13,
    },
    date: {
        color: Colors.textSecondary,
        fontSize: 13,
    },
    metaHighlight: {
        color: Colors.textPrimary,
        fontWeight: '600',
    },
    section: {
        backgroundColor: Colors.surface,
        borderWidth: 1.5,
        borderColor: Colors.border,
        padding: 16,
        borderRadius: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 3,
    },
    sectionTitle: {
        color: Colors.textPrimary,
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 8,
    },
    sectionContent: {
        color: Colors.textSecondary,
        fontSize: 15,
        lineHeight: 22,
    },
    mapContainer: {
        width: '100%',
        height: 190,
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 16,
        borderWidth: 1.5,
        borderColor: Colors.border,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});