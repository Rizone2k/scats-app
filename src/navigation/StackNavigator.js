import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from '../screens/Home';
import SearchScreen from '../screens/Search';
import ExploreScreen from '../screens/Explore';
import ProfileScreen from '../screens/Profile';
import WatchScreen from '../screens/Watch';
import LoginScreen from '../screens/Login';

const Stack = createStackNavigator();
const screenOptionStyle = {
    headerShown: false,
};

const HomeStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle} >
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="WatchScreen" component={WatchScreen} />
        </Stack.Navigator>
    )
}

const SearchStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
            <Stack.Screen name="WatchScreen" component={WatchScreen} />
        </Stack.Navigator>
    )
}

const ExploreStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="ExploreScreen" component={ExploreScreen} />
        </Stack.Navigator>
    )
}

const ProfileStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
        </Stack.Navigator>
    )
}

export { HomeStackNavigator, SearchStackNavigator, ExploreStackNavigator, ProfileStackNavigator }