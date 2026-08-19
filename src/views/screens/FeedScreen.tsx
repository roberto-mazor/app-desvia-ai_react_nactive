import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';
import { IPost } from '../../types';

interface FeedScreenProps {
    posts: IPost[];
    onNavigateToNewPost: () => void;
    onLogout: () => void;
}

export default function FeedScreen({
    posts,
    onNavigateToNewPost,
    onLogout,
}: FeedScreenProps) {
    return (
        <View style={styles.container}>
            {/* Cabeçalho da Tela */}
            <View style={styles.header}>
                <Text style={styles.title}>Desvia aí 🕳️</Text>
                <TouchableOpacity onPress={onLogout}>
                    <Text style={styles.logoutText}>Sair</Text>
                </TouchableOpacity>
            </View>

            {/* Botão Principal de Ação */}
            <CustomButton
                title="+ Registrar Novo Buraco"
                onPress={onNavigateToNewPost}
            />

            {/* Listagem das Publicações */}
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id}
                style={styles.list}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Nenhum buraco registrado ainda.</Text>
                        <Text style={styles.emptySubtext}>Seja o primeiro a alertar a comunidade!</Text>
                    </View>
                }
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.author}>👤 {item.author}</Text>
                            <Text style={styles.date}>{item.date}</Text>
                        </View>

                        <Image source={{ uri: item.photo }} style={styles.cardImage} />

                        <View style={styles.cardContent}>
                            <Text style={styles.location}>📍 {item.location}</Text>
                            <Text style={styles.details}>{item.details}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    logoutText: {
        color: '#d9534f',
        fontWeight: 'bold',
        fontSize: 16,
    },
    list: {
        width: '100%',
        marginTop: 10,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 12,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    author: {
        fontWeight: 'bold',
        color: '#333',
        fontSize: 15,
    },
    date: {
        color: '#888',
        fontSize: 12,
    },
    cardImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginVertical: 4,
        backgroundColor: '#eee',
    },
    cardContent: {
        marginTop: 8,
    },
    location: {
        fontWeight: '600',
        color: '#2e64e5',
        marginBottom: 4,
    },
    details: {
        color: '#444',
        fontSize: 14,
        lineHeight: 20,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40,
    },
    emptyText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#666',
    },
    emptySubtext: {
        fontSize: 14,
        color: '#999',
        marginTop: 4,
    },
});