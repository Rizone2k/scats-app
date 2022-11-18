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
    Alert
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
const NUM_OF_LINES = 6;
const Watch = ({ route, navigation }) => {
    const { id } = route.params
    const video = useRef(null);
    const [source, setSource] = useState(false);
    const [movie, setMovie] = useState(null);
    const [episodeActive, setEpisodeActive] = useState(0);
    const [numOfLine, setNumOfLine] = useState(NUM_OF_LINES);
    const [viewMore, setViewMore] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [links, setLinks] = useState([]);
    const [iframe, setIframe] = useState(false);
    const [fullScreen, setFullScreen] = useState(false);

    const onTextLayout = useCallback(e => {
        setShowMore(e.nativeEvent.lines.length > numOfLine);
    }, []);

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
                        nestedScrollEnabled={true}
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
                                <View style={styles.thumbWrap}>
                                    <Image style={styles.imageThumb} source={{ uri: movie.thumb }} />
                                </View>

                                <View style={{ width: "60%" }}>
                                    <Text
                                        numberOfLines={1}
                                        style={styles.title}
                                    >
                                        {movie.name}
                                    </Text>
                                    <View style={styles.detailWrap}>
                                        <Text style={styles.detail}>
                                            Năm phát hành:
                                        </Text>
                                        <TouchableOpacity style={{ marginLeft: 5 }}>
                                            <Text style={styles.detail}>
                                                {movie.Year.name}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.detailWrap}>
                                        <Text style={styles.detail}>
                                            Quốc gia:
                                        </Text>
                                        <TouchableOpacity style={{ marginLeft: 5 }}>
                                            <Text style={styles.detail}>
                                                {movie.Country.name}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.detailWrap}>
                                        <Text style={styles.detail}>
                                            Trạng thái:
                                        </Text>
                                        <TouchableOpacity style={{ marginLeft: 5 }}>
                                            <Text style={styles.detail}>
                                                {movie.Status.name}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.detailWrap}>
                                        <View style={styles.reactionWrap}>
                                            <Icon name="eye-sharp" size={16} color="#0ff" style={styles.reaction} />
                                            <Text style={styles.detail}>{movie.viewed}</Text>
                                        </View>
                                        <View style={styles.reactionWrap}>
                                            <Icon name="heart-outline" size={16} color="#fc035e" style={styles.reaction} />
                                            <Text style={styles.detail}>
                                                {movie.liked}
                                            </Text>
                                        </View>
                                        <View style={styles.reactionWrap}>
                                            <Icon name="star-sharp" size={16} color="yellow" style={styles.reaction} />

                                            <Text style={styles.detail}>
                                                {movie.rating}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            {/* <View style={{ height: 25, marginTop: 10, paddingHorizontal: 5, }}>
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
                            </View> */}

                            <View style={styles.genresWrap}>
                                {
                                    movie.Genres.map((e) =>
                                        <TouchableOpacity
                                            style={styles.genreTouch}
                                            key={e.id}
                                        >
                                            <Text style={{ color: "#fff", fontFamily: 'Montserrat' }}>#{e.name}</Text>
                                        </TouchableOpacity>
                                    )
                                }
                            </View>

                            <View style={styles.blockWrap}>
                                <View style={styles.blockHeaderWrap}>
                                    <Text style={
                                        styles.blockHeader
                                    }
                                    >
                                        Nội dung
                                    </Text>
                                    <Text></Text>
                                </View>
                                <View style={{ marginTop: 5, padding: 5 }}>
                                    <Text style={styles.detail} onTextLayout={onTextLayout} numberOfLines={numOfLine}>
                                        {movie.content.replace(/<\/?[^>]+(>|$)/g, "")}
                                    </Text>
                                    {
                                        showMore ?
                                            (
                                                <View style={{ marginTop: 2 }}>
                                                    {
                                                        viewMore ?
                                                            (
                                                                <TouchableOpacity
                                                                    onPress={() => {
                                                                        setNumOfLine(999999);
                                                                        setViewMore(false);
                                                                    }}
                                                                >
                                                                    <Text
                                                                        style={
                                                                            styles.showMore
                                                                        }
                                                                    >Xem thêm</Text>
                                                                </TouchableOpacity>
                                                            ) :
                                                            (
                                                                <TouchableOpacity
                                                                    onPress={() => {
                                                                        setNumOfLine(NUM_OF_LINES);
                                                                        setViewMore(true);
                                                                    }}
                                                                >
                                                                    <Text
                                                                        style={
                                                                            styles.showMore
                                                                        }
                                                                    >Rút gọn</Text>
                                                                </TouchableOpacity>
                                                            )
                                                    }
                                                </View>
                                            ) :
                                            ('')
                                    }
                                </View>
                            </View>

                            {
                                source ?
                                    (
                                        <View style={styles.blockWrap}>
                                            <View>
                                                {
                                                    iframe ?
                                                        (
                                                            <View style={{ height: (width - 20) * (9 / 16), }}>
                                                                <WebView
                                                                    scalesPageToFit={false}
                                                                    style={[styles.video]}
                                                                    allowsFullscreenVideo={true}
                                                                    originWhitelist={['*']}
                                                                    javaScriptEnabled={true}
                                                                    source={{
                                                                        html: `<body style="margin: 0 !important;padding: 0 !important;"><iframe width="100%" height="100%" src="${iframe}" frameborder="0"></iframe></body>`
                                                                    }}
                                                                />
                                                            </View>
                                                        ) :
                                                        (
                                                            <Video
                                                                ref={video}
                                                                style={styles.video}
                                                                source={{
                                                                    uri: source,
                                                                }}
                                                                useNativeControls
                                                                onFullscreenUpdate={(e) => {
                                                                    if (e.fullscreenUpdate == 1) {
                                                                        setFullScreen(!fullScreen);
                                                                        console.log({ action: "fullscreen", fullScreen });
                                                                    }
                                                                    if (e.fullscreenUpdate == 3) {
                                                                        setFullScreen(!fullScreen);
                                                                        console.log({ action: "not fullscreen", fullScreen });
                                                                    }
                                                                }}
                                                                resizeMode="contain"
                                                            />
                                                        )
                                                }
                                            </View>
                                            <View
                                                style={{ justifyContent: "center" }}
                                            >
                                                <Text style={[styles.detail, { textAlign: "center" }]}>
                                                    Link dự phòng
                                                </Text>
                                                <View style={styles.linkWrap}>
                                                    <TouchableOpacity
                                                        style={
                                                            [
                                                                styles.linkTouch,
                                                                iframe ? '' : styles.linkActive
                                                            ]
                                                        }
                                                        onPress={() => {
                                                            if (iframe) {
                                                                setIframe(false);
                                                            } else {
                                                                Alert.alert(null, "Bạn đã chọn !!!");
                                                            }
                                                        }}
                                                    >
                                                        <Text
                                                            style={[styles.detail, { textAlign: "center" }]}
                                                        >
                                                            Main
                                                        </Text>
                                                    </TouchableOpacity>
                                                    {

                                                        links.map((e) =>
                                                            <TouchableOpacity
                                                                style={
                                                                    [
                                                                        styles.linkTouch,
                                                                        iframe ? styles.linkActive : ''
                                                                    ]
                                                                }
                                                                onPress={() => {
                                                                    if (iframe != e.link) {
                                                                        setIframe(e.link);
                                                                    } else {
                                                                        Alert.alert(null, "Bạn đã chọn !!!");
                                                                    }
                                                                }}
                                                                key={e.id}
                                                            >
                                                                <Text
                                                                    style={[styles.detail, { textAlign: "center" }]}
                                                                >
                                                                    {e.Server.name}
                                                                </Text>
                                                            </TouchableOpacity>
                                                        )
                                                    }
                                                </View>
                                            </View>
                                        </View>
                                    ) :
                                    ('')
                            }

                            <View style={[styles.blockWrap, { height: 250 }]}>
                                <View style={styles.blockHeaderWrap}>
                                    <Text style={
                                        styles.blockHeader
                                    }
                                    >
                                        Danh sách tập
                                    </Text>
                                    <Text></Text>
                                </View>
                                <View style={{ marginTop: 5, padding: 5 }}>
                                    <ScrollView
                                        nestedScrollEnabled={true}
                                        style={{}}
                                    >
                                        {
                                            movie.Episodes.map((e) =>
                                                <TouchableOpacity
                                                    style={[
                                                        styles.epTouch,
                                                        e.id == episodeActive ? styles.epActive : ''
                                                    ]}
                                                    key={e.id}
                                                    onPress={() => {
                                                        if (e.hls == source) {
                                                            Alert.alert(null, "Bạn đã chọn !!!");
                                                        } else {
                                                            setSource(e.hls);
                                                            setEpisodeActive(e.id);
                                                            setLinks(e.Links);
                                                        }
                                                    }}
                                                >
                                                    <Icon name="play-circle-outline" size={20} color="#0ff" style={{ marginRight: 3 }} />
                                                    <Text
                                                        style={styles.detail}
                                                    >
                                                        Tập {e.episode}
                                                    </Text>

                                                </TouchableOpacity>
                                            )
                                        }
                                    </ScrollView>
                                </View>
                            </View>

                            <View style={styles.blockWrap}>
                                <View style={styles.blockHeaderWrap}>
                                    <Text style={
                                        styles.blockHeader
                                    }
                                    >
                                        Bình luận
                                    </Text>
                                    <Text></Text>
                                </View>
                                <View style={{ marginTop: 5, padding: 5 }}>

                                </View>
                            </View>
                        </View>

                    </ScrollView>
                </View>
            ) : ('')}
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
    thumbWrap: { width: "33%", height: ((width / 3) * (16 / 9)) / 2, backgroundColor: "#000", marginRight: 20 },
    imageThumb: {
        width: width / 3,
        height: (width / 3) * (16 / 9),
        resizeMode: 'contain',
        top: -(((width / 3) * (16 / 9)) / 3),
        position: "absolute",
        zIndex: 100,
    },
    title: { color: "#fff", fontSize: 18, fontWeight: "bold", fontFamily: 'Montserrat' },
    detailWrap: { flexDirection: "row", marginVertical: 2 },
    detail: { color: "#fff", fontSize: 14, fontFamily: 'Montserrat' },
    reactionWrap: { flexDirection: "row", marginRight: 20 },
    reaction: { marginRight: 5, lineHeight: 20 },
    genresWrap: { flexDirection: "row", flexWrap: "wrap", marginTop: 10, paddingHorizontal: 5, },
    genreTouch: {
        backgroundColor: "black",
        margin: 2,
        paddingVertical: 3,
        paddingHorizontal: 5,
        borderRadius: 10,
    },
    blockWrap: { paddingHorizontal: 10, marginTop: 10, },
    blockHeaderWrap: { borderColor: "gray", borderBottomWidth: 2, flexDirection: 'row', },
    blockHeader: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        flexShrink: 1,
        backgroundColor: "#5a5454",
        position: "absolute",
        top: 0,
        paddingRight: 3,
        fontFamily: 'Montserrat'
    },
    showMore: {
        fontFamily: 'Montserrat',
        color: "#fff",
        fontSize: 12,
        textAlign: "center",
        color: "#b9b9b9"
    },
    linkWrap: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", marginTop: 5 },
    linkTouch: { backgroundColor: "gray", padding: 10, width: 65, marginHorizontal: 3 },
    linkActive: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    epTouch: { backgroundColor: "gray", padding: 5, marginVertical: 3, flexDirection: "row" },
    epActive: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },



    video: {
        alignSelf: 'center',
        backgroundColor: 'transparent',
        width: width - 20,
        height: (width - 20) * (9 / 16),
    },
});

export default Watch;
