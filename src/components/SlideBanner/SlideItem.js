import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get("window");

const SlideItem = ({ item }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            style={styles.cardView}
            activeOpacity={1}
            onPress={() => navigation.navigate("WatchScreen", { id: item.id })}
        >
            <Image style={styles.image} source={{ uri: item.background }} />
            <View style={styles.textView}>
                <Text style={styles.itemTitle} numberOfLines={1}>{item.name}</Text>
                <Text style={{ fontFamily: "Montserrat", color: "#fff" }} numberOfLines={1}>{item.aka}</Text>
                <View
                    style={{ flexDirection: "row", flexWrap: "wrap" }}
                >
                    <View style={{ flexDirection: "row", flexWrap: "wrap", marginRight: 10, alignItems: "center" }}>
                        <Icon name="eye" color="#0ff" />
                        <Text style={styles.itemView} numberOfLines={1}>
                            {item.viewed}
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row", flexWrap: "wrap", marginRight: 10, alignItems: "center" }}>
                        <Icon name="heart" color="red" />
                        <Text style={styles.itemView} numberOfLines={1}>
                            {item.liked}
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row", flexWrap: "wrap", marginRight: 10, alignItems: "center" }}>
                        <Icon name="star" color="yellow" />
                        <Text style={styles.itemView} numberOfLines={1}>
                            {item.rating}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default SlideItem;

const styles = StyleSheet.create({
    cardView: {
        flex: 1,
        width: width - 20,
        height: (width - 20) * (9 / 16),
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
    },
    textView: {
        position: 'absolute',
        width: "100%",
        bottom: 0,
        left: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 8
    },
    image: {
        width: width - 20,
        height: (width - 20) * (9 / 16),
        borderRadius: 10
    },
    itemTitle: {
        fontFamily: 'MontserratBold',
        color: 'white',
        fontSize: 17,
        shadowColor: '#000',
        shadowOffset: { width: 0.8, height: 0.8 },
        shadowOpacity: 1,
        shadowRadius: 3,
        marginBottom: 5,
    },
    itemView: {
        fontFamily: 'Montserrat',
        color: 'white',
        fontSize: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0.8, height: 0.8 },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 5,
        marginBottom: 5,
        marginLeft: 5
    }
})