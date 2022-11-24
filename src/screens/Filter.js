import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Alert,
    ScrollView,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { Checkbox, RadioButton, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import queryString from 'query-string'
import Header from '../components/Header';
import getCountry from '../api/getCountry';
import getGenre from '../api/getGenre';
import getYear from '../api/getYear';
import filterMovie from '../api/filterMovie';
import CardVertical from '../components/CardVertical';
import Pagination from '../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { genresSelector, yearsSelector, countriesSelector } from '../redux/selectors';

const { width, height } = Dimensions.get("window");

const Filter = () => {

    const genres = useSelector(genresSelector);
    const years = useSelector(yearsSelector);
    const countries = useSelector(countriesSelector);
    const [arrMovie, setArrMovie] = useState([]);
    const [genresCheck, setGenresCheck] = useState([]);
    const [genresOpen, setGenresOpen] = useState(false);
    const [countryCheck, setCountryCheck] = useState(null);
    const [countriesOpen, setCountriesOpen] = useState(false);
    const [yearCheck, setYearCheck] = useState(null);
    const [yearsOpen, setYearsOpen] = useState(false);

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 21,
        total: 1
    });

    const callApiFilter = async (page) => {
        try {
            if (countryCheck != null || yearCheck != null || genresCheck.length > 0) {
                let c, y, g;
                if (countryCheck) c = { country: countryCheck };
                if (yearCheck) y = { year: yearCheck };
                if (genresCheck.length > 0) g = { genres: genresCheck };
                const filter = { ...c, ...y, ...{ limit: 21, page }, ...g };
                const paramsString = queryString.stringify(filter, { arrayFormat: 'comma' });
                const rs = await filterMovie(paramsString);
                if (rs.status == "success") {
                    if (rs.data != null) {
                        setArrMovie(rs.data.movies);
                        setPagination({ ...pagination, total: rs.data.count, page });
                    }
                } else {
                    Alert.alert(null, rs.message);
                }
            } else {
                Alert.alert(null, "Bạn chưa lựa chọn bộ lọc");
            }

        } catch (error) {
            Alert.alert(null, "Error !!!");
        }
    }

    const handlePageChange = (newPage) => {
        callApiFilter(newPage);
    }

    useEffect(() => {
        return () => {
        }
    }, []);

    return (
        <View style={styles.container}>
            <Header allowBack={true} />
            <ScrollView
                nestedScrollEnabled
                style={{ marginTop: 5 }}
            >
                <View>
                    <Text style={styles.title}>Bộ lọc phim</Text>

                    <View style={styles.blockWrap}>
                        <TouchableOpacity
                            style={styles.blockHeaderWrap}
                            onPress={() => {
                                setGenresOpen(!genresOpen);
                            }}
                        >
                            <Text style={
                                styles.blockHeader
                            }
                            >
                                Thể loại
                            </Text>
                            <Text></Text>
                            <Text style={
                                [styles.blockHeader, { right: 0 }]
                            }
                            >
                                {
                                    genresOpen ?
                                        (
                                            <Icon name="chevron-forward-outline" size={20} color="#fff" />
                                        ) :
                                        (
                                            <Icon name="chevron-down-outline" size={20} color="#fff" />
                                        )
                                }
                            </Text>
                        </TouchableOpacity>
                        <View style={[styles.blockContent, genresOpen ? { display: "flex" } : { display: "none" }]}>
                            {
                                genres.map((e) =>
                                    <Checkbox.Item
                                        status={genresCheck.includes(e.id) ? "checked" : "unchecked"}
                                        style={{ width: (width / 3) - 10 }}
                                        uncheckedColor="gray"
                                        mode={'android'}
                                        label={e.name}
                                        labelStyle={styles.labelSelection}
                                        key={e.id}
                                        onPress={() => {
                                            if (genresCheck.includes(e.id)) {
                                                setGenresCheck(genresCheck.filter((i) => { return i !== e.id }));
                                            } else {
                                                setGenresCheck([...genresCheck, e.id]);
                                            }

                                        }}
                                    />
                                )
                            }
                        </View>
                    </View>

                    <View style={styles.blockWrap}>
                        <TouchableOpacity
                            style={styles.blockHeaderWrap}
                            onPress={() => {
                                setCountriesOpen(!countriesOpen);
                            }}
                        >
                            <Text style={
                                styles.blockHeader
                            }
                            >
                                Quốc gia
                            </Text>
                            <Text></Text>
                            <Text style={
                                [styles.blockHeader, { right: 0 }]
                            }
                            >
                                {
                                    countriesOpen ?
                                        (
                                            <Icon name="chevron-forward-outline" size={20} color="#fff" />
                                        ) :
                                        (
                                            <Icon name="chevron-down-outline" size={20} color="#fff" />
                                        )
                                }
                            </Text>
                        </TouchableOpacity>
                        <View
                            style={
                                [
                                    styles.blockContent,
                                    countriesOpen ? { display: "flex" } : { display: "none" }
                                ]
                            }
                        >
                            {
                                countries.map((e) =>
                                    <RadioButton.Item
                                        status={countryCheck == e.id ? "checked" : "unchecked"}
                                        style={{ width: (width / 3) - 10 }}
                                        uncheckedColor="gray"
                                        mode={'android'}
                                        label={e.name}
                                        labelStyle={styles.labelSelection}
                                        key={e.id}
                                        value={e.id}
                                        onPress={() => {
                                            if (countryCheck == e.id) {
                                                setCountryCheck(null);
                                            } else {
                                                setCountryCheck(e.id);
                                            }
                                        }}
                                    />
                                )
                            }
                        </View>
                    </View>

                    <View style={styles.blockWrap}>
                        <TouchableOpacity
                            style={styles.blockHeaderWrap}
                            onPress={() => {
                                setYearsOpen(!yearsOpen);
                            }}
                        >
                            <Text style={
                                styles.blockHeader
                            }
                            >
                                Năm phát hành
                            </Text>
                            <Text></Text>
                            <Text style={
                                [styles.blockHeader, { right: 0 }]
                            }
                            >
                                {
                                    yearsOpen ?
                                        (
                                            <Icon name="chevron-forward-outline" size={20} color="#fff" />
                                        ) :
                                        (
                                            <Icon name="chevron-down-outline" size={20} color="#fff" />
                                        )
                                }
                            </Text>
                        </TouchableOpacity>
                        <View style={[styles.blockContent, yearsOpen ? { display: "flex" } : { display: "none" }]}>
                            {
                                years.map((e) =>
                                    <RadioButton.Item
                                        status={yearCheck == e.id ? "checked" : "unchecked"}
                                        style={{ width: (width / 3) - 10 }}
                                        uncheckedColor="gray"
                                        mode={'android'}
                                        label={e.name}
                                        labelStyle={styles.labelSelection}
                                        key={e.id}
                                        value={e.id}
                                        onPress={() => {
                                            if (yearCheck == e.id) {
                                                setYearCheck(null);
                                            } else {
                                                setYearCheck(e.id);
                                            }
                                        }}
                                    />
                                )
                            }
                        </View>
                    </View>

                    <View style={[styles.blockWrap, { alignItems: "flex-end" }]}>
                        <Button
                            mode="contained"
                            style={{ backgroundColor: "#000", width: width / 3 }}
                            labelStyle={{ fontFamily: 'Montserrat' }}
                            uppercase={false}
                            onPress={() => {
                                callApiFilter(1);
                            }}>
                            Tìm kiếm
                        </Button>
                    </View>
                </View>
                {
                    arrMovie.length > 0 ?
                        (
                            <Text
                                style={styles.resultText}
                            >
                                Tìm thấy {pagination.total} kết quả
                            </Text>
                        ) : ('')
                }
                <View
                    style={styles.listWrap}
                >
                    {
                        arrMovie.map((e) =>
                            <CardVertical item={e} key={e.id} />
                        )
                    }
                </View>
                {
                    arrMovie.length > 0 ?
                        (
                            <Pagination
                                pagination={pagination}
                                onPageChange={handlePageChange}
                            />
                        ) : ('')
                }
            </ScrollView >

        </View >
    )
}

export default Filter;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5a5454',
        paddingBottom: 25
    },
    title: { fontSize: 25, color: "#fff", textAlign: "center", fontFamily: 'Montserrat' },
    blockWrap: { paddingHorizontal: 10, marginTop: 10, },
    blockHeaderWrap: { borderColor: "gray", borderBottomWidth: 2, flexDirection: 'row', },
    blockHeader: {
        color: "#fff",
        fontSize: 15,
        flexShrink: 1,
        backgroundColor: "#5a5454",
        position: "absolute",
        top: 0,
        paddingRight: 3,
        paddingBottom: 2,
        fontFamily: 'MontserratBold'
    },
    blockContent: { flexDirection: "row", flexWrap: "wrap", },
    labelSelection: { color: "#fff", fontSize: 12, fontFamily: 'Montserrat' },
    resultText: { fontFamily: 'Montserrat', color: "#fff", fontSize: 17, paddingLeft: 10 },
    listWrap: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", marginTop: 10 }
});