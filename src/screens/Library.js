import { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ToastAndroid,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native';
import { useSelector } from 'react-redux';
import getLibrary from '../api/getLibrary';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    isLoggedInSelector,
    currentUserSelector
} from '../redux/selectors';
import Header from '../components/Header';

const { width, height } = Dimensions.get("window");

const Library = ({ navigation }) => {
    // const navigation = useNavigation();
    const isLoggedIn = useSelector(isLoggedInSelector);
    const currentUser = useSelector(currentUserSelector);
    const [arrMovie, setArrMovie] = useState([]);

    const callApiGetLibrary = async () => {
        try {
            const rs = await getLibrary(currentUser.id);
            if (rs.status == "success") {
                setArrMovie(rs.data.Libraries);
            } else {
                ToastAndroid.show(rs.message, ToastAndroid.SHORT);
            }
        } catch (error) {
            console.log(error);
            ToastAndroid.show("Lỗi", ToastAndroid.SHORT);
        }
    }
    useEffect(() => {
        if (!isLoggedIn) return navigation.navigate("HomeScreen");
        callApiGetLibrary()
    }, [])

    return (
        <View style={styles.container}>
            <Header allowBack={true} />
            <ScrollView
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                contentContainerStyle={styles.scrollView}
            >
                <Text
                    style={{
                        color: "white",
                        fontFamily: "MontserratBold",
                        fontSize: 18,
                        textAlign: "center",
                        marginVertical: 10
                    }}
                >
                    Tủ phim của bạn có {arrMovie.length} phim
                </Text>
                <View style={styles.listWrap}>
                    {
                        arrMovie.map((item) =>
                            <TouchableOpacity
                                key={item.Movie.id}
                                style={{
                                    margin: 5,
                                    backgroundColor: "#3d3d3d",
                                    flex: 1,
                                    flexDirection: "row",
                                    flexWrap: "wrap",
                                    padding: 5,
                                }}
                                onPress={() => {
                                    navigation.navigate("WatchScreen", { id: item.Movie.id })
                                }}
                            >
                                <Image style={
                                    {
                                        width: width / 5,
                                        height: ((width / 5) * (16 / 9)) - 40,
                                        resizeMode: 'contain',
                                        borderRadius: 5,
                                        marginRight: 5
                                    }
                                }
                                    source={{ uri: item.Movie.thumb }} />
                                <View
                                    style={{
                                        flex: 1,
                                    }}
                                >
                                    <Text
                                        style={
                                            {
                                                color: "#fff",
                                                fontFamily: 'MontserratBold',
                                                fontSize: 15,

                                            }
                                        }
                                        numberOfLines={1}
                                    >{item.Movie.name}</Text>
                                    <Text
                                        style={
                                            {
                                                color: "#fff",
                                                fontFamily: 'Montserrat',
                                                fontSize: 13,
                                                margin: 2,
                                            }
                                        }
                                        numberOfLines={2}
                                    >{item.Movie.aka}</Text>
                                    <Text
                                        style={
                                            {
                                                color: "#fff",
                                                fontFamily: 'Montserrat',
                                                fontSize: 13,
                                                margin: 2,
                                            }
                                        }
                                        numberOfLines={1}
                                    >
                                        {
                                            item.Movie.Genres.map((e, i) =>
                                                `${e.name} ${(item.Movie.Genres.length - 1) == i ? "" : ", "}`
                                            )
                                        }
                                    </Text>
                                    <Text
                                        style={
                                            {
                                                color: "#fff",
                                                fontFamily: 'Montserrat',
                                                fontSize: 13,
                                                margin: 2,
                                            }
                                        }
                                        numberOfLines={1}
                                    >
                                        {
                                            `${item.Movie.Country.name} | ${item.Movie.Year.name} | ${item.Movie.Type.name} | ${item.Movie.Status.name}`
                                        }
                                    </Text>
                                    <View
                                        style={{
                                            margin: 2,
                                            flexDirection: "row",
                                            flexWrap: "wrap"
                                        }}
                                    >
                                        <View style={{ flexDirection: "row", flexWrap: "wrap", marginRight: 10, alignItems: "center" }}>
                                            <Icon name="eye" color="#0ff" />
                                            <Text style={styles.item} numberOfLines={1}>
                                                {item.Movie.viewed}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: "row", flexWrap: "wrap", marginRight: 10, alignItems: "center" }}>
                                            <Icon name="heart" color="red" />
                                            <Text style={styles.item} numberOfLines={1}>
                                                {item.Movie.liked}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: "row", flexWrap: "wrap", marginRight: 10, alignItems: "center" }}>
                                            <Icon name="star" color="yellow" />
                                            <Text style={styles.item} numberOfLines={1}>
                                                {item.Movie.rating}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default Library;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5a5454',
    },
    scrollView: {
        paddingBottom: 30
    },
    listWrap: { marginTop: 10, flex: 1, },
    item: {
        fontFamily: 'Montserrat',
        color: 'white',
        fontSize: 12,
        marginLeft: 6
    }
});