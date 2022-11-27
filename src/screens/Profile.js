import { useCallback, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    Image,
    TouchableOpacity,
    ToastAndroid,
} from 'react-native';
import {
    Button,
    Portal,
    Modal,
    Provider,
    RadioButton,
    TextInput
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useFocusEffect } from '@react-navigation/native';
import { updateInfor } from '../redux/reducers/auth';
import {
    isLoggedInSelector,
    curentUserSelector
} from '../redux/selectors';
import Header from '../components/Header';

const { width, height } = Dimensions.get("window");

const Profile = ({ navigation }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(isLoggedInSelector);
    const curentUser = useSelector(curentUserSelector);
    const [username, setUsername] = useState(curentUser.username || '');
    const [email, setEmail] = useState(curentUser.email || '');
    const [visibleUpdateInforModal, setVisibleUpdateInforModal] = useState(false);
    const [avatarSelect, setAvatarSelect] = useState(null);

    const handleUpdateInforClick = () => {
        if (username.length >= 6) {
            let data = {
                id: curentUser.id,
                username: username,
                email: email
            }
            if (avatarSelect) data = { ...data, avatar: avatarSelect }
            dispatch(updateInfor(data))
                .then(unwrapResult)
                .then((result) => {
                    setAvatarSelect(null);
                    ToastAndroid.show("Cập nhật thành công", ToastAndroid.SHORT);
                }).catch((err) => {
                    console.log(err);
                    // ToastAndroid.show(err, ToastAndroid.SHORT);
                });
        } else {
            ToastAndroid.show("Tên người dùng phải lớn hơn hoặc bằng 6 ký tự", ToastAndroid.SHORT);
        }
    }

    const openImagePicker = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [400, 400],
            quality: 1,
            base64: true
        });

        if (!result.canceled) {
            setAvatarSelect({
                uri: result.assets[0].uri,
                base64: result.assets[0].base64,
                type: result.assets[0].type,
            })
        } else {
            alert('You did not select any image.');
        }

    }

    useFocusEffect(
        useCallback(() => {
            if (isLoggedIn) {
                // navigation.navigate("AuthScreen");
            }
        }, [isLoggedIn])
    );

    return (
        <View style={styles.container}>
            {
                isLoggedIn ?
                    (
                        <Provider>
                            <Portal>
                                <Modal
                                    visible={visibleUpdateInforModal}
                                    onDismiss={() => setVisibleUpdateInforModal(false)}
                                    contentContainerStyle={styles.modal}
                                >
                                    <View>
                                        <Text
                                            style={
                                                {
                                                    color: "#fff",
                                                    fontFamily: 'MontserratBold',
                                                    textAlign: "center",
                                                    fontSize: 25,
                                                    marginBottom: 10
                                                }
                                            }
                                        >
                                            Chỉnh sửa thông tin
                                        </Text>
                                        <View
                                            style={{
                                                justifyContent: "center",
                                                alignItems: "center",
                                                marginVertical: 15
                                            }}
                                        >
                                            <View>
                                                <Image
                                                    style={{
                                                        width: width / 4,
                                                        height: width / 4,
                                                        resizeMode: "contain",
                                                        borderRadius: 100
                                                    }}
                                                    source={{ uri: avatarSelect ? avatarSelect.uri : curentUser.avatar }}
                                                />
                                                <TouchableOpacity
                                                    style={{
                                                        position: "absolute",
                                                        bottom: 0,
                                                        right: 0,
                                                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                                                        padding: 2
                                                    }}
                                                    onPress={openImagePicker}
                                                >
                                                    <Icon name="image" size={20} color="#0ff" />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <TextInput
                                            style={{ width: "100%", marginVertical: 10, fontFamily: 'Montserrat' }}
                                            mode="flat"
                                            label={<Text style={{ fontFamily: 'Montserrat' }}>Tên người dùng</Text>}
                                            onChangeText={(text) => {
                                                setUsername(text.trim().toLowerCase().replace(' ', ''));
                                            }}
                                            value={username}
                                        />
                                        <TextInput
                                            style={{ width: "100%", marginVertical: 10, fontFamily: 'Montserrat' }}
                                            mode="flat"
                                            label={<Text style={{ fontFamily: 'Montserrat' }}>Email</Text>}
                                            onChangeText={(text) => {
                                                setEmail(text.trim().toLowerCase().replace(' ', ''));
                                            }}
                                            value={email}
                                        />

                                        <View style={{ alignItems: "center", marginTop: 10 }}>
                                            <Button
                                                style={{ width: width / 3 }}
                                                mode="contained"
                                                uppercase={false}
                                                onPress={handleUpdateInforClick}>
                                                Cập nhật
                                            </Button>
                                        </View>
                                    </View>
                                </Modal>
                            </Portal>
                            <Header allowBack={false}></Header>
                            <ScrollView>
                                <View style={{ padding: 10 }}>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            flexWrap: "wrap",
                                            marginVertical: 10,
                                            alignItems: "center"
                                        }}
                                    >
                                        <View>
                                            <Image
                                                style={{
                                                    width: width * 0.2,
                                                    height: width * 0.2,
                                                    resizeMode: 'contain',
                                                    marginRight: 15,
                                                    borderRadius: 100
                                                }}
                                                source={{ uri: curentUser.avatar }}
                                            />
                                        </View>
                                        <View>
                                            <Text
                                                style={{
                                                    color: "#fff",
                                                    fontFamily: "Montserrat",
                                                    fontSize: 20
                                                }}
                                            >
                                                {curentUser.username}
                                            </Text>
                                            <Text
                                                style={{
                                                    color: "#fff",
                                                    fontFamily: "Montserrat",
                                                    fontSize: 12
                                                }}
                                            >
                                                Email: {curentUser.email}
                                            </Text>
                                        </View>
                                    </View>
                                    <View
                                        style={{ marginTop: 15 }}
                                    >
                                        <TouchableOpacity
                                            style={{
                                                flexDirection: "row",
                                                flexWrap: "wrap",
                                                backgroundColor: "gray",
                                                padding: 10,
                                                alignItems: "center",
                                                marginVertical: 5
                                            }}
                                            onPress={() => setVisibleUpdateInforModal(true)}
                                        >
                                            <Icon name="pencil-sharp" size={20} color="#fff" />
                                            <Text
                                                style={{
                                                    color: "#fff",
                                                    fontFamily: "Montserrat",
                                                    fontSize: 15,
                                                    marginLeft: 15
                                                }}
                                            >
                                                Chỉnh sửa thông tin
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{
                                                flexDirection: "row",
                                                flexWrap: "wrap",
                                                backgroundColor: "gray",
                                                padding: 10,
                                                alignItems: "center",
                                                marginVertical: 5
                                            }}
                                        >
                                            <Icon name="library-outline" size={20} color="#fff" />
                                            <Text
                                                style={{
                                                    color: "#fff",
                                                    fontFamily: "Montserrat",
                                                    fontSize: 15,
                                                    marginLeft: 15
                                                }}
                                            >
                                                Tủ phim của bạn
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{
                                                flexDirection: "row",
                                                flexWrap: "wrap",
                                                backgroundColor: "gray",
                                                padding: 10,
                                                alignItems: "center",
                                                marginVertical: 5
                                            }}
                                        >
                                            <Icon name="time-outline" size={20} color="#fff" />
                                            <Text
                                                style={{
                                                    color: "#fff",
                                                    fontFamily: "Montserrat",
                                                    fontSize: 15,
                                                    marginLeft: 15
                                                }}
                                            >
                                                Lịch sử xem
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{
                                                flexDirection: "row",
                                                flexWrap: "wrap",
                                                backgroundColor: "gray",
                                                padding: 10,
                                                alignItems: "center",
                                                marginVertical: 5
                                            }}
                                        >
                                            <Icon name="build-outline" size={20} color="#fff" />
                                            <Text
                                                style={{
                                                    color: "#fff",
                                                    fontFamily: "Montserrat",
                                                    fontSize: 15,
                                                    marginLeft: 15
                                                }}
                                            >
                                                Đổi mật khẩu
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{
                                                flexDirection: "row",
                                                flexWrap: "wrap",
                                                backgroundColor: "gray",
                                                padding: 10,
                                                alignItems: "center",
                                                marginVertical: 5
                                            }}
                                        >
                                            <Icon name="log-out-outline" size={20} color="#fff" />
                                            <Text
                                                style={{
                                                    color: "#fff",
                                                    fontFamily: "Montserrat",
                                                    fontSize: 15,
                                                    marginLeft: 15
                                                }}
                                            >
                                                Đăng xuất
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </ScrollView>
                        </Provider>
                    ) : ('')
            }
        </View>
    )
}

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5a5454',
    },
    modal: { backgroundColor: "#3d3d3d", padding: 10, marginHorizontal: 10 },
});