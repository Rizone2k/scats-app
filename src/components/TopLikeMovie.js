import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Alert
} from 'react-native';
import CardHorizontal from './CardHorizontal';
import getTopLike from '../api/getTopLike';

const TopLike = () => {
    const [arrMovie, setArrMovie] = useState([]);


    const callApiGetTopLike = async () => {
        try {
            const rs = await getTopLike();
            if (rs.status == "success") {
                if (rs.data != null) setArrMovie(rs.data);
            } else {
                Alert.alert(null, rs.message);
            }
        } catch (error) {
            Alert.alert(null, "Error !!!");
        }
    }

    useEffect(() => {
        callApiGetTopLike();
        return () => {
        }
    }, []);

    return (
        <View style={[styles.blockWrap]}>
            <View style={styles.blockHeaderWrap}>
                <Text style={
                    styles.blockHeader
                }
                >
                    Top phim yêu thích
                </Text>
                <Text></Text>
            </View>
            <View style={{ marginTop: 10, padding: 5 }}>
                <View style={{}}>

                    <FlatList
                        nestedScrollEnabled
                        horizontal
                        data={arrMovie}
                        renderItem={({ item }) =>
                            <CardHorizontal item={item} />
                        }
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
        </View>
    )
}

export default TopLike;

const styles = StyleSheet.create({
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
})