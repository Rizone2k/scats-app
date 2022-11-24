import { useEffect, useState, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Alert,
    TouchableOpacity
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Video, AVPlaybackStatus } from 'expo-av';
import { io } from "socket.io-client";
// import socket from '../configs/socket.config';
import Header from '../components/Header';

const { width, height } = Dimensions.get("window");

const Live = ({ route, navigation }) => {
    const { id } = route.params;
    const player = useRef(null);
    const [playerStatus, setPlayerStatus] = useState({});
    const [currentVideo, setCurrentVideo] = useState(null);
    const [tabSelect, setTabSelect] = useState(1);
    const [socket, setSocket] = useState(io('http://192.168.1.6:5550/'));

    const [playlist, setPlaylist] = useState([
        {
            id: 1,
            hls: 'https://hd.hdbophim.com/20221122/26370_121a9104/index.m3u8'
        },
        {
            id: 2,
            hls: 'https://hd.hdbophim.com/20221122/26379_7087f124/index.m3u8'
        },
        {
            id: 3,
            hls: 'https://1080.hdphimonline.com/20221122/37647_7860a5ec/index.m3u8'
        },
    ]);

    const joinRoom = async () => {
        const uid = await SecureStore.getItemAsync('uid');
        socket.emit('join-room', id, uid);
    }

    const handleChangeVideo = (video) => {
        socket.emit('change-video', JSON.stringify(video));
    }

    const setPositionMillis = (e) => {
        socket.emit('position', e.positionMillis);
    };

    useEffect(() => {
        // socket = io('http://192.168.1.6:5550/');
        socket.on("user-join-room", (userId) => {
            console.log(`user join room ${userId}`);
        })
        socket.on("change-video", (video) => {
            setCurrentVideo(JSON.parse(video));
            player.current.playAsync()
        });
        socket.on("position", position => {
            console.log(position);
            player.current.positionMillis(parseInt(position));
        });
        socket.on("pause", () => {
            player.current.pauseAsync()
        });
        socket.on("play", () => {
            player.current.playAsync()
        });

        socket.on("master-change-video", (video) => {
            setCurrentVideo(JSON.parse(video));
            player.current.playAsync();
        });

        socket.on("master-disconnect", () => {
            navigation.goBack();
        });

        socket.on("viewer-disconnect", (userId) => {
            console.log(`${userId} disconnect`)
        });

        joinRoom();

        return () => {
            socket.disconnect();
        }
    }, []);

    return (
        <View style={styles.container}>
            <Header allowBack={true} />
            <View style={{ flex: 1 }}>
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
                                    // onPlaybackStatusUpdate={status => setPlayerStatus(() => status)}
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
                <View style={{ flex: 2, padding: 10 }}>
                    <View
                        style={{ flexDirection: "row", flexWrap: "wrap" }}
                    >
                        <TouchableOpacity
                            style={
                                [
                                    {
                                        flex: 1,
                                        padding: 10,
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
                                        padding: 10,
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
                                        padding: 10,
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
                                Viewer
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{ flex: 1 }}
                    >
                        {
                            tabSelect == 1 ?
                                (
                                    <View>
                                        {
                                            playlist.map((e) =>
                                                <TouchableOpacity
                                                    key={e.id}
                                                    onPress={() => {
                                                        handleChangeVideo(e);
                                                    }}
                                                >
                                                    <Text>
                                                        {e.id}
                                                    </Text>
                                                </TouchableOpacity>
                                            )
                                        }
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
                                        <Text>
                                            Viewer
                                        </Text>
                                    </View>
                                ) : ('')
                        }
                    </View>
                </View>
            </View>
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
});