import { Colors } from '@/Colors';
import React from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

export default function CustomInput(props: TextInputProps) {
    return (
        <View style={styles.container}>
            <TextInput
                placeholderTextColor={Colors.textSecondary}
                style={[styles.input, props.style]}
                {...props}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 16,
    },
    input: {
        backgroundColor: Colors.surface,
        borderWidth: 1.5,
        borderColor: Colors.border,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 15,
        color: Colors.textPrimary,
    },
});