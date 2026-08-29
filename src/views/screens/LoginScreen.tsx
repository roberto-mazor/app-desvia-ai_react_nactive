import { Colors } from '@/Colors';
import { CustomButton } from '@/views/components/CustomButton';
import CustomInput from '@/views/components/CustomInput';
import React from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native';
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
                    paddingTop: Math.max(insets.top + 30, 50),
                    paddingBottom: Math.max(insets.bottom + 20, 30),
                },
            ]}
        >
            {/* Header da Marca */}
            <View style={styles.header}>
                <Image
                    source={require('../../../assets/images/buraco1.png')}
                    style={styles.brandIconImage}
                    resizeMode="contain"
                />
                <Text style={styles.title}>Desvia Aí</Text>
                <Text style={styles.subtitle}>Mapeamento colaborativo de vias urbanas</Text>
            </View>

            {/* Card de Formulário */}
            <View style={styles.card}>
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

                <View style={styles.buttonWrapper}>
                    <CustomButton title="Acessar Plataforma" onPress={onLogin} />
                </View>

                <TouchableOpacity onPress={onNavigateToRegister} style={styles.registerLink}>
                    <Text style={styles.registerText}>
                        Não possui uma conta? <Text style={styles.highlight}>Cadastre-se</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingHorizontal: 22,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 32,
    },
    iconCircle: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: Colors.surface,
        borderWidth: 1.5,
        borderColor: Colors.border,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    brandIconImage: {
        width: 80,
        height: 80,
        marginBottom: 20
    },
    title: {
        fontSize: 30,
        fontWeight: '800',
        color: Colors.textPrimary,
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 14,
        color: Colors.textSecondary,
        textAlign: 'center',
        marginTop: 6,
    },
    card: {
        backgroundColor: Colors.surface,
        borderRadius: 20,
        padding: 24,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    buttonWrapper: {
        marginTop: 8,
    },
    registerLink: {
        marginTop: 18,
        alignItems: 'center',
    },
    registerText: {
        color: Colors.textSecondary,
        fontSize: 14,
    },
    highlight: {
        color: Colors.secondary,
        fontWeight: '700',
    },
});