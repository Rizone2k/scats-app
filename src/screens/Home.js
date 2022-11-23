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

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const Home = ({ navigation }) => {
    const dispatch = useDispatch();

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const checkLoggedIn = async () => {
        const token = await SecureStore.getItemAsync('access_token');
        if (token) {
            console.log("refresh token");
            dispatch(refreshToken())
                .then(unwrapResult)
                .then(rs => console.log(rs))
                .catch(err => console.log(err));
        }
    }

    useEffect(() => {
        console.log("Home screen Mount");
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
    },
});
export default Home