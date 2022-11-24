import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ToastAndroid,
    TouchableOpacity,
    FlatList
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
import { useDispatch, useSelector } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import {
    isLoggedInSelector,
    curentUserSelector
} from '../redux/selectors';
import { useNavigation } from '@react-navigation/native';
import createRoom from '../api/createRoom';
import getMyRoom from '../api/getMyRoom';
import getRoomLive from '../api/getRoomLive';

const { width, height } = Dimensions.get("window");

const Explore = () => {
    const navigation = useNavigation();
    const isLoggedIn = useSelector(isLoggedInSelector);
    const curentUser = useSelector(curentUserSelector);

    const [myRoom, setMyRoom] = useState({});
    const [roomsLive, setRoomsLive] = useState([]);

    const [visibleCreateRoomModal, setVisibleCreateRoomModal] = useState(false);
    const [roomName, setRoomName] = useState(`Phòng của ${curentUser.username || ''}`);
    const [roomIsPrivate, setRoomIsPrivate] = useState(false);
    const [roomPass, setRoomPass] = useState('');

    const handleCreateRoomClick = async () => {
        try {
            if (roomName.length > 0) {
                const idUser = await SecureStore.getItemAsync('uid');
                let data = {
                    idUser,
                    name: roomName
                }
                if (roomIsPrivate) {
                    if (roomPass.length <= 0) return ToastAndroid.show("Vui lòng nhập mật khẩu phòng", ToastAndroid.SHORT);
                    data = { ...data, pass: roomPass };
                }
                const rs = await createRoom(data);
                if (rs.status == "success") {
                    ToastAndroid.show("Tạo thành công", ToastAndroid.SHORT);
                    setMyRoom(rs.data);
                    setVisibleCreateRoomModal(false);
                } else {
                    ToastAndroid.show(rs.message, ToastAndroid.SHORT);
                }
            } else {
                ToastAndroid.show("Vui lòng nhập tên phòng", ToastAndroid.SHORT);
            }
        } catch (error) {
            ToastAndroid.show("Lỗi", ToastAndroid.SHORT);
        }

    }

    const callApiGetMyRoom = async () => {
        try {
            const idUser = await SecureStore.getItemAsync('uid');
            const rs = await getMyRoom({ idUser });
            if (rs.status == "success") {
                setMyRoom(rs.data);
            } else {
                ToastAndroid.show(rs.message, ToastAndroid.SHORT);
            }
        } catch (error) {
            ToastAndroid.show("Lỗi", ToastAndroid.SHORT);
        }
    }

    const callApiGetRoomLive = async () => {
        try {
            const rs = await getRoomLive();
            if (rs.status == "success") {
                setRoomsLive(rs.data);
            } else {
                ToastAndroid.show(rs.message, ToastAndroid.SHORT);
            }
        } catch (error) {
            ToastAndroid.show("Lỗi", ToastAndroid.SHORT);
        }
    }

    useEffect(() => {
        console.log("Explore screen Mount");
        callApiGetMyRoom();
        callApiGetRoomLive();
        return () => {
            console.log("Explore screen Unmount");
        }
    }, []);

    return (
        <View style={styles.container}>
            {
                isLoggedIn ?
                    (
                        <Provider>
                            <Text
                                style={
                                    {
                                        color: "#fff",
                                        fontFamily: "MontserratBold",
                                        fontSize: 30,
                                        textAlign: "center",
                                        marginTop: 10
                                    }
                                }
                            >
                                LIVE ROOM
                            </Text>
                            <Portal>
                                <Modal
                                    visible={visibleCreateRoomModal}
                                    onDismiss={() => setVisibleCreateRoomModal(false)}
                                    contentContainerStyle={styles.containerStyle}
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
                                            Tạo phòng
                                        </Text>
                                        <TextInput
                                            style={{ width: "100%", marginVertical: 5, fontFamily: 'Montserrat' }}
                                            mode="flat"
                                            label={<Text style={{ fontFamily: 'Montserrat' }}>Tên phòng</Text>}
                                            onChangeText={(text) => {
                                                setRoomName(text)
                                            }}
                                            value={roomName}
                                        />

                                        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                                            <RadioButton.Item
                                                style={{ width: (width / 2) - 40 }}
                                                labelStyle={{ color: "#fff", fontSize: 14, fontFamily: 'Montserrat' }}
                                                label="Công khai"
                                                status={!roomIsPrivate ? 'checked' : 'unchecked'}
                                                onPress={() => setRoomIsPrivate(false)}
                                            />
                                            <RadioButton.Item
                                                label="Riêng tư"
                                                labelStyle={{ color: "#fff", fontSize: 14, fontFamily: 'Montserrat' }}
                                                style={{ width: (width / 2) - 40 }}
                                                status={roomIsPrivate ? 'checked' : 'unchecked'}
                                                onPress={() => setRoomIsPrivate(true)}
                                            />
                                        </View>

                                        {
                                            roomIsPrivate ?
                                                (
                                                    <TextInput
                                                        style={{ width: "100%", marginVertical: 5, fontFamily: 'Montserrat' }}
                                                        mode="flat"
                                                        label={<Text style={{ fontFamily: 'Montserrat' }}>Mật khẩu</Text>}
                                                        value={roomPass}
                                                        onChangeText={(text) => {
                                                            setRoomPass(text)
                                                        }}
                                                    />
                                                ) : ('')
                                        }

                                        <View style={{ alignItems: "center", marginTop: 10 }}>
                                            <Button
                                                style={{ width: width / 3 }}
                                                icon={({ size, color }) => (
                                                    <Icon name="add-outline" size={size} color="#fff" />
                                                )}
                                                mode="contained"
                                                uppercase={false}
                                                onPress={handleCreateRoomClick}>
                                                Tạo phòng
                                            </Button>
                                        </View>
                                    </View>
                                </Modal>
                            </Portal>
                            <View style={styles.blockWrap}>
                                <View style={styles.blockHeaderWrap}>
                                    <Text style={
                                        styles.blockHeader
                                    }
                                    >
                                        Phòng của bạn
                                    </Text>
                                    <Text></Text>
                                </View>
                                <View style={{ marginTop: 5, padding: 5 }}>
                                    {
                                        myRoom ?
                                            (
                                                <TouchableOpacity
                                                    style={{
                                                        paddingHorizontal: 10,
                                                        paddingVertical: 15,
                                                        borderWidth: 1,
                                                        borderColor: "gray",
                                                        borderRadius: 10
                                                    }}
                                                    onPress={() => {
                                                        navigation.navigate("LiveScreen", { id: myRoom.id });
                                                    }}
                                                >
                                                    <Text
                                                        style={{ color: "#fff", fontFamily: "Montserrat", }}
                                                    >
                                                        {myRoom.name}
                                                    </Text>
                                                </TouchableOpacity>
                                            ) :
                                            (
                                                <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
                                                    <Text
                                                        style={{
                                                            color: "#fff",
                                                            fontFamily: "Montserrat",
                                                            marginRight: 10,
                                                        }}
                                                    >
                                                        Bạn chưa có phòng
                                                    </Text>
                                                    <Button
                                                        mode="contained"
                                                        onPress={() => setVisibleCreateRoomModal(true)}
                                                    >
                                                        <Icon name="add-outline" size={16} color="#fff" />
                                                    </Button>
                                                </View>
                                            )
                                    }
                                </View>
                            </View>

                            <View style={styles.blockWrap}>
                                <View style={styles.blockHeaderWrap}>
                                    <Text style={
                                        styles.blockHeader
                                    }
                                    >
                                        Đang LIVE
                                    </Text>
                                    <Text></Text>
                                </View>
                                <View style={{ marginTop: 5, padding: 5 }}>
                                    <FlatList
                                        nestedScrollEnabled
                                        horizontal={false}
                                        numColumns={2}
                                        data={roomsLive}
                                        renderItem={({ item }) =>
                                            <TouchableOpacity
                                                style={{
                                                    width: (width / 2) - 25,
                                                    paddingHorizontal: 10,
                                                    paddingVertical: 15,
                                                    borderWidth: 1,
                                                    borderColor: "gray",
                                                    borderRadius: 10,
                                                    margin: 5
                                                }}
                                                onPress={() => {
                                                    navigation.navigate("LiveScreen", { id: item.id });
                                                }}
                                            >
                                                <Text
                                                    style={{ color: "#fff", fontFamily: "Montserrat", }}
                                                    numberOfLines={2}
                                                >
                                                    {item.name}
                                                </Text>
                                            </TouchableOpacity>

                                        }
                                        keyExtractor={item => item.id}
                                    />
                                </View>
                            </View>
                        </Provider>
                    ) :
                    (
                        <View>
                            <Text>
                                Chưa login
                            </Text>
                        </View>
                    )
            }
        </View>
    )
}

export default Explore;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5a5454',
    },
    containerStyle: { backgroundColor: 'gray', padding: 10, marginHorizontal: 10 },
    scrollView: {
    },
    blockWrap: { paddingHorizontal: 10, marginTop: 10, },
    blockHeaderWrap: { borderColor: "gray", borderBottomWidth: 2, flexDirection: 'row', },
    blockHeader: {
        color: "#fff",
        fontSize: 18,
        flexShrink: 1,
        backgroundColor: "#5a5454",
        position: "absolute",
        top: 0,
        paddingRight: 3,
        fontFamily: 'MontserratBold'
    },
});