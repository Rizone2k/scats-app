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
    ScrollView
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
import { debounce } from "lodash";
import { Video, AVPlaybackStatus } from 'expo-av';
import { io } from "socket.io-client";
import Header from '../components/Header';
import searchMovieLive from '../api/searchMovieLive';

const { width, height } = Dimensions.get("window");
let uid, currentPosition;

const Live = ({ route, navigation }) => {
    const { id } = route.params;
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
                        contentContainerStyle={styles.containerStyle}
                    >
                        <View
                            style={{
                                flex: 1,
                                alignItems: "center"
                            }}
                        >
                            <Searchbar
                                placeholder="Search"
                                iconColor='#fff'
                                placeholderTextColor={'#fff'}
                                inputStyle={{ fontFamily: 'Montserrat', color: "#fff" }}
                                style={{ backgroundColor: "#222222" }}
                                onChangeText={onChangeSearch}
                                value={searchQuery}
                            />
                            <View
                                style={{ flex: 1, marginTop: 10, width: "95%" }}
                            >
                                <FlatList
                                    showsHorizontalScrollIndicator={false}
                                    nestedScrollEnabled
                                    data={arrMovie}
                                    renderItem={({ item }) =>
                                        <TouchableOpacity
                                            style={{
                                                backgroundColor: "gray",
                                                padding: 10,
                                                marginVertical: 2
                                            }}
                                            onPress={() => handleAddPlaylist(item)}
                                        >
                                            <Text
                                                style={{
                                                    color: "#fff",
                                                    fontFamily: "Montserrat"
                                                }}
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
                            style={{ flexDirection: "row", flexWrap: "wrap" }}
                        >
                            <TouchableOpacity
                                style={
                                    [
                                        {
                                            flex: 1,
                                            paddingVertical: 10,
                                            borderColor: "gray",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        },
                                        tabSelect == 1 ? { borderBottomWidth: 3 } : ''
                                    ]
                                }
                                onPress={() => setTabSelect(1)}
                            >
                                <Text
                                    style={{
                                        color: "#fff",
                                        fontFamily: "Montserrat",
                                    }}
                                >
                                    Playlist
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={
                                    [
                                        {
                                            flex: 1,
                                            paddingVertical: 10,
                                            borderColor: "gray",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        },
                                        tabSelect == 2 ? { borderBottomWidth: 3 } : ''
                                    ]
                                }
                                onPress={() => setTabSelect(2)}
                            >
                                <Text
                                    style={{
                                        color: "#fff",
                                        fontFamily: "Montserrat",
                                    }}
                                >
                                    Chat
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={
                                    [
                                        {
                                            flex: 1,
                                            paddingVertical: 10,
                                            borderColor: "gray",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        },
                                        tabSelect == 3 ? { borderBottomWidth: 3 } : ''
                                    ]
                                }
                                onPress={() => setTabSelect(3)}
                            >
                                <Text
                                    style={{
                                        color: "#fff",
                                        fontFamily: "Montserrat",
                                    }}
                                >
                                    Viewers
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
                                            <View style={{
                                                flex: 1,
                                                padding: 5
                                            }}>
                                                {/* <FlatList
                                                    nestedScrollEnabled
                                                    data={playlist}
                                                    renderItem={({ item }) =>
                                                        
                                                    }
                                                    keyExtractor={item => item.id}
                                                /> */}
                                                <ScrollView
                                                    showsVerticalScrollIndicator={false}
                                                    nestedScrollEnabled
                                                >
                                                    {
                                                        playlist.map(item =>
                                                            <View
                                                                style={[
                                                                    {
                                                                        flexDirection: 'row',
                                                                        flexWrap: "wrap",
                                                                        flex: 1,
                                                                        backgroundColor: "gray",
                                                                        padding: 10,
                                                                        marginVertical: 2
                                                                    },
                                                                    (currentVideo && item.id == currentVideo.id) ?
                                                                        {
                                                                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                                                                        } : ''
                                                                ]}
                                                                key={item.id}
                                                            >
                                                                <TouchableOpacity
                                                                    style={{
                                                                        flex: 9,
                                                                        marginRight: 5
                                                                    }}
                                                                    onPress={() => {
                                                                        handleChangeVideo(item);
                                                                    }}
                                                                >
                                                                    <Text
                                                                        style={{
                                                                            color: "#fff",
                                                                            fontFamily: "Montserrat"
                                                                        }}
                                                                    >
                                                                        {item.movie} tập {item.episode}
                                                                    </Text>
                                                                </TouchableOpacity>
                                                                <TouchableOpacity
                                                                    style={{
                                                                        flex: 1,
                                                                        justifyContent: "center",
                                                                        alignItems: "center"
                                                                    }}
                                                                    onPress={() => {
                                                                        handleDeleteVideoInPlaylist(item);
                                                                    }}
                                                                >
                                                                    <Icon name="trash-outline" size={20} color="red" />
                                                                </TouchableOpacity>
                                                            </View>
                                                        )
                                                    }
                                                </ScrollView>
                                            </View>
                                        </View>
                                    ) : ('')
                            }
                            {
                                tabSelect == 2 ?
                                    (
                                        <View>
                                            <Text>
                                                chat
                                            </Text>
                                        </View>
                                    ) : ('')
                            }
                            {
                                tabSelect == 3 ?
                                    (
                                        <View>
                                            {
                                                viewers.map((e) =>
                                                    <TouchableOpacity
                                                        key={e.id}
                                                        onPress={() => { }}
                                                    >
                                                        <Text>
                                                            {e.username}
                                                        </Text>
                                                    </TouchableOpacity>
                                                )
                                            }
                                        </View>
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
    containerStyle: { backgroundColor: '#000', padding: 10, marginHorizontal: 10, height: height * 0.6 },
    video: {
        alignSelf: 'center',
        backgroundColor: 'transparent',
        width: width - 20,
        height: (width - 20) * (9 / 16),
    },
});