import React from 'react';
import { View, Text, Button } from 'react-native';
import { Searchbar } from 'react-native-paper';


const Search = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);
    return (
        <View>
            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
            />
        </View>
    )
}

export default Search