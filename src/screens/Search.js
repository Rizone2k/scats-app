import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    Alert,
    StyleSheet,
    FlatList,
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import { debounce } from "lodash";
import searchMovie from '../api/searchMovie';
import CardVertical from '../components/CardVertical';

const Search = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [arrMovie, setArrMovie] = useState([]);

    const changeSearchDebouncer = useCallback(
        debounce((query) => {
            if (query.trim().length >= 3) callApiSearchMovie(query);
        }, 1000),
        []);

    const onChangeSearch = (query) => {
        setSearchQuery(query)
        changeSearchDebouncer(query);
    }

    const callApiSearchMovie = async (key) => {
        try {
            const rs = await searchMovie(key);
            if (rs.status == "success") {
                if (rs.data != null) setArrMovie(rs.data);
            } else {
                Alert.alert(null, rs.message);
            }
        } catch (error) {
            Alert.alert(null, "Error !!!");
        }
    }

    return (
        <View style={styles.container}>
            <Searchbar
                placeholder="Search"
                iconColor='#fff'
                placeholderTextColor={'#fff'}
                inputStyle={{ fontFamily: 'Montserrat', color: "#fff" }}
                style={{ backgroundColor: "#222222", width: "95%", marginTop: 10 }}
                onChangeText={onChangeSearch}
                value={searchQuery}
            />

            <View
                style={{ alignItems: "center", marginTop: 10 }}
            >
                <FlatList
                    nestedScrollEnabled
                    horizontal={false}
                    numColumns={3}
                    data={arrMovie}
                    renderItem={({ item }) =>
                        <CardVertical item={item} />
                    }
                    keyExtractor={item => item.id}
                />
            </View>

        </View>
    )
}

export default Search;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5a5454',
        alignItems: "center",
        paddingBottom: 55
    },
});