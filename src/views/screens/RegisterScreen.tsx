import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

interface RegisterScreenProps {
    name: string;
    setName: (value: string) => void;
    email: string;
    setEmail: (value: string) => void;
    password: string;
    setPassword: (value: string) => void;
    onRegister: () => void;
    onNavigateToLogin: () => void;
}

export default function RegisterScreen({
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    onRegister,
    onNavigateToLogin,
}: RegisterScreenProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Criar Conta</Text>

            <CustomInput
                placeholder="Nome Completo"
                value={name}
                onChangeText={setName}
            />

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

            <CustomButton title="Salvar Cadastro" onPress={onRegister} />

            <TouchableOpacity onPress={onNavigateToLogin}>
                <Text style={styles.link}>Voltar ao Login</Text>
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
        fontSize: 26,
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