import * as React from 'react';
import { View, StyleSheet, Button, Dimensions } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import Header from '../components/Header';

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

const Watch = ({ route, navigation }) => {
    const { source } = route.params
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    return (
        <View>
            <Header allowBack={true}></Header>
            <Video
                ref={video}
                style={styles.video}
                source={{
                    uri: source,
                }}
                useNativeControls
                resizeMode="contain"
                onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
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
        width: screenWidth,
        height: 200,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Watch;
