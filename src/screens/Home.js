import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    ScrollView,
    RefreshControl,
} from 'react-native';
import Header from '../components/Header';
import Slide from '../components/SlideBanner/Slide';
import NewMovie from '../components/NewMovie';
import TopLike from '../components/TopLikeMovie';
import TopView from '../components/TopViewMovie';

const { width, height } = Dimensions.get("window");

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const Home = ({ navigation }) => {

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        console.log("Home screen Mount");
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