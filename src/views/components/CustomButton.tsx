import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

// Declaração da interface CustomButtonProps
interface CustomButtonProps extends TouchableOpacityProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'google';
}

export const CustomButton: React.FC<CustomButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    ...rest
}) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                variant === 'secondary' && styles.secondaryButton,
                variant === 'google' && styles.googleButton,
            ]}
            onPress={onPress}
            {...rest}
        >
            <Text
                style={[
                    styles.text,
                    variant === 'secondary' && styles.secondaryText,
                    variant === 'google' && styles.googleText,
                ]}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#007AFF',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 6,
    },
    secondaryButton: {
        backgroundColor: '#6C757D',
    },
    googleButton: {
        backgroundColor: '#4285F4',
    },
    text: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    secondaryText: {
        color: '#FFF',
    },
    googleText: {
        color: '#FFF',
    },
});