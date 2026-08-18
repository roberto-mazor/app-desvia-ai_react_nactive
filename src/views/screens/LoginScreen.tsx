import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CustomInput from '@/views/components/CustomInput';
import CustomButton from '@/views/components/CustomButton';

interface LoginScreenProps {
    email: string;
    setEmail: (value: string) => void;
    password: string;
    setPassword: (value: string) => void;
    onLogin: () => void;
    onNavigateToRegister: () => void;
}

export default function LoginScreen({
    email,
    setEmail,
    password,
    setPassword,
    onLogin,
    onNavigateToRegister,
}: LoginScreenProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Desvia aí 🕳️</Text>

            <CustomInput
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />

            <CustomInput
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <CustomButton title="Entrar" onPress={onLogin} />

            <TouchableOpacity onPress={onNavigateToRegister}>
                <Text style={styles.link}>Criar Conta</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    link: {
        color: '#2e64e5',
        marginTop: 15,
        fontWeight: '600',
    },
});