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

    },
    header: {

    },
    title: {

    },
    logoutText: {

    },
    list: {

    },
    card: {

    },
    cardHeader: {

    },
    author: {

    },
    date: {

    },
    cardImage: {

    },
    cardContent: {

    },
    location: {

    },
    details: {

    },
    emptyContainer: {
  
    },
    emptyText: {

    },
    emptySubtext: {

    },
});