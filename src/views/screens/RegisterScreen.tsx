import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

interface RegisterScreenProps {
    name: string;
    setName: (value: string) => void;
    email: string;
    setEmail: (Value: string) => void;
    password: string;
    setPassword: (value: string) =) void;
    onRegister: () => void;
    onNavigtateToLogin: () => void;
}

export default function RegisterScreen({
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    onRegister,
    onNavigtateToLogin
}: RegisterScreenProps) {
    return (
        <View style={StyleSheet.container}>
            <Text style={StyleSheet.title}>Criar Conta</Text>

            <CustomImput
                placeholder="Nome Completo"
                value={name}
                onChangeText={setName}
            />
        </View>
    )
}