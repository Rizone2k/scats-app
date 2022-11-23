import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Alert,
    ToastAndroid
} from 'react-native';
import { StackActions, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { TextInput, Button, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header';
import register from '../api/register';
import { login } from '../redux/reducers/auth';


const { width, heigth } = Dimensions.get('window');

const Auth = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [isLogin, setIsLogin] = useState(true);

    const [usernameLogin, setUsernameLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');

    const [usernameRegister, setUsernameRegister] = useState('');
    const [passwordRegister, setPasswordRegister] = useState('');

    const [regUsernameValidate, setRegUsernameValidate] = useState(false);
    const [regPassValidate, setRegPassValidate] = useState(false);
    const [regRePassValidate, setRegRePassValidate] = useState(false);

    const validatePassword = (text) => {
        setPasswordRegister(text);
        if (text.length >= 6) {
            setRegPassValidate(true);
        } else {
            setRegPassValidate(false);
        }
    }
    const validateRePassword = (text) => {
        if (text.length >= 6 && text == passwordRegister) {
            setRegRePassValidate(true);
        } else {
            setRegRePassValidate(false);
        }
    }
    const validateUsername = (text) => {
        setUsernameRegister(text);
        if (text.length >= 6) {
            setRegUsernameValidate(true);
        } else {
            setRegUsernameValidate(false);
        }
    }

    const handleRegister = () => {
        if (regUsernameValidate && regPassValidate && regRePassValidate) {
            console.log("send request")
        }
    }

    const handleLogin = () => {
        if (usernameLogin.length != 0 && passwordLogin.length != 0) {
            dispatch(login({ username: usernameLogin, password: passwordLogin }))
                .then(unwrapResult)
                .then((result) => {
                    ToastAndroid.show("Đăng nhập thành công", ToastAndroid.SHORT);
                    navigation.dispatch(StackActions.popToTop());
                }).catch((err) => {
                    ToastAndroid.show(err, ToastAndroid.SHORT);
                    // Alert.alert(null, err);
                });
        } else {
            ToastAndroid.show("Vui lòng nhập đầy đủ thông tin", ToastAndroid.SHORT);
        }
    }

    return (
        <View style={styles.container}>
            <Header allowBack={true}></Header>
            {
                isLogin ?
                    (<View style={styles.form}>
                        <Title style={styles.formTitle}>Đăng nhập</Title>
                        <TextInput
                            style={styles.formInput}
                            mode="outlined"
                            label={<Text style={{ fontFamily: 'Montserrat' }}>Tên Đăng Nhập</Text>}
                            onChangeText={(text) => {
                                setUsernameLogin(text);
                            }}
                            placeholder="Nhập tên đăng nhập"
                        />
                        <TextInput
                            style={styles.formInput}
                            mode="outlined"
                            label={<Text style={{ fontFamily: 'Montserrat' }}>Mật Khẩu</Text>}
                            secureTextEntry
                            placeholder="Nhập mật khẩu"
                            onChangeText={(text) => {
                                setPasswordLogin(text);
                            }}
                            right={<TextInput.Icon name="eye-outline" />}
                        />
                        <Button
                            style={styles.formBtn}
                            labelStyle={{ fontFamily: 'Montserrat' }}
                            mode="contained"
                            uppercase={false}
                            onPress={handleLogin}
                        >
                            Đăng nhập
                        </Button>
                    </View>) :
                    (<View style={styles.form}>
                        <Title style={styles.formTitle}>Đăng ký</Title>
                        <TextInput
                            style={styles.formInput}
                            theme={{ colors: { primary: regUsernameValidate ? 'green' : 'red' } }}
                            mode="outlined"
                            error={!regUsernameValidate}
                            outlineColor={regUsernameValidate ? 'green' : ''}
                            activeOutlineColor={regUsernameValidate ? 'green' : ''}
                            label={<Text style={{ fontFamily: 'Montserrat' }}>Tên Đăng Nhập</Text>}
                            onChangeText={(text) => {
                                validateUsername(text);
                            }}
                            placeholder="Nhập tên đăng nhập"
                        />
                        <TextInput
                            style={styles.formInput}
                            theme={{ colors: { primary: regPassValidate ? 'green' : 'red' } }}
                            mode="outlined"
                            error={!regPassValidate}
                            outlineColor={regPassValidate ? 'green' : ''}
                            activeOutlineColor={regPassValidate ? 'green' : ''}
                            label={<Text style={{ fontFamily: 'Montserrat' }}>Mật Khẩu</Text>}
                            secureTextEntry
                            onChangeText={(text) => {
                                validatePassword(text);
                            }}
                            placeholder="Mật khẩu"
                            right={<TextInput.Icon name="eye-outline" />}
                        />
                        <TextInput
                            style={styles.formInput}
                            theme={{ colors: { primary: regRePassValidate ? 'green' : 'red' } }}
                            error={!regRePassValidate}
                            outlineColor={regRePassValidate ? 'green' : ''}
                            activeOutlineColor={regRePassValidate ? 'green' : ''}
                            mode="outlined"
                            label={<Text style={{ fontFamily: 'Montserrat' }}>Nhập Lại Mật Khẩu</Text>}
                            secureTextEntry
                            onChangeText={(text) => {
                                validateRePassword(text);
                            }}
                            placeholder="Nhập lại mật khẩu"
                            right={<TextInput.Icon name="eye-outline" onPress={() => { console.log("123") }} />}
                        />
                        <Button
                            style={styles.formBtn}
                            labelStyle={{ fontFamily: 'Montserrat' }}
                            mode="contained"
                            uppercase={false}
                            onPress={handleRegister}
                        >
                            Đăng ký
                        </Button>
                    </View>)
            }
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <View style={styles.changeScreen}>
                    <TouchableOpacity
                        onPress={() => setIsLogin(true)}
                        style={[styles.touchStyle, styles.touchLeft, isLogin ? styles.touchActive : ""]}>
                        <Icon
                            name="log-in-outline" size={17} color="#000"
                        />
                        <Text style={styles.touchText}>
                            Đăng nhập
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setIsLogin(false)}
                        style={[styles.touchStyle, styles.touchRigth, isLogin ? "" : styles.touchActive]}>
                        <Icon
                            name="person-add-outline" size={17} color="#000"
                        />
                        <Text style={styles.touchText}>
                            Đăng ký
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    )
}

export default Auth;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    form: {
        height: "80%",
        paddingHorizontal: 25,
        paddingTop: 30,
        alignItems: "center",
    },
    formTitle: {
        fontSize: 35,
        lineHeight: 45,
        textTransform: 'uppercase',
        fontFamily: 'MontserratBold'
    },
    formInput: {
        width: "100%",
        marginVertical: 5,
        fontFamily: 'Montserrat'
    },
    formBtn: {
        marginTop: 10
    },
    changeScreen: {
        flexDirection: "row",
        width: "80%",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 100
    },
    touchStyle: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    touchLeft: {
        borderRightWidth: 1,
        borderBottomLeftRadius: 100,
        borderTopLeftRadius: 100
    },
    touchRigth: {
        borderBottomRightRadius: 100,
        borderTopRightRadius: 100
    },
    touchActive: {
        backgroundColor: "#0ff",
    },
    touchText: {
        fontSize: 15,
        marginLeft: 5,
        fontFamily: 'Montserrat'
    }
});