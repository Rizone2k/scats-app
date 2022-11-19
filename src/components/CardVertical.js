import React from 'react';
import { StyleSheet, Text, Dimensions, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get("window");

const CardVertical = ({ item }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            style={{ width: width / 3.5, margin: 5 }}
            onPress={() => {
                navigation.navigate("WatchScreen", { id: item.id })
            }}
        >
            <Image style={
                {
                    width: width / 3.5,
                    height: ((width / 3.5) * (16 / 9)) - 40,
                    resizeMode: 'contain',
                    borderRadius: 5
                }
            }
                source={{ uri: item.thumb }} />
            <Text
                style={
                    {
                        color: "#fff",
                        fontFamily: 'Montserrat'
                    }
                }
                numberOfLines={2}
            >{item.name}</Text>
        </TouchableOpacity>
    )
}

export default CardVertical;

const styles = StyleSheet.create({})