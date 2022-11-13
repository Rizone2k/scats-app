import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const Header = (props) => {
    const navigation = useNavigation();
    return (
        <View style={styles.header}>
            {props.allowBack &&
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}>
                    <Icon name="arrow-back-outline" size={40} color="#fff" />
                </TouchableOpacity>
            }
            <Image source={require('../images/logo.png')} style={styles.logo} />

            <TouchableOpacity
                onPress={() => {
                    navigation.openDrawer();
                }}>
                <Icon name="menu-outline" size={40} color="#fff" />
            </TouchableOpacity>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    header: {
        height: 50,
        padding: 5,
        backgroundColor: "#222222",
        flexDirection: "row"
    },
    logo: {
        width: undefined,
        height: undefined,
        flex: 1,
        resizeMode: 'contain',
    }
})