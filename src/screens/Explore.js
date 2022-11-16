import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

const Explore = () => {
    useEffect(() => {
        console.log("Explore screen Mount");
        return () => {
            console.log("Explore screen Unmount");
        }
    }, []);
    return (
        <View>
            <Text>Explore</Text>
        </View>
    )
}

export default Explore