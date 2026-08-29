import { Colors } from '@/Colors';
import { IPost } from '@/types';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
            activeOpacity={0.85}
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

                <View style={styles.detailLinkRow}>
                    <Text style={styles.viewMoreText}>Toque para ver detalhes e mapa</Text>
                    <Text style={styles.arrowIcon}>→</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View
            style={[
                styles.container,
                {
                    paddingTop: Math.max(insets.top + 10, 20),
                    paddingBottom: Math.max(insets.bottom, 10),
                },
            ]}
        >
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.brandTitleRow}>
                    <Text style={styles.brandIcon}>🕳️</Text>
                    <Text style={styles.headerTitle}>Desvia Aí</Text>
                </View>
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
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyEmoji}>🛣️</Text>
                        <Text style={styles.emptyText}>Nenhum buraco registrado ainda.</Text>
                        <Text style={styles.emptySubtext}>Seja o primeiro a reportar uma via danificada!</Text>
                    </View>
                }
            />

            {/* Botão Flutuante de Novo Post */}
            <TouchableOpacity
                style={[styles.fab, { bottom: Math.max(insets.bottom + 20, 25) }]}
                activeOpacity={0.85}
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
        backgroundColor: Colors.background, // #0F172A
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.surface,
    },
    brandTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    brandIcon: {
        fontSize: 22,
        marginRight: 8,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: Colors.textPrimary,
        letterSpacing: -0.5,
    },
    logoutButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        backgroundColor: 'rgba(239, 68, 68, 0.15)',
        borderWidth: 1,
        borderColor: 'rgba(239, 68, 68, 0.3)',
    },
    logoutText: {
        color: Colors.danger,
        fontWeight: '700',
        fontSize: 13,
    },
    listContainer: {
        padding: 18,
        paddingBottom: 100,
    },
    card: {
        backgroundColor: Colors.surface, // #1E293B (mesmo contraste refinado)
        borderRadius: 16,
        marginBottom: 20,
        overflow: 'hidden',
        borderWidth: 1.5,
        borderColor: Colors.border, // #475569
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 4,
    },
    cardImage: {
        width: '100%',
        height: 190,
    },
    cardContent: {
        padding: 16,
    },
    cardLocation: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.textPrimary,
        marginBottom: 6,
    },
    cardDetails: {
        fontSize: 14,
        color: Colors.textSecondary,
        lineHeight: 20,
        marginBottom: 12,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        paddingTop: 10,
        marginBottom: 10,
    },
    cardAuthor: {
        fontSize: 12,
        color: Colors.textMuted,
    },
    cardDate: {
        fontSize: 12,
        color: Colors.textMuted,
    },
    detailLinkRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.surfaceInput,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    viewMoreText: {
        fontSize: 13,
        color: Colors.secondary,
        fontWeight: '600',
    },
    arrowIcon: {
        fontSize: 14,
        color: Colors.secondary,
        fontWeight: 'bold',
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 100,
    },
    emptyEmoji: {
        fontSize: 48,
        marginBottom: 12,
    },
    emptyText: {
        color: Colors.textPrimary,
        fontSize: 16,
        fontWeight: '700',
    },
    emptySubtext: {
        color: Colors.textSecondary,
        fontSize: 14,
        marginTop: 6,
    },
    fab: {
        position: 'absolute',
        right: 20,
        backgroundColor: Colors.primary,
        paddingVertical: 15,
        paddingHorizontal: 24,
        borderRadius: 30,
        elevation: 6,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
    },
    fabText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});