import { useEffect, useState, useRef, useCallback } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Alert,
    TouchableOpacity,
    ToastAndroid,
    FlatList,
    ScrollView,
    Image,
} from 'react-native';
import {
    Searchbar,
    Button,
    Portal,
    Modal,
    Provider,
    TextInput
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import * as SecureStore from 'expo-secure-store';
import { useSelector } from 'react-redux';
import { curentUserSelector } from '../redux/selectors';
import { debounce } from "lodash";
import { Video, AVPlaybackStatus } from 'expo-av';
import { io } from "socket.io-client";
import Header from '../components/Header';
import searchMovieLive from '../api/searchMovieLive';

const { width, height } = Dimensions.get("window");
let uid, currentPosition;

const Live = ({ route, navigation }) => {
    const { id } = route.params;
    const curentUser = useSelector(curentUserSelector);
    const player = useRef();
    const [arrMovie, setArrMovie] = useState([]);
    const [currentVideo, setCurrentVideo] = useState(null);
    const [position, setPosition] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');

    const [tabSelect, setTabSelect] = useState(1);
    const [visibleSearchModal, setVisibleSearchModal] = useState(false);
    const [socket, setSocket] = useState(io('http://192.168.1.6:5550/'));

    const [playlist, setPlaylist] = useState([]);
    const [viewers, setViewers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState('');


    const changeSearchDebouncer = useCallback(
        debounce((query) => {
            if (query.trim().length >= 3) callApiSearchMovieLive(query);
        }, 1000),
        []
    );

    const callApiSearchMovieLive = async (key) => {
        try {
            const rs = await searchMovieLive(key);
            if (rs.status == "success") {
                if (rs.data != null) {
                    setArrMovie(rs.data);
                }
            } else {
                Alert.alert(null, rs.message);
            }
        } catch (error) {
            Alert.alert(null, "Error !!!");
        }
    }

    const onChangeSearch = (query) => {
        setSearchQuery(query)
        changeSearchDebouncer(query);
    }

    const joinRoom = async () => {
        uid = await SecureStore.getItemAsync('uid');
        socket.emit('join-room', id, uid);
    }

    const handleChangeVideo = (video) => {
        socket.emit('change-video', video);
    }

    const handleSendMess = () => {
        if (messageText.length > 0) {
            socket.emit('send-message', messageText);
            setMessageText('');
        } else {
            ToastAndroid.show("Bạn chưa nhập tin nhắn", ToastAndroid.SHORT);
        }
    }

    const handleAddPlaylist = (item) => {
        const video = {
            id: item.id,
            episode: item.episode,
            hls: item.hls,
            movie: item.Movie.name
        }

        socket.emit("add-playlist", video);
    }

    const handleDeleteVideoInPlaylist = (video) => {
        socket.emit("delete-playlist", video);
    }

    const setPositionMillis = (e) => {
        currentPosition = parseInt(e.positionMillis);
        socket.emit('position', e.positionMillis);
    };

    useEffect(() => {
        // socket = io('http://192.168.1.6:5550/');
        socket.on("user-join-room", (user) => {
            ToastAndroid.show(`${user.username} đã vào phòng`, ToastAndroid.SHORT);
            setViewers(viewers => [...viewers, user]);
        });

        socket.on("update-viewers", (list) => {
            setViewers(list);
        });

        socket.on("change-video", (video) => {
            setCurrentVideo(video);
            player.current.playAsync()
        });

        socket.on("add-playlist", (video) => {
            setPlaylist(playlist => [...playlist, video]);
            ToastAndroid.show(`${video.movie} tập ${video.episode} đã được thêm vào`, ToastAndroid.SHORT);
        });

        socket.on("send-message", (data) => {
            setMessages(messages => [...messages, data]);
            // ToastAndroid.show(`${video.movie} tập ${video.episode} đã được thêm vào`, ToastAndroid.SHORT);
        });

        socket.on("delete-playlist", (video) => {
            setPlaylist(playlist => playlist.filter(v => v.id != video.id));
            ToastAndroid.show(`${video.movie} tập ${video.episode} đã xóa`, ToastAndroid.SHORT);
        });

        socket.on("position", position => {
            // console.log(Math.abs(position - currentPosition));
            if (Math.abs(position - currentPosition) > 1500) {
                setPosition(parseInt(position) + 400);
                player.current.playAsync();
            }
        });

        socket.on("pause", () => {
            player.current.pauseAsync()
        });
        socket.on("play", () => {
            player.current.playAsync()
        });

        socket.on("master-change-video", (video) => {
            setCurrentVideo(video);
            player.current.playAsync();
        });

        socket.on("master-disconnect", () => {
            ToastAndroid.show("Close room", ToastAndroid.SHORT);
            navigation.goBack();
        });

        socket.on("fuck-off", () => {
            ToastAndroid.show("Fuck off", ToastAndroid.SHORT);
            navigation.goBack();
        });

        socket.on("viewer-disconnect", (user) => {
            ToastAndroid.show(`${user.username} leave room`, ToastAndroid.SHORT);
            setViewers(viewers => viewers.filter(v => v.id != user.id));
        });

        joinRoom();

        return () => {
            socket.disconnect();
        }
    }, []);

    return (
        <View style={styles.container}>
            <Provider>
                <Portal>
                    <Modal
                        visible={visibleSearchModal}
                        onDismiss={() => setVisibleSearchModal(false)}
                        contentContainerStyle={styles.modal}
                    >
                        <View
                            style={styles.modalContent}
                        >
                            <Searchbar
                                placeholder="Search"
                                iconColor='#fff'
                                placeholderTextColor={'#fff'}
                                inputStyle={styles.text}
                                style={{ backgroundColor: "#222222" }}
                                onChangeText={onChangeSearch}
                                value={searchQuery}
                            />
                            <View
                                style={styles.moviesSearchWrap}
                            >
                                <FlatList
                                    showsHorizontalScrollIndicator={false}
                                    nestedScrollEnabled
                                    data={arrMovie}
                                    renderItem={({ item }) =>
                                        <TouchableOpacity
                                            style={styles.moviesSearchItem}
                                            onPress={() => handleAddPlaylist(item)}
                                        >
                                            <Text
                                                style={styles.text}
                                            >
                                                {item.Movie.name} tập {item.episode}
                                            </Text>
                                        </TouchableOpacity>
                                    }
                                    keyExtractor={item => item.id}
                                />
                            </View>
                        </View>
                    </Modal>
                </Portal>
                <Header allowBack={true} />
                <View style={{ flex: 1 }}>
                    <View
                        style={{ flex: 1 }}
                    >
                        {
                            currentVideo ?
                                (
                                    <View style={{ padding: 10, flex: 1 }}>
                                        <Video
                                            ref={player}
                                            style={styles.video}
                                            source={{
                                                uri: currentVideo.hls,
                                            }}
                                            positionMillis={position}
                                            onPlaybackStatusUpdate={e => setPositionMillis(e)}
                                            onError={(err) => {
                                                Alert.alert(null, "Không thể tải được video !!!");
                                            }}
                                            useNativeControls
                                            onFullscreenUpdate={(e) => {

                                            }}
                                            resizeMode="contain"
                                        />
                                    </View>
                                ) :
                                (
                                    <View style={{ padding: 10, flex: 1 }}>

                                    </View>
                                )
                        }
                    </View>
                    <View style={{ flex: 2, padding: 10 }}>
                        <View
                            style={styles.tabHeader}
                        >
                            <TouchableOpacity
                                style={
                                    [
                                        styles.tabItem,
                                        tabSelect == 1 ? { borderBottomWidth: 3 } : ''
                                    ]
                                }
                                onPress={() => setTabSelect(1)}
                            >
                                <Text
                                    style={styles.text}
                                >
                                    Playlist ({playlist.length})
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={
                                    [
                                        styles.tabItem,
                                        tabSelect == 2 ? { borderBottomWidth: 3 } : ''
                                    ]
                                }
                                onPress={() => setTabSelect(2)}
                            >
                                <Text
                                    style={styles.text}
                                >
                                    Chat
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={
                                    [
                                        styles.tabItem,
                                        tabSelect == 3 ? { borderBottomWidth: 3 } : ''
                                    ]
                                }
                                onPress={() => setTabSelect(3)}
                            >
                                <Text
                                    style={styles.text}
                                >
                                    Viewers ({viewers.length})
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{ flex: 1, backgroundColor: "#3d3d3d", marginTop: 5 }}
                        >
                            {
                                tabSelect == 1 ?
                                    (
                                        <View
                                            style={{ flex: 1 }}
                                        >
                                            <View
                                                style={{
                                                    flexDirection: "row",
                                                    flexWrap: "wrap",
                                                    justifyContent: "center",
                                                    marginTop: 5,
                                                }}
                                            >
                                                <Button
                                                    mode="contained"
                                                    uppercase={false}
                                                    icon={({ size, color }) => (
                                                        <Icon name="search" size={size} color="#fff" />
                                                    )}
                                                    onPress={() => setVisibleSearchModal(true)}
                                                >
                                                    Tìm kiếm
                                                </Button>
                                            </View>
                                            <View style={{ flex: 1, padding: 5 }}>
                                                <FlatList
                                                    nestedScrollEnabled
                                                    showsVerticalScrollIndicator={false}
                                                    data={playlist}
                                                    renderItem={({ item }) =>
                                                        <View
                                                            style={[
                                                                styles.playlistItem,
                                                                (currentVideo && item.id == currentVideo.id) ?
                                                                    {
                                                                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                                                                    } : ''
                                                            ]}
                                                            key={item.id}
                                                        >
                                                            <TouchableOpacity
                                                                style={{ flex: 9, marginRight: 5 }}
                                                                onPress={() => {
                                                                    handleChangeVideo(item);
                                                                }}
                                                            >
                                                                <Text
                                                                    style={styles.text}
                                                                >
                                                                    {item.movie} tập {item.episode}
                                                                </Text>
                                                            </TouchableOpacity>
                                                            <TouchableOpacity
                                                                style={styles.deletePlaylistTouch}
                                                                onPress={() => {
                                                                    handleDeleteVideoInPlaylist(item);
                                                                }}
                                                            >
                                                                <Icon name="trash-outline" size={20} color="red" />
                                                            </TouchableOpacity>
                                                        </View>
                                                    }
                                                    keyExtractor={item => item.id}
                                                />
                                            </View>
                                        </View>
                                    ) : ('')
                            }
                            {
                                tabSelect == 2 ?
                                    (
                                        <View
                                            style={styles.chatTabWrap}
                                        >
                                            <View
                                                style={{ flex: 1, width: "100%" }}
                                            >
                                                <FlatList
                                                    showsHorizontalScrollIndicator={false}
                                                    nestedScrollEnabled
                                                    data={messages}
                                                    renderItem={({ item }) =>
                                                        <View
                                                            style={
                                                                [
                                                                    styles.messItem,
                                                                    uid == item.user.id ?
                                                                        { flexDirection: "row-reverse", } :
                                                                        { flexDirection: "row" }
                                                                ]
                                                            }
                                                        >
                                                            <View
                                                                style={{ flex: 1, alignItems: "center", }}
                                                            >
                                                                <Image
                                                                    source={{ uri: item.user.avatar }}
                                                                    style={styles.avatar}
                                                                />
                                                            </View>
                                                            <View style={{ flex: 6, paddingHorizontal: 5 }}>
                                                                <Text
                                                                    style={
                                                                        [
                                                                            styles.messUsername,
                                                                            uid == item.user.id ?
                                                                                { textAlign: "right" } : {}
                                                                        ]
                                                                    }
                                                                >
                                                                    {item.user.username} {uid == item.user.id ? "(You)" : ""}
                                                                </Text>
                                                                <Text
                                                                    style={
                                                                        [
                                                                            styles.text,
                                                                            styles.messContent
                                                                        ]
                                                                    }
                                                                >
                                                                    {item.message}
                                                                </Text>
                                                            </View>
                                                        </View>
                                                    }
                                                    keyExtractor={(item, index) => index}
                                                />
                                            </View>
                                            <TextInput
                                                style={styles.chatInput}
                                                mode="outlined"
                                                right={
                                                    <TextInput.Icon
                                                        name="send"
                                                        onPress={handleSendMess}
                                                    />
                                                }
                                                onChangeText={(text) => {
                                                    setMessageText(text);
                                                }}
                                                placeholder="Nhập tin nhắn"
                                                value={messageText}
                                            />
                                        </View>
                                    ) : ('')
                            }
                            {
                                tabSelect == 3 ?
                                    (
                                        <ScrollView>
                                            {
                                                viewers.map((e) =>
                                                    <TouchableOpacity
                                                        key={e.id}
                                                        style={styles.viewersItem}
                                                        onPress={() => { }}
                                                    >
                                                        <Image
                                                            source={{ uri: e.avatar }}
                                                            style={[
                                                                styles.avatar,
                                                                {
                                                                    marginRight: 20,
                                                                }
                                                            ]}
                                                        />
                                                        <Text
                                                            style={[
                                                                styles.text,
                                                                {
                                                                    fontSize: 15,
                                                                }
                                                            ]}
                                                        >
                                                            {e.username} {uid == e.id ? "(You)" : ""}
                                                        </Text>
                                                    </TouchableOpacity>
                                                )
                                            }
                                        </ScrollView>
                                    ) : ('')
                            }

                        </View>
                    </View>
                </View>
            </Provider>
        </View>
    )
}

export default Live;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5a5454',
    },
    video: {
        alignSelf: 'center',
        backgroundColor: 'transparent',
        width: width - 20,
        height: (width - 20) * (9 / 16),
    },
    text: { fontFamily: 'Montserrat', color: "#fff" },
    modal: { backgroundColor: '#000', padding: 10, marginHorizontal: 10, height: height * 0.6 },
    modalContent: {
        flex: 1,
        alignItems: "center"
    },
    moviesSearchWrap: { flex: 1, marginTop: 10, width: "95%" },
    moviesSearchItem: {
        backgroundColor: "gray",
        padding: 10,
        marginVertical: 2
    },
    tabHeader: { flexDirection: "row", flexWrap: "wrap" },
    tabItem: {
        flex: 1,
        paddingVertical: 10,
        borderColor: "gray",
        justifyContent: "center",
        alignItems: "center"
    },
    playlistItem: {
        flexDirection: 'row',
        flexWrap: "wrap",
        flex: 1,
        backgroundColor: "gray",
        padding: 10,
        marginVertical: 2
    },
    deletePlaylistTouch: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    chatTabWrap: { flex: 1, alignItems: "center", padding: 10 },
    messItem: {
        padding: 5,
        marginVertical: 2,
        flexWrap: "wrap"
    },
    avatar: {
        width: 40,
        height: 40,
        resizeMode: "contain",
        borderRadius: 100,
    },
    messUsername: {
        color: "#fff",
        fontFamily: "MontserratBold",
        fontSize: 13,
    },
    messContent: {
        backgroundColor: "#222222",
        fontSize: 18,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        marginTop: 5
    },
    chatInput: {
        width: "100%",
        marginTop: 5,
        fontFamily: 'Montserrat'
    },
    viewersItem: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderColor: "gray",
        borderBottomWidth: 2,
    }

});