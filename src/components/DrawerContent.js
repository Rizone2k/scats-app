import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, ToastAndroid } from 'react-native';
import { Drawer, Text, Button, List } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';
import { StackActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    genresSelector,
    yearsSelector,
    countriesSelector,
    isLoggedInSelector,
    curentUserSelector
} from '../redux/selectors';
import { unwrapResult } from '@reduxjs/toolkit';
import { getGenres } from '../redux/reducers/genre';
import { getYears } from '../redux/reducers/year';
import { getCountries } from '../redux/reducers/country';
import { logout } from '../redux/reducers/auth';

const DrawerContent = (props) => {

    const dispatch = useDispatch();
    const genres = useSelector(genresSelector);
    const years = useSelector(yearsSelector);
    const countries = useSelector(countriesSelector);
    const isLoggedIn = useSelector(isLoggedInSelector);
    const curentUser = useSelector(curentUserSelector);

    const handleLogout = () => {
        dispatch(logout())
            .then(unwrapResult)
            .then(() => {
                props.navigation.navigate("Home");
            })
            .catch((err) => ToastAndroid.show(err, ToastAndroid.SHORT));
    }

    useEffect(() => {
        dispatch(getGenres());
        dispatch(getYears());
        dispatch(getCountries());
        return () => {
        }
    }, []);

    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props}>
                <View style={styles.logoConainer}>
                    <Image source={require('../images/logo.png')} style={styles.logoImage} />
                </View>
                <Drawer.Section style={{ justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                    <View style={styles.authSection}>
                        {
                            isLoggedIn ?
                                (
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            flexWrap: "wrap"
                                        }}
                                    >
                                        <Image
                                            source={{ uri: curentUser.avatar }}
                                            style={{
                                                width: 50,
                                                height: 50,
                                                resizeMode: "contain",
                                                borderRadius: 100,

                                            }}
                                        />
                                        <View
                                            style={{
                                                paddingHorizontal: 10,
                                                justifyContent: "center"
                                            }}
                                        >
                                            <Text style={{ color: "#fff", fontFamily: 'Montserrat', fontSize: 18 }}>
                                                {curentUser.username}
                                            </Text>
                                            <Text style={{ color: "#fff", fontFamily: 'Montserrat', fontSize: 12 }}>
                                                {curentUser.email}
                                            </Text>
                                        </View>
                                    </View>
                                ) :
                                (
                                    <View>
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
                                )
                        }
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
                            props.navigation.navigate('HomeScreen');
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
                            props.navigation.navigate("Search");
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
                                genres.map((e, index) =>
                                    <List.Item
                                        onPress={() => props.navigation.navigate("FilterScreen")}
                                        titleStyle={styles.listItem}
                                        title={e.name}
                                        key={e.id}
                                    />
                                )
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
                                years.map((e, index) =>
                                    <List.Item
                                        onPress={() => props.navigation.navigate("FilterScreen")}
                                        titleStyle={styles.listItem}
                                        title={e.name}
                                        key={e.id}
                                    />
                                )
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
                                countries.map((e, index) =>
                                    <List.Item
                                        onPress={() => props.navigation.navigate("FilterScreen")}
                                        titleStyle={styles.listItem}
                                        title={e.name}
                                        key={e.id}
                                    />
                                )
                            }
                        </List.Accordion>
                    </List.AccordionGroup>
                </Drawer.Section>
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <View style={styles.authSection}></View>
                </View>
                {
                    isLoggedIn ?
                        (
                            <Drawer.Section style={styles.drawerSection} >
                                <DrawerItem
                                    icon={({ size, color }) => (
                                        <Icon
                                            name="log-out-outline" size={size} color="#fff"
                                        />
                                    )}
                                    label={() => {
                                        return <Text style={styles.drawerTitle}>Đăng xuất</Text>
                                    }}
                                    onPress={handleLogout}
                                />
                            </Drawer.Section>
                        ) : ('')
                }
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