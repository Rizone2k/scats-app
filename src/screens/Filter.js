import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Alert,
    ScrollView,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { Checkbox, RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header';
import getCountry from '../api/getCountry';
import getGenre from '../api/getGenre';
import getYear from '../api/getYear';

const { width, height } = Dimensions.get("window");

const Filter = () => {

    const [genre, setGenre] = useState([]);
    const [country, setCountry] = useState([]);
    const [year, setYear] = useState([]);
    const [genresCheck, setGenresCheck] = useState([]);
    const [genresOpen, setGenresOpen] = useState(false);
    const [countriesCheck, setCountriesCheck] = useState(null);
    const [countriesOpen, setCountriesOpen] = useState(false);
    const [yearsCheck, setYearsCheck] = useState([]);
    const [yearsOpen, setYearsOpen] = useState(false);

    const callApiYear = async () => {
        try {
            const rs = await getYear();
            if (rs.status == "success") {
                if (rs.data != null) {
                    setYear(rs.data);
                }
            } else {
                Alert.alert(null, rs.message);
            }
        } catch (error) {
            Alert.alert(null, "Error !!!");
        }
    }

    const callApiGenre = async () => {
        try {
            const rs = await getGenre();
            if (rs.status == "success") {
                if (rs.data != null) {
                    setGenre(rs.data);
                }
            } else {
                Alert.alert(null, rs.message);
            }
        } catch (error) {
            Alert.alert(null, "Error !!!");
        }
    }

    const callApiCountry = async () => {
        try {
            const rs = await getCountry();
            if (rs.status == "success") {
                if (rs.data != null) {
                    setCountry(rs.data);
                }
            } else {
                Alert.alert(null, rs.message);
            }
        } catch (error) {
            Alert.alert(null, "Error !!!");
        }
    }

    useEffect(() => {
        callApiYear();
        callApiCountry();
        callApiGenre();
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
                    <Text style={{ fontSize: 25, color: "#fff", textAlign: "center" }}>Bộ lọc phim</Text>
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
                        <View style={[{ flexDirection: "row", flexWrap: "wrap", }, genresOpen ? { display: "flex" } : { display: "none" }]}>
                            {
                                genre.map((e) =>
                                    <Checkbox.Item
                                        status={genresCheck.includes(e.id) ? "checked" : "unchecked"}
                                        style={{ width: (width / 3) - 10 }}
                                        uncheckedColor="gray"
                                        mode={'android'}
                                        label={e.name}
                                        labelStyle={{ color: "#fff", fontSize: 12 }}
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
                                    { flexDirection: "row", flexWrap: "wrap" },
                                    countriesOpen ? { display: "flex" } : { display: "none" }
                                ]
                            }
                        >
                            {
                                country.map((e) =>
                                    <RadioButton.Item
                                        status={countriesCheck == e.id ? "checked" : "unchecked"}
                                        style={{ width: (width / 3) - 10 }}
                                        uncheckedColor="gray"
                                        mode={'android'}
                                        label={e.name}
                                        labelStyle={{ color: "#fff", fontSize: 12 }}
                                        key={e.id}
                                        value={e.id}
                                        onPress={() => {
                                            setCountriesCheck(e.id);
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
                        <View style={[{ flexDirection: "row", flexWrap: "wrap", }, yearsOpen ? { display: "flex" } : { display: "none" }]}>
                            {
                                year.map((e) =>
                                    <RadioButton.Item
                                        status={yearsCheck == e.id ? "checked" : "unchecked"}
                                        style={{ width: (width / 3) - 10 }}
                                        uncheckedColor="gray"
                                        mode={'android'}
                                        label={e.name}
                                        labelStyle={{ color: "#fff", fontSize: 12 }}
                                        key={e.id}
                                        value={e.id}
                                        onPress={() => {
                                            setYearsCheck(e.id);
                                        }}
                                    />
                                )
                            }
                        </View>
                    </View>
                </View>

            </ScrollView >
        </View >
    )
}

export default Filter;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5a5454',
    },
    blockWrap: { paddingHorizontal: 10, marginTop: 10, },
    blockHeaderWrap: { borderColor: "gray", borderBottomWidth: 2, flexDirection: 'row', },
    blockHeader: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "bold",
        flexShrink: 1,
        backgroundColor: "#5a5454",
        position: "absolute",
        top: 0,
        paddingRight: 3,
        paddingBottom: 2,
        fontFamily: 'MontserratBold'
    },
});