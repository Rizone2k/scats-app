import * as React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import Header from '../components/Header';

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const Watch = ({ route, navigation }) => {
    const { id } = route.params
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    return (
        <View>
            <Header allowBack={true}></Header>
            <Text>
                {id}
            </Text>
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
