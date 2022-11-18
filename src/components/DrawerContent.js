import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { Drawer, Text, Button, List } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import getCountry from '../api/getCountry';
import getGenre from '../api/getGenre';
import getYear from '../api/getYear';

const DrawerContent = (props) => {

    const [genre, setGenre] = useState([]);
    const [country, setCountry] = useState([]);
    const [year, setYear] = useState([]);

    const callApiYear = async () => {
        try {
            const rs = await getYear();
            if (rs.status == "success") {
                if (rs.data != null) {
                    setYear(rs.data);
                }
            } else {
                alert(rs.message);
            }
        } catch (error) {
            alert("Error !!!");
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
                alert(rs.message);
            }
        } catch (error) {
            alert("Error !!!");
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
                alert(rs.message);
            }
        } catch (error) {
            alert("Error !!!");
        }
    }

    useEffect(() => {
        console.log("Drawer Mount");
        callApiYear();
        callApiCountry();
        callApiGenre();
        return () => {
            console.log("Drawer Unmount");
        }
    }, []);

    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props}>
                <View style={styles.logoConainer}>
                    <Image source={require('../images/logo-2.png')} style={styles.logoImage} />
                </View>
                <Drawer.Section style={{ justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                    <View style={styles.authSection}>
                        <Text style={{ color: "#fff", textAlign: "center", fontFamily: 'Montserrat' }}>
                            Bạn chưa đăng nhập
                        </Text>
                        <View style={{ flexDirection: "row" }}>
                            <Button
                                style={styles.authBtn}
                                labelStyle={{ fontFamily: 'Montserrat' }}
                                icon={({ size, color }) => (
                                    <Icon
                                        name="log-in-outline" size={size} color={color}
                                    />
                                )}
                                mode="contained"
                                uppercase={false}
                                onPress={() => props.navigation.navigate("AuthScreen")}
                            >
                                Đăng nhập
                            </Button>
                        </View>
                    </View>
                </Drawer.Section>
                <Drawer.Section style={styles.drawerSection} >
                    <DrawerItem
                        icon={({ size, color }) => (
                            <Icon
                                name="home-outline" size={size} color="#fff"
                            />
                        )}
                        label={() => {
                            return <Text style={styles.drawerTitle}>Trang Chủ</Text>
                        }}
                        onPress={() => {

                        }}
                    />
                </Drawer.Section>
                <Drawer.Section style={styles.drawerSection} >
                    <DrawerItem
                        icon={({ size, color }) => (
                            <Icon
                                name="search-outline" size={size} color="#fff"
                            />
                        )}
                        label={() => {
                            return <Text style={styles.drawerTitle}>Tìm Kiếm</Text>
                        }}
                        onPress={() => {

                        }}
                    />
                </Drawer.Section>
                <Drawer.Section style={styles.drawerSection} >
                    <List.AccordionGroup>
                        <List.Accordion
                            style={styles.list}
                            titleStyle={[styles.drawerTitle, styles.listTitle]}
                            title="Thể Loại"
                            id="1"
                            left={() => <Icon name="list-outline" size={30} color="#fff" />}
                            right={({ isExpanded }) => {
                                if (isExpanded) return <Icon name="chevron-forward-outline" size={20} color="#fff" />
                                return <Icon name="chevron-down-outline" size={20} color="#fff" />
                            }}
                        >
                            {
                                genre.map((e, index) => <List.Item titleStyle={styles.listItem} title={e.name} key={e.id} />)
                            }
                        </List.Accordion>
                        <List.Accordion
                            style={styles.list}
                            titleStyle={[styles.drawerTitle, styles.listTitle]}
                            title="Năm"
                            id="2"
                            left={() => <Icon name="list-outline" size={30} color="#fff" />}
                            right={({ isExpanded }) => {
                                if (isExpanded) return <Icon name="chevron-forward-outline" size={20} color="#fff" />
                                return <Icon name="chevron-down-outline" size={20} color="#fff" />
                            }}
                        >
                            {
                                year.map((e, index) => <List.Item titleStyle={styles.listItem} title={e.name} key={e.id} />)
                            }
                        </List.Accordion>
                        <List.Accordion
                            style={styles.list}
                            titleStyle={[styles.drawerTitle, styles.listTitle]}
                            title="Quốc Gia"
                            id="3"
                            left={() => <Icon name="list-outline" size={30} color="#fff" />}
                            right={({ isExpanded }) => {
                                if (isExpanded) return <Icon name="chevron-forward-outline" size={20} color="#fff" />
                                return <Icon name="chevron-down-outline" size={20} color="#fff" />
                            }}
                        >
                            {
                                country.map((e, index) => <List.Item titleStyle={styles.listItem} title={e.name} key={e.id} />)
                            }
                        </List.Accordion>
                    </List.AccordionGroup>
                </Drawer.Section>
            </DrawerContentScrollView>
        </View>
    )
}

export default DrawerContent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#222222"
    },
    authSection: {
        color: "#fff",
        marginTop: 10,
        borderBottomColor: "gray",
        borderBottomWidth: 1,
        width: "95%",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 10
    },
    logoConainer: {
        height: 50,
        padding: 5
    },
    logoImage: {
        width: undefined,
        height: undefined,
        flex: 1,
        resizeMode: 'contain',
    },
    authBtn: {
        marginHorizontal: 2,
        padding: 0,
        marginVertical: 10
    },
    drawerSection: {
    },
    drawerTitle: {
        color: "#fff",
        fontSize: 17,
        fontFamily: 'Montserrat'
    },
    list: {
        backgroundColor: "#222222",
        paddingLeft: 17
    },
    listTitle: {
        marginLeft: 18
    },
    listItem: {
        color: "#fff",
        fontSize: 14,
        fontFamily: 'Montserrat'
    }
})