import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

export default function CustomInput(props: TextInputProps) {
    return <TextInput style={[styles.input, props.style]} {...props} />;
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd'
    }
});