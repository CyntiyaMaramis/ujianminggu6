import React, { useState, useEffect } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export default function RegistrationScreen({ navigation }) {
    const [nama, setName] = useState('');
    const [gender, setGender] = useState('');
    const [umur, setUmur] = useState('');
    const [status, setStatus] = useState(0);
    const [ImageUri, setImageUri] = useState();
    const [fileExtension, setExtension] = useState();
    const uniqId = uuid.v4();
    const id = uniqId.toUpperCase();
    const fileName = `${id}.${fileExtension}`;
    console.log(fileName);


    // Mengirim Data Ke FireBase
    const form = () => {
        const currentDate = new Date();
        const tanggal = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()} ${('0' + currentDate.getHours()).slice(-2)}:${('0' + currentDate.getMinutes()).slice(-2)}:${('0' + currentDate.getSeconds()).slice(-2)}`;
        console.log(tanggal);
        if (ImageUri) {

            // Upload File Ke firebase storage
            const storageRef = storage().ref(`images/${fileName}`);
            storageRef.putFile(`${ImageUri}`)
                .on(
                    storage.TaskEvent.STATE_CHANGED,
                    snapshot => {
                        console.log('snapshot: ' + snapshot.state);
                        console.log('progress: ' + (snapshot.bytesTransferred / snapshot.totalBytes) * 100);

                        if (snapshot.state === storage.TaskState.SUCCESS) {
                            console.log('Success');
                        }
                    },
                    error => {
                        console.log('image upload error: ' + error.toString());
                    },
                    () => {
                        // Untuk mendapatkan url dari file yang kita upload
                        storageRef.getDownloadURL()
                            .then((downloadUrl) => {
                                console.log('File available at: ' + downloadUrl);

                                const data = {
                                    nama,
                                    gender,
                                    umur,
                                    status,
                                    image: downloadUrl,
                                    waktu: tanggal,
                                };
                                // Menyimpan semua data di firestore
                                firestore().collection('laporan')
                                    .doc(id)
                                    .set(data)
                                    .then(() => {
                                        setName('');
                                        setGender('');
                                        setUmur('');
                                        setStatus();
                                        setImageUri();
                                    })
                                    .catch((error) => {
                                        alert(error);
                                    });
                            });
                    }
                );
        }
    };

    // Untuk Ambil Gambar melalui Kamera
    const captureImage = (type) => {
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
            videoQuality: 'low',
            durationLimit: 30, //Video max duration in seconds
            saveToPhotos: true,
        };
        launchCamera(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                alert('User cancelled camera picker');
                return;
            } else if (response.errorCode === 'camera_unavailable') {
                alert('Camera not available on device');
                return;
            } else if (response.errorCode === 'permission') {
                alert('Permission not satisfied');
                return;
            } else if (response.errorCode === 'others') {
                alert(response.errorMessage);
                return;
            }
            console.log('base64 -> ', response.base64);
            console.log('uri -> ', response.uri);
            console.log('width -> ', response.width);
            console.log('height -> ', response.height);
            console.log('fileSize -> ', response.fileSize);
            console.log('type -> ', response.type);
            console.log('fileName -> ', response.fileName);
            setImageUri(response.uri);
            setExtension(response.uri.split('.').pop());
        });
    };

    // Untuk Ambil Gambar Dari File di HP
    const chooseFile = (type) => {
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
        };
        launchImageLibrary(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                alert('User cancelled camera picker');
                return;
            } else if (response.errorCode === 'camera_unavailable') {
                alert('Camera not available on device');
                return;
            } else if (response.errorCode === 'permission') {
                alert('Permission not satisfied');
                return;
            } else if (response.errorCode === 'others') {
                alert(response.errorMessage);
                return;
            }
            console.log('base64 -> ', response.base64);
            console.log('uri -> ', response.uri);
            console.log('width -> ', response.width);
            console.log('height -> ', response.height);
            console.log('fileSize -> ', response.fileSize);
            console.log('type -> ', response.type);
            console.log('fileName -> ', response.fileName);
            setImageUri(response.uri);
            setExtension(response.uri.split('.').pop());
        });
    };

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView/>
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always"
                <Text style={{ marginVertical: 5, marginHorizontal: 30, fontSize: 15 }}>
                    Nama Lengkap
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nama Lengkap"
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setName(text)}
                    value={nama}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <Text style={{ marginVertical: 15, marginHorizontal: 30, fontSize: 30, textAlign: 'center', fontWeight: 'bold' }}>
                    Gender
                </Text>

                <Text style={{ marginVertical: 10, marginHorizontal: 30, fontSize: 15 }}>
                    Pilih Jenis Kelamin
                </Text>
                <View style={styles.container}>
                    <Picker
                        selectedValue={gender}
                        style={{ width: '85%', backgroundColor: 'white', marginBottom: 10 }}
                        onValueChange={(itemValue) => setGender(itemValue)}
                    >
                        <Picker.Item label="Pilih Jenis Kelamin" />
                        <Picker.Item label="Laki-Laki" value="Laki-Laki" />
                        <Picker.Item label="Perempuan" value="Perempuan" />
                    </Picker>
                </View>

                <Text style={{ marginVertical: 5, marginHorizontal: 30, fontSize: 15 }}>
                    Umur
                    </Text>
                <View style={styles.container}>
                    <TextInput
                        style={[styles.input, { width: '85%' }]}
                        placeholder="Umur"
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setUmur(text)}
                        value={umur}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <Text style={{ marginVertical: 10, marginHorizontal: 30, fontSize: 15 }}>
                        Status
                </Text>
                    <View style={styles.container}>
                        <Picker
                            selectedValue={status}
                            style={{ width: '85%', backgroundColor: 'white', marginBottom: 10 }}
                            onValueChange={(itemValue) => setStatus(itemValue)}
                        >
                            <Picker.Item label="Pilih Status" />
                            <Picker.Item label="Lajang" value="Lajang" />
                            <Picker.Item label="Menikah" value="Menikah" />
                        </Picker>
                    </View>

                    <View style={styles.container}>
                        <View style={{ borderWidth: 2, borderColor: 'black' }}>
                            <Image
                                source={{ uri: ImageUri }}
                                style={styles.imageStyle}
                            />
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.buttonStyle}
                            onPress={() => captureImage('photo')}>
                            <Text style={styles.textStyle}>
                                Launch Camera for Image
                        </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.buttonStyle}
                            onPress={() => chooseFile('photo')}>
                            <Text style={styles.textStyle}>Choose Image</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => submit()}>
                        <Text style={styles.buttonTitle}>Submit</Text>
                    </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>
    );
}
