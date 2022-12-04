import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
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
    const [rePasswordRegister, setRePasswordRegister] = useState('');

    const [regUsernameValidate, setRegUsernameValidate] = useState(false);
    const [regPassValidate, setRegPassValidate] = useState(false);
    const [regRePassValidate, setRegRePassValidate] = useState(false);

    const [showTextPassRegis, setShowTextPassRegis] = useState(false);
    const [showTextRePassRegis, setShowTextRePassRegis] = useState(false);
    const [showTextPass, setShowTextPass] = useState(false);

    const validatePassword = (text) => {
        const t = text.trim().replace(' ', '')
        setPasswordRegister(t);
        if (t.length >= 6 && t == rePasswordRegister) {
            setRegPassValidate(true);
        } else {
            setRegPassValidate(false);
        }
    }
    const validateRePassword = (text) => {
        const t = text.trim().replace(' ', '')
        setRePasswordRegister(t);
        if (t.length >= 6 && t == passwordRegister) {
            setRegRePassValidate(true);
        } else {
            setRegRePassValidate(false);
        }
    }
    const validateUsername = (text) => {
        const t = text.trim().toLowerCase().replace(' ', '')
        setUsernameRegister(t);
        if (t.length >= 6) {
            setRegUsernameValidate(true);
        } else {
            setRegUsernameValidate(false);
        }
    }

    const handleRegister = async () => {
        if (regUsernameValidate && regPassValidate && regRePassValidate) {
            const rs = await register(usernameRegister, passwordRegister);
            if (rs.status == "success") {
                setUsernameRegister('');
                setPasswordRegister('');
                ToastAndroid.show("Đăng ký thành công", ToastAndroid.SHORT);
                setIsLogin(true);
            } else {
                ToastAndroid.show(rs.message, ToastAndroid.SHORT);
            }
        } else {
            ToastAndroid.show("Lỗi", ToastAndroid.SHORT);
        }
    }

    const handleLogin = () => {
        if (usernameLogin.length != 0 && passwordLogin.length != 0) {
            dispatch(login({ username: usernameLogin, password: passwordLogin }))
                .then(unwrapResult)
                .then((result) => {
                    setUsernameLogin('');
                    setPasswordLogin('');
                    ToastAndroid.show("Đăng nhập thành công", ToastAndroid.SHORT);
                    navigation.dispatch(StackActions.popToTop());
                }).catch((err) => {
                    ToastAndroid.show(err, ToastAndroid.SHORT);
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
                            mode="flat"
                            label={<Text style={{ fontFamily: 'Montserrat' }}>Tên Đăng Nhập</Text>}
                            onChangeText={(text) => {
                                setUsernameLogin(text.trim().toLowerCase().replace(' ', ''));
                            }}
                            value={usernameLogin}
                            placeholder="Nhập tên đăng nhập"
                        />
                        <TextInput
                            style={styles.formInput}
                            mode="flat"
                            label={<Text style={{ fontFamily: 'Montserrat' }}>Mật Khẩu</Text>}
                            secureTextEntry={!showTextPass}
                            placeholder="Nhập mật khẩu"
                            onChangeText={(text) => {
                                setPasswordLogin(text.trim().replace(' ', ''));
                            }}
                            value={passwordLogin}
                            right={
                                <TextInput.Icon onPress={() => setShowTextPass(!showTextPass)} name="eye-outline" />
                            }
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
                            mode="flat"
                            error={!regUsernameValidate}
                            outlineColor={regUsernameValidate ? 'green' : ''}
                            activeOutlineColor={regUsernameValidate ? 'green' : ''}
                            label={<Text style={{ fontFamily: 'Montserrat' }}>Tên Đăng Nhập</Text>}
                            value={usernameRegister}
                            onChangeText={(text) => {
                                setUsernameRegister(text.trim().toLowerCase().replace(' ', ''));
                                validateUsername(text);
                            }}
                            placeholder="Nhập tên đăng nhập"
                        />
                        <TextInput
                            style={styles.formInput}
                            theme={{ colors: { primary: regPassValidate ? 'green' : 'red' } }}
                            mode="flat"
                            error={!regPassValidate}
                            outlineColor={regPassValidate ? 'green' : ''}
                            activeOutlineColor={regPassValidate ? 'green' : ''}
                            label={<Text style={{ fontFamily: 'Montserrat' }}>Mật Khẩu</Text>}
                            secureTextEntry={!showTextPassRegis}
                            onChangeText={(text) => {
                                validatePassword(text);
                            }}
                            value={passwordRegister}
                            placeholder="Mật khẩu"
                            right={
                                <TextInput.Icon onPress={() => setShowTextPassRegis(!showTextPassRegis)} name="eye-outline" />
                            }
                        />
                        <TextInput
                            style={styles.formInput}
                            theme={{ colors: { primary: regRePassValidate ? 'green' : 'red' } }}
                            error={!regRePassValidate}
                            outlineColor={regRePassValidate ? 'green' : ''}
                            activeOutlineColor={regRePassValidate ? 'green' : ''}
                            mode="flat"
                            label={<Text style={{ fontFamily: 'Montserrat' }}>Nhập Lại Mật Khẩu</Text>}
                            secureTextEntry={!showTextRePassRegis}
                            onChangeText={(text) => {
                                validateRePassword(text);
                            }}
                            placeholder="Nhập lại mật khẩu"
                            value={rePasswordRegister}
                            right={
                                <TextInput.Icon onPress={() => setShowTextRePassRegis(!showTextRePassRegis)} name="eye-outline" />
                            }
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
                            name="log-in-outline" size={17} color="#fff"
                        />
                        <Text style={styles.touchText}>
                            Đăng nhập
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setIsLogin(false)}
                        style={[styles.touchStyle, styles.touchRigth, isLogin ? "" : styles.touchActive]}>
                        <Icon
                            name="person-add-outline" size={17} color="#fff"
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
        backgroundColor: '#5a5454',
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
        fontFamily: 'MontserratBold',
        color: 'white',
        marginBottom: 20
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
        borderRadius: 100,
        borderColor: "#fff"
    },
    touchStyle: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        paddingHorizontal: 10,
        paddingVertical: 8,
        alignItems: "center",
    },
    touchLeft: {
        borderRightWidth: 1,
        borderBottomLeftRadius: 100,
        borderTopLeftRadius: 100,
        borderColor: "#fff"
    },
    touchRigth: {
        borderBottomRightRadius: 100,
        borderTopRightRadius: 100,
    },
    touchActive: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    touchText: {
        fontSize: 15,
        marginLeft: 5,
        fontFamily: 'Montserrat',
        color: "#fff"
    }
});