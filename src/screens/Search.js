import { View, Text, Button } from 'react-native';
import React from 'react';


const Search = ({ navigation }) => {
    return (
        <View>
            <Text>Search</Text>
            <Button
                title="Go to watch"
                onPress={() => navigation.navigate("WatchScreen", { source: 'https://hd.hdbophim.com/20220401/5291_ac1c89fd/index.m3u8' })}
            />
        </View>
    )
}

export default Search