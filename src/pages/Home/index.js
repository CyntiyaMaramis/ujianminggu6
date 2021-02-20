import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { FontAwesomeIcon } from '@fontawesome/react-native-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export default class Home extends Component {
    render() {
        return (
            <View style={styles.page}>
                <Text> textInComponent </Text>
                <View style={styles.wrapperButton}>
                    <TouchableOpacity style={styles.btnTambah} onPress={() => this.props.navigation.navigate('TambahData')}>
                        <FontAwesomeIcon icon={faPlus} size={20} color={'white'} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const stles = StyleSheet.create({
    page: {
        flex: 1
    },
    wrapperButton: {
        flex: 1,
        position: 'absolute',
        bottom: 0,
        right: 0,
        margin: 30
    },
    btnTambah: {
        padding: 20,
        backgroundColor: 'skyblue',
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
})