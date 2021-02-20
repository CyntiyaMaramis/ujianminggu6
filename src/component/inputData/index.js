import React from 'react'
import { StyleSheet, Text, TextInput } from 'react-native'

const InputData = ({ label, placeholder, keyboardType, onChangeText, namaState, value }) => {
    return (
        <>
            <Text style={styles.label}>{label} : </Text>
            <TextInput
                multiline={true}
                numberoflines={13}
                placeholder={placeholder}
                keyboardType={keyboardType}
                value={value}
                onChangeText={(text) => onChangeText(namaState, text)} />
        </>
    )
}

export default InputData;

const styles = StyleSheet.create({
    label: {
        fonsize: 16,
        marginBottom: 5
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }
})
