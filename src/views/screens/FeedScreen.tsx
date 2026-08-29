import React from 'react';
import { Colors } from '@/Colors';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IPost } from '../../types';

interface FeedScreenProps {
    posts: IPost[];
    onNewPost: () => void;
    onLogout: () => void;
    onSelectPost: (post: IPost) => void;
}

export default function FeedScreen({ posts, onNewPost, onLogout, onSelectPost }: FeedScreenProps) {
    const insets = useSafeAreaInsets();

    const renderItem = ({ item }: { item: IPost }) => (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => onSelectPost(item)} 
        >
            <Image source={{ uri: item.photo }} style={styles.cardImage} />
            <View style={styles.cardContent}>
                <Text style={styles.cardLocation} numberOfLines={1}>
                    📍 {item.location}
                </Text>
                <Text style={styles.cardDetails} numberOfLines={2}>
                    {item.details}
                </Text>
                <View style={styles.cardFooter}>
                    <Text style={styles.cardAuthor}>Por: {item.author}</Text>
                    <Text style={styles.cardDate}>{item.date}</Text>
                </View>
                <Text style={styles.viewMoreText}>Toque para ver detalhes e mapa →</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View
            style={[
                styles.container,
                {
                    paddingTop: Math.max(insets.top, 20),
                    paddingBottom: Math.max(insets.bottom, 10),
                },
            ]}
        >
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Desvia Aí 🕳️</Text>
                <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
                    <Text style={styles.logoutText}>Sair</Text>
                </TouchableOpacity>
            </View>

            {/* Lista de Registros */}
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Nenhum buraco registrado ainda.</Text>
                        <Text style={styles.emptySubtext}>Seja o primeiro a reportar!</Text>
                    </View>
                }
            />

            {/* Botão Flutuante de Novo Post */}
            <TouchableOpacity
                style={[styles.fab, { bottom: Math.max(insets.bottom + 20, 25) }]}
                onPress={onNewPost}
            >
                <Text style={styles.fabText}>+ Reportar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#222',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFF',
    },
    logoutButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
        backgroundColor: 'rgba(255, 107, 107, 0.1)',
    },
    logoutText: {
        color: '#FF6B6B',
        fontWeight: '600',
    },
    listContainer: {
        padding: 16,
        paddingBottom: 90,
    },
    card: {
        backgroundColor: Colors.background,
        borderRadius: 12,
        marginBottom: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#2C2C2C',
    },
    cardImage: {
        width: '100%',
        height: 180,
    },
    cardContent: {
        padding: 14,
    },
    cardLocation: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 6,
    },
    cardDetails: {
        fontSize: 14,
        color: '#BBB',
        marginBottom: 10,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#2A2A2A',
        paddingTop: 8,
    },
    cardAuthor: {
        fontSize: 12,
        color: '#777',
    },
    cardDate: {
        fontSize: 12,
        color: '#777',
    },
    viewMoreText: {
        fontSize: 12,
        color: '#4DA6FF',
        marginTop: 8,
        fontWeight: '600',
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 80,
    },
    emptyText: {
        color: '#a7a7a7',
        fontSize: 16,
        fontWeight: 'bold',
    },
    emptySubtext: {
        color: '#555',
        fontSize: 14,
        marginTop: 4,
    },
    fab: {
        position: 'absolute',
        right: 20,
        backgroundColor: '#0066FF',
        paddingVertical: 14,
        paddingHorizontal: 22,
        borderRadius: 30,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    fabText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});