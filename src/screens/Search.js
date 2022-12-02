import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    Alert,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import { debounce } from "lodash";
import queryString from 'query-string'
import searchMovie from '../api/searchMovie';
import CardVertical from '../components/CardVertical';
import Pagination from '../components/Pagination';

const Search = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [arrMovie, setArrMovie] = useState([]);

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 21,
        total: 1
    });

    const changeSearchDebouncer = useCallback(
        debounce((query) => {
            if (query.trim().length >= 3) callApiSearchMovie(query, 1);
        }, 1000),
        []);

    const onChangeSearch = (query) => {
        setSearchQuery(query)
        changeSearchDebouncer(query);
    }

    const callApiSearchMovie = async (key, page) => {
        try {
            const filter = { ...{ key }, ...{ limit: 21, page } };
            const paramsString = queryString.stringify(filter);
            const rs = await searchMovie(paramsString);
            if (rs.status == "success") {
                if (rs.data != null) {
                    setArrMovie(rs.data.movies);
                    setPagination({ ...pagination, total: rs.data.count, page });
                }
            } else {
                Alert.alert(null, rs.message);
            }
        } catch (error) {
            Alert.alert(null, "Error !!!");
        }
    }

    const handlePageChange = (newPage) => {
        callApiFilter(searchQuery, newPage);
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
                {
                    arrMovie.length > 0 &&
                    <Text
                        style={{ fontFamily: 'Montserrat', color: "#fff", fontSize: 17, paddingLeft: 10, marginBottom: 10 }}
                    >
                        Tìm thấy {pagination.total} kết quả
                    </Text>
                }
                <ScrollView
                    contentContainerStyle={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.listWrap}>
                        {
                            arrMovie.map((item) =>
                                <CardVertical item={item} key={item.id} />
                            )
                        }
                    </View>
                    {
                        arrMovie.length > 0 &&
                        <View style={{ padding: 5 }}>
                            <Pagination
                                pagination={pagination}
                                onPageChange={handlePageChange}
                            />
                        </View>
                    }
                </ScrollView>
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
    scrollView: {
        alignItems: 'center',
        paddingBottom: 20
    },
    listWrap: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", marginTop: 10 }
});