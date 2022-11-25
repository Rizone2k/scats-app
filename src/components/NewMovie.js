import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Alert
} from 'react-native';
import CardHorizontal from './CardHorizontal';
import getNewMovie from '../api/getNewMovie';

const NewMovie = () => {
    const [arrMovie, setArrMovie] = useState([]);


    const callApiGetNewMovie = async () => {
        try {
            const rs = await getNewMovie();
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
        callApiGetNewMovie();
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
                    Phim mới cập nhật
                </Text>
                <Text></Text>
            </View>
            <View style={{ marginTop: 10, padding: 5 }}>
                <View style={{}}>

                    <FlatList
                        showsHorizontalScrollIndicator={false}
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

export default NewMovie

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