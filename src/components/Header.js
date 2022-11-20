import { StyleSheet, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const HEIGHT = Dimensions.get("window").height;

const Header = (props) => {
    const navigation = useNavigation();
    return (
        <View style={styles.header}>
            {props.allowBack &&
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}>
                    <Icon name="arrow-back-outline" size={(HEIGHT / 15) - 10} color="#fff" />
                </TouchableOpacity>
            }
            <Image source={require('../images/logo.png')} style={styles.logo} />

            <TouchableOpacity
                onPress={() => {
                    navigation.openDrawer();
                }}>
                <Icon name="menu-outline" size={(HEIGHT / 15) - 10} color="#fff" />
            </TouchableOpacity>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    header: {
        height: HEIGHT / 15,
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