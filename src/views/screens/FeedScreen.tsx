import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { CustomButton } from '../components/CustomButton';
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
            {/* Cabeçalho com Botão de Sair/Logout */}
            <View style={styles.header}>
                <Text style={styles.title}>Desvia aí 🕳️</Text>

                <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
                    <Text style={styles.logoutText}>🚪 Sair</Text>
                </TouchableOpacity>
            </View>

            <CustomButton
                title="+ Registrar Novo Buraco"
                onPress={onNavigateToNewPost}
            />

            <FlatList
                data={posts}
                keyExtractor={(item) => item.id}
                style={styles.list}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Nenhum buraco registrado ainda.</Text>
                    </View>
                }
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.author}>👤 {item.author}</Text>
                            <Text style={styles.date}>{item.date}</Text>
                        </View>
                        <Image source={{ uri: item.photo }} style={styles.cardImage} />
                        <Text style={styles.location}>📍 {item.location}</Text>
                        <Text style={styles.details}>{item.details}</Text>
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
    logoutButton: {
        backgroundColor: '#ffebee',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#ffcdd2',
    },
    logoutText: {
        color: '#d32f2f',
        fontWeight: 'bold',
        fontSize: 14,
    },
    list: {
        width: '100%',
        marginTop: 10,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#eee',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    author: {
        fontWeight: 'bold',
        color: '#333',
    },
    date: {
        color: '#888',
        fontSize: 12,
    },
    cardImage: {
        width: '100%',
        height: 180,
        borderRadius: 8,
        marginVertical: 6,
    },
    location: {
        fontWeight: '600',
        color: '#2e64e5',
    },
    details: {
        color: '#444',
        marginTop: 4,
    },
    emptyContainer: {
        alignItems: 'center',
        paddingVertical: 30,
    },
    emptyText: {
        color: '#888',
    },
});