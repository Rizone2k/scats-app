import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import Header from '../components/Header';
import Slide from '../components/SlideBanner/Slide';

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
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <Slide />

            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5a5454',
    },
    scrollView: {
        alignItems: 'center',
        justifyContent: 'center',
    }
});
export default Home