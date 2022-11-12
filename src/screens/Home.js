import React from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Header from '../components/Header';

const Home = ({ navigation }) => {

    return (
        <View>
            <Header allowBack={false}></Header>
            <Text>Home</Text>
            <Button
                title="Go to watch"
                onPress={() => navigation.push("WatchScreen",
                    {
                        source: 'https://kd.hd-bophim.com/20220818/20264_c99d4d76/index.m3u8',
                    })
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 24
    },
});
export default Home