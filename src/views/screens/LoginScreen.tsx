import { CustomButton } from '@/views/components/CustomButton';
import CustomInput from '@/views/components/CustomInput';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
    const insets = useSafeAreaInsets();

    return (
        <View
            style={[
                styles.container,
                {
                    paddingTop: Math.max(insets.top + 40, 60),
                    paddingBottom: Math.max(insets.bottom + 20, 30),
                },
            ]}
        >
            <Text style={styles.title}>Desvia Aí 🕳️</Text>
            <Text style={styles.subtitle}>Faça login para continuar</Text>

            <View style={styles.form}>
                <CustomInput
                    placeholder="Seu e-mail"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <CustomInput
                    placeholder="Sua senha"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <CustomButton title="Entrar" onPress={onLogin} />

                <TouchableOpacity onPress={onNavigateToRegister} style={styles.registerLink}>
                    <Text style={styles.registerText}>
                        Não tem conta? <Text style={styles.highlight}>Cadastre-se</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        paddingHorizontal: 25,
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#888888',
        textAlign: 'center',
        marginBottom: 40,
    },
    form: {
        width: '100%',
    },
    registerLink: {
        marginTop: 20,
        alignItems: 'center',
        paddingVertical: 10,
    },
    registerText: {
        color: '#AAAAAA',
        fontSize: 14,
    },
    highlight: {
        color: '#0066FF',
        fontWeight: 'bold',
    },
});