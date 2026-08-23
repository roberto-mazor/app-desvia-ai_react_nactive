import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CustomInput from '@/views/components/CustomInput';
import { CustomButton } from '@/views/components/CustomButton';

interface LoginScreenProps {
    email: string;
    setEmail: (val: string) => void;
    password: string;
    setPassword: (val: string) => void;
    onLogin: () => void;
    onGoogleLogin: () => void; // <--- NOVA PROP
    onNavigateToRegister: () => void;
}

export default function LoginScreen({
    email,
    setEmail,
    password,
    setPassword,
    onLogin,
    onGoogleLogin,
    onNavigateToRegister,
}: LoginScreenProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>DesviaAí 🕳️</Text>

            <CustomInput
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />

            <CustomInput
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <CustomButton title="Entrar" onPress={onLogin} />

            {/* Botão de Login com Google */}
            <TouchableOpacity style={styles.googleButton} onPress={onGoogleLogin}>
                <Text style={styles.googleButtonText}>🌐 Entrar com Google</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onNavigateToRegister}>
                <Text style={styles.link}>Não tem uma conta? Cadastre-se</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        color: '#333',
    },
    googleButton: {
        backgroundColor: '#ffffff',
        borderColor: '#4285F4',
        borderWidth: 1.5,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 15,
    },
    googleButtonText: {
        color: '#4285F4',
        fontWeight: 'bold',
        fontSize: 16,
    },
    link: {
        textAlign: 'center',
        color: '#2e64e5',
        marginTop: 10,
    },
});