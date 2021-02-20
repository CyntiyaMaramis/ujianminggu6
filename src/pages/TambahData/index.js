import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { InputData } from '../../component'

export default class TambahData extends Component {
    constructor(props) {
        super(props)

        this.state= {
            nama: '',
            no: '',
            gender: '',
            umur: '',
            status: '',
        }
    }

    onChangeText =(namaState, value) => {
        this.setState({
            [namaState]: value
        })
    }

    onSubmit = () => {
        console.log("Masuk Submit");
        console.log(this.state);
    }
    render() {
        return (
            <View style={styles.pages}>
                <InputData label="Nama" placeholder="Masukkan Nama" onChangeText={this.onChangeText} value={this.state.nama} namaState="nama"/>
                <InputData label="No.Hp" placeholder="Masukkan No.Hp" onChangeText={this.onChangeText} value={this.state.no} namaState="no" keyboardType="number-pad"/>
                <InputData label="Gender" placeholder="Masukkan Gender" onChangeText={this.onChangeText} value={this.state.gender} namaState="gender"/>
                <InputData label="Umur" placeholder="Masukkan Umur" onChangeText={this.onChangeText} value={this.state.umur} namaState="umur"/>
                <InputData label="Status" placeholder="Masukkan Status" onChangeText={this.onChangeText} value={this.state.status} namaState="status"/>
                <TouchableOpacity style={styles.tombol} onPress={() => this.onSubmit()}>
                    <Text style={styles.textTombol}>SUBMIT</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    pages: {
        flex: 1,
        padding: 30
    },
    tombol: {
        backgroundColor: 'black',
        padding: 10,
        borderRadius:5,
        marginTop: 10
    },
    textTombol: {
        color: 'white',
        fontWeight: 'bold',
        textAlign:'center',
        fontSize: 16,
    }
})
