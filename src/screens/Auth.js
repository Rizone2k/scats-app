import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header';

const { width, heigth } = Dimensions.get('window');

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
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
                            label="Tên Đăng Nhập"
                            placeholder="Nhập tên đăng nhập"
                        />
                        <TextInput
                            style={styles.formInput}
                            mode="outlined"
                            label="Mật Khẩu"
                            secureTextEntry
                            placeholder="Nhập mật khẩu"
                            right={<TextInput.Icon name="eye-outline" />}
                        />
                        <Button
                            style={styles.formBtn}
                            mode="contained"
                            uppercase={false}
                            onPress={() => console.log('Login')}
                        >
                            Đăng nhập
                        </Button>
                    </View>) :
                    (<View style={styles.form}>
                        <Title style={styles.formTitle}>Đăng ký</Title>
                        <TextInput
                            style={styles.formInput}
                            mode="outlined"
                            label="Tên Đăng Nhập"
                            placeholder="Nhập tên đăng nhập"
                        />
                        <TextInput
                            style={styles.formInput}
                            mode="outlined"
                            label="Mật Khẩu"
                            secureTextEntry
                            placeholder="Nhập mật khẩu"
                            right={<TextInput.Icon name="eye-outline" />}
                        />
                        <TextInput
                            style={styles.formInput}
                            mode="outlined"
                            label="Nhập Lại Mật Khẩu"
                            secureTextEntry
                            placeholder="Nhập lại mật khẩu"
                            right={<TextInput.Icon name="eye-outline" />}
                        />
                        <Button
                            style={styles.formBtn}
                            mode="contained"
                            uppercase={false}
                            onPress={() => console.log('Register')}
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
        textTransform: 'uppercase'
    },
    formInput: {
        width: "100%",
        marginVertical: 5
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
        marginLeft: 5
    }
});