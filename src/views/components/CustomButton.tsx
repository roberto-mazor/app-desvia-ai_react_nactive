import React from 'react'
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native'

interface Props {
    title: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
}

export default function CustomButton({ title, onPress, style }: CustomButtonProps) {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        backgroundColor: '#2e64e5',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10
    },
    buttonText: { color: '#fff', fontWeight: 'bold' }
});