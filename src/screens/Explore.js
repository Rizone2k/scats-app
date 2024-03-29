import React, { useCallback, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ToastAndroid,
    TouchableOpacity,
    FlatList,
    RefreshControl
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
    currentUserSelector
} from '../redux/selectors';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import createRoom from '../api/createRoom';
import getMyRoom from '../api/getMyRoom';
import getRoomLive from '../api/getRoomLive';
import sendRoomPass from '../api/sendRoomPass';


const { width, height } = Dimensions.get("window");

const Explore = () => {
    const navigation = useNavigation();
    const isLoggedIn = useSelector(isLoggedInSelector);
    const currentUser = useSelector(currentUserSelector);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        callApiGetRoomLive();
        setRefreshing(false);
    }, []);

    const [myRoom, setMyRoom] = useState({});
    const [roomsLive, setRoomsLive] = useState([]);

    const [visibleCreateRoomModal, setVisibleCreateRoomModal] = useState(false);
    const [enterPassModal, setEnterPassModal] = useState(false);
    const [roomName, setRoomName] = useState(`Phòng của ${currentUser.username || ''}`);
    const [roomIsPrivate, setRoomIsPrivate] = useState(false);
    const [roomPass, setRoomPass] = useState('');
    const [passEnter, setPassEnter] = useState('');
    const [roomSelect, setroomSelect] = useState(null);

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
            console.log(error)
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
            console.log(error)
            ToastAndroid.show("Lỗi", ToastAndroid.SHORT);
        }
    }

    const handleJoinRoomClick = (id, isPrivate) => {
        if (isPrivate == true) {
            setroomSelect(id);
            setEnterPassModal(true);
        } else {
            navigation.navigate("LiveScreen", { id });
        }
    }

    const handleSendPassToJoin = async () => {
        try {
            const rs = await sendRoomPass({ id: roomSelect, pass: passEnter });
            if (rs.status == "success") {
                setEnterPassModal(false);
                setPassEnter('');
                navigation.navigate("LiveScreen", { id: roomSelect });
            } else {
                ToastAndroid.show(rs.message, ToastAndroid.SHORT);
            }
        } catch (error) {
            console.log(error);
            ToastAndroid.show("Lỗi", ToastAndroid.SHORT);
        }
    }

    useFocusEffect(
        useCallback(() => {
            if (isLoggedIn) {
                callApiGetMyRoom();
                callApiGetRoomLive();
            }
        }, [isLoggedIn])
    );

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
                                            roomIsPrivate &&
                                            <TextInput
                                                style={{ width: "100%", marginVertical: 5, fontFamily: 'Montserrat' }}
                                                mode="flat"
                                                label={<Text style={{ fontFamily: 'Montserrat' }}>Mật khẩu</Text>}
                                                value={roomPass}
                                                onChangeText={(text) => {
                                                    setRoomPass(text)
                                                }}
                                            />
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
                                <Modal
                                    visible={enterPassModal}
                                    onDismiss={() => setEnterPassModal(false)}
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
                                            Nhập mật khẩu
                                        </Text>
                                        <TextInput
                                            style={{ width: "100%", marginVertical: 5, fontFamily: 'Montserrat' }}
                                            mode="flat"
                                            secureTextEntry
                                            label={<Text style={{ fontFamily: 'Montserrat' }}>Mật khẩu phòng</Text>}
                                            onChangeText={(text) => {
                                                setPassEnter(text.trim().replace(' ', ''))
                                            }}
                                            value={passEnter}
                                        />

                                        <View style={{ alignItems: "center", marginTop: 10 }}>
                                            <Button
                                                style={{ width: width / 3 }}
                                                icon={({ size, color }) => (
                                                    <Icon name="add-outline" size={size} color="#fff" />
                                                )}
                                                mode="contained"
                                                uppercase={false}
                                                onPress={handleSendPassToJoin}>
                                                Vào phòng
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

                            <View style={[styles.blockWrap, { flex: 1 }]}>
                                <View style={styles.blockHeaderWrap}>
                                    <Text style={
                                        styles.blockHeader
                                    }
                                    >
                                        Đang LIVE
                                    </Text>
                                    <Text></Text>
                                </View>
                                <View style={{ marginTop: 5, padding: 5, flex: 1, }}>
                                    <FlatList
                                        style={{ flex: 1 }}
                                        nestedScrollEnabled
                                        horizontal={false}
                                        numColumns={2}
                                        data={roomsLive}
                                        renderItem={({ item }) =>
                                            <TouchableOpacity
                                                style={{
                                                    width: (width / 2) - 25,
                                                    paddingLeft: 10,
                                                    paddingVertical: 15,
                                                    paddingRight: 20,
                                                    borderWidth: 1,
                                                    borderColor: "gray",
                                                    borderRadius: 10,
                                                    margin: 5
                                                }}
                                                onPress={() => handleJoinRoomClick(item.id, item.private)}
                                            >
                                                <Text
                                                    style={{ color: "#fff", fontFamily: "Montserrat", }}
                                                    numberOfLines={2}
                                                >
                                                    {item.name}
                                                </Text>
                                                <Text
                                                    style={[
                                                        {
                                                            position: "absolute",
                                                            top: 5,
                                                            right: 5,
                                                            fontFamily: "MontserratBold",
                                                            color: "#fff",
                                                            fontSize: 10,
                                                            padding: 3,
                                                            borderRadius: 5
                                                        },
                                                        item.private ?
                                                            { backgroundColor: "red", } :
                                                            { backgroundColor: "green", }
                                                    ]}
                                                >
                                                    {item.private ? "private" : "public"}
                                                </Text>
                                            </TouchableOpacity>
                                        }
                                        keyExtractor={item => item.id}
                                        refreshControl={
                                            <RefreshControl
                                                refreshing={refreshing}
                                                onRefresh={onRefresh}
                                            />
                                        }
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
        paddingBottom: 15
    },
    modal: { backgroundColor: 'gray', padding: 10, marginHorizontal: 10 },
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