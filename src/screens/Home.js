import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    ScrollView,
    RefreshControl,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
import Header from '../components/Header';
import Slide from '../components/SlideBanner/Slide';
import NewMovie from '../components/NewMovie';
import TopLike from '../components/TopLikeMovie';
import TopView from '../components/TopViewMovie';
import { refreshToken } from '../redux/reducers/auth';

const { width, height } = Dimensions.get("window");

const Home = ({ navigation }) => {
    const dispatch = useDispatch();

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        console.log("re call api");
        setRefreshing(false);
    }, []);

    const checkLoggedIn = async () => {
        const token = await SecureStore.getItemAsync('access_token');
        if (token) {
            dispatch(refreshToken())
                .then(unwrapResult)
                .catch(err => { });
        }
    }

    useEffect(() => {
        // console.log(new Date(new Date().getTime()).toISOString());
        checkLoggedIn();
        return () => {
            console.log("Home screen Unmount");
        }
    }, []);

    return (
        <View style={styles.container}>
            <Header allowBack={false}></Header>
            <ScrollView
                nestedScrollEnabled
                contentContainerStyle={styles.scrollView}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <Slide />

                <NewMovie />

                <TopLike />

                <TopView />


            </ScrollView >

        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5a5454',
    },
    scrollView: {
        paddingBottom: 20
    },
});
export default Home;