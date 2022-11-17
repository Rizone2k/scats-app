import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    ScrollView,
    RefreshControl,
    Image,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { Button } from 'react-native-paper';
import { Video, AVPlaybackStatus } from 'expo-av';
import { WebView } from 'react-native-webview';
import { FlashList } from "@shopify/flash-list";
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header';
import getMovie from '../api/getMovie';

const { width, height } = Dimensions.get("window");

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const Watch = ({ route, navigation }) => {
    const { id } = route.params
    const video = useRef(null);
    const [status, setStatus] = useState({});
    const [movie, setMovie] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const callApiGetMovie = async () => {
        try {
            const rs = await getMovie(id);
            if (rs.status == "success") {
                if (rs.data != null) setMovie(rs.data);
            } else {
                alert(rs.message);
            }
        } catch (error) {
            alert("Error !!!");
        }
    }

    useEffect(() => {
        console.log("Watch screen Mount");
        callApiGetMovie();
        return () => {
            console.log("Watch screen Unmount");
        }
    }, []);

    return (
        <View style={styles.container}>
            <Header allowBack={true}></Header>
            {movie !== null ? (
                <View style={{}}>
                    <ScrollView
                        style={{}}
                        contentContainerStyle={styles.scrollView}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                    >
                        <View style={{}}>
                            <Image style={styles.imageBackground} source={{ uri: movie.background }} />
                            <View style={styles.backgroundMask}></View>
                            <View style={styles.infor}>
                                <View style={{ width: "33%", height: ((width / 3) * (16 / 9)) / 2, backgroundColor: "#000", marginRight: 20 }}>
                                    <Image style={styles.imageThumb} source={{ uri: movie.thumb }} />
                                </View>

                                <View style={{ width: "60%" }}>
                                    <Text
                                        numberOfLines={1}
                                        style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}
                                    >
                                        {movie.name}
                                    </Text>
                                    <View style={{ flexDirection: "row", marginVertical: 2 }}>
                                        <Text style={{ color: "#fff", fontSize: 14 }}>
                                            Năm phát hành:
                                        </Text>
                                        <TouchableOpacity style={{ marginLeft: 5 }}>
                                            <Text style={{ color: "#fff", fontSize: 14 }}>
                                                {movie.Year.name}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flexDirection: "row", marginVertical: 2 }}>
                                        <Text style={{ color: "#fff", fontSize: 14 }}>
                                            Quốc gia:
                                        </Text>
                                        <TouchableOpacity style={{ marginLeft: 5 }}>
                                            <Text style={{ color: "#fff", fontSize: 14 }}>
                                                {movie.Country.name}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flexDirection: "row", marginVertical: 2 }}>
                                        <Text style={{ color: "#fff", fontSize: 14 }}>
                                            Trạng thái:
                                        </Text>
                                        <TouchableOpacity style={{ marginLeft: 5 }}>
                                            <Text style={{ color: "#fff", fontSize: 14 }}>
                                                {movie.Status.name}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flexDirection: "row", marginVertical: 2 }}>
                                        <View style={{ flexDirection: "row", marginRight: 20 }}>
                                            <Icon name="eye-sharp" size={16} color="#0ff" style={{ marginRight: 5, lineHeight: 20 }} />
                                            <Text style={{ color: "#fff", fontSize: 14 }}>{movie.viewed}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", marginRight: 20 }}>
                                            <Icon name="heart-outline" size={16} color="#fc035e" style={{ marginRight: 5, lineHeight: 20 }} />
                                            <Text style={{ color: "#fff", fontSize: 14 }}>
                                                {movie.liked}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: "row", marginRight: 20 }}>
                                            <Icon name="star-sharp" size={16} color="yellow" style={{ marginRight: 5, lineHeight: 20 }} />

                                            <Text style={{ color: "#fff", fontSize: 14 }}>
                                                {movie.rating}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={{ height: 25, marginTop: 10, paddingHorizontal: 5, }}>
                                <FlashList
                                    horizontal
                                    data={movie.Genres}
                                    renderItem={({ item }) =>
                                        <TouchableOpacity
                                            style={
                                                {
                                                    backgroundColor: "black",
                                                    marginHorizontal: 2,
                                                    paddingVertical: 3,
                                                    paddingHorizontal: 5,
                                                    borderRadius: 10,
                                                }
                                            }
                                        >
                                            <Text style={{ color: "#fff" }}>#{item.name}</Text>
                                        </TouchableOpacity>
                                    }
                                    estimatedItemSize={200}
                                >

                                </FlashList>
                            </View>

                            <View style={{ paddingHorizontal: 10, marginTop: 10, }}>
                                <View style={{ borderColor: "gray", borderBottomWidth: 2, flexDirection: 'row' }}>
                                    <Text style={
                                        {
                                            color: "#fff",
                                            fontSize: 18,
                                            fontWeight: "bold",
                                            flexShrink: 1,
                                            backgroundColor: "#5a5454",
                                            position: "absolute",
                                            top: 0,
                                            paddingRight: 3
                                        }
                                    }
                                    >
                                        Nội dung
                                    </Text>
                                    <Text></Text>
                                </View>
                                <View style={{ height: 150 }}>
                                    <WebView
                                        style={{ marginTop: 5, }}
                                        scrollEnabled={false}
                                        automaticallyAdjustContentInsets={false}
                                        javaScriptEnabled={false}
                                        scalesPageToFit={false}
                                        source={{ html: movie.content }}
                                    />
                                </View>
                            </View>

                            <View style={{ paddingHorizontal: 10, marginTop: 10, }}>
                                <View style={{ borderColor: "gray", borderBottomWidth: 2, flexDirection: 'row' }}>
                                    <Text style={
                                        {
                                            color: "#fff",
                                            fontSize: 18,
                                            fontWeight: "bold",
                                            flexShrink: 1,
                                            backgroundColor: "#5a5454",
                                            position: "absolute",
                                            top: 0,
                                            paddingRight: 3
                                        }
                                    }
                                    >
                                        Danh sách tập
                                    </Text>
                                    <Text></Text>
                                </View>
                                <View>

                                </View>
                            </View>
                        </View>

                    </ScrollView>
                </View>
            ) : ('')}

            {/* <Video
                ref={video}
                style={styles.video}
                source={{
                    uri: source,
                }}
                useNativeControls
                resizeMode="contain"
                onPlaybackStatusUpdate={status => setStatus(() => status)}
            /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5a5454',
        paddingBottom: 48
    },
    scrollView: {
        alignItems: 'center',
    },
    imageBackground: {
        width: width,
        height: width * (9 / 16),
        resizeMode: 'contain',
    },
    backgroundMask: {
        position: "absolute",
        width: width,
        height: width * (9 / 16),
        backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
    infor: {
        width: width,
        flexDirection: "row",
        paddingHorizontal: 10,
    },
    imageThumb: {
        width: width / 3,
        height: (width / 3) * (16 / 9),
        resizeMode: 'contain',
        top: -(((width / 3) * (16 / 9)) / 3),
        position: "absolute",
        zIndex: 100,
    },



    // video: {
    //     alignSelf: 'center',
    //     width: width,
    //     height: width * (9 / 16),
    // },
    // buttons: {
    //     flexDirection: 'row',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
});

export default Watch;
