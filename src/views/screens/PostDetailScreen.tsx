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
                    paddingTop: Math.max(insets.top, 20),
                    paddingBottom: Math.max(insets.bottom + 30, 40),
                },
            ]}
        >
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
                <Text style={styles.backText}>← Voltar para o Feed</Text>
            </TouchableOpacity>

            <Image source={{ uri: post.photo }} style={styles.image} />

            <View style={styles.infoCard}>
                <Text style={styles.author}>Publicado por: {post.author}</Text>
                <Text style={styles.date}>Data: {post.date}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>📍 Localização</Text>
                <Text style={styles.sectionContent}>{post.location}</Text>
            </View>

            {/* Exibe o mapa caso o post possua coordenadas salvas */}
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
                        <Marker coordinate={post.coords} title="Local do Buraco" />
                    </MapView>
                </View>
            )}

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
        marginBottom: 15,
        paddingVertical: 8,
    },
    backText: {
        color: '#4DA6FF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    image: {
        width: '100%',
        height: 240,
        borderRadius: 12,
        marginBottom: 15,
    },
    infoCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
        marginBottom: 15,
    },
    author: {
        color: '#AAAAAA',
        fontSize: 13,
    },
    date: {
        color: '#AAAAAA',
        fontSize: 13,
    },
    section: {
        backgroundColor: '#2A2A2A',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
    },
    sectionTitle: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    sectionContent: {
        color: '#DDDDDD',
        fontSize: 14,
        lineHeight: 20,
    },
    mapContainer: {
        width: '100%',
        height: 180,
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 15,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});