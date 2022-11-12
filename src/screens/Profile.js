import { View, Text, Button } from 'react-native'
import React from 'react'

const Profile = ({ navigation }) => {
    return (
        <View>
            <Text>Profile</Text>
            <Button
                title='Login'
                onPress={() => {
                    navigation.navigate("LoginScreen")
                }}
            />
        </View>
    )
}

export default Profile