import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, Dimensions, ScrollView } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import Header from '../components/Header';

import getMovie from '../api/getMovie';

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const Watch = ({ route, navigation }) => {
    const { id } = route.params
    const video = useRef(null);
    const [status, setStatus] = useState({});

    const [movie, setMovie] = useState(null)

    useEffect(() => {
        console.log("Watch screen Mount");
        async function callApi() {
            try {
                const rs = await getMovie(id);
                if (rs.status == "success") {
                    if (rs.data != null) setMovie(rs.data);
                } else {
                    alert(rs.message);
                }
            } catch (error) {
                alert("Error !!!");
            }
        }
        callApi();
        return () => {
            console.log("Watch screen Unmount");
        }
    }, []);

    return (
        <View>
            <Header allowBack={true}></Header>
            {movie !== null ? (
                <ScrollView>

                    <Text>
                        {movie.name}
                    </Text>
                </ScrollView>
            ) : ('')}
            {/* <Video
                ref={video}
                style={styles.video}
                source={{
                    uri: source,
                }}
                useNativeControls
                resizeMode="contain"
                onPlaybackStatusUpdate={status => setStatus(() => status)}
            /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },
    video: {
        alignSelf: 'center',
        width: WIDTH,
        height: WIDTH * (9 / 16),
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Watch;
