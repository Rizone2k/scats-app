import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/Ionicons';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { HomeStackNavigator, SearchStackNavigator, ExploreStackNavigator, ProfileStackNavigator } from './StackNavigator';

const Tab = createBottomTabNavigator();

const getRouteName = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName?.includes('WatchScreen') || routeName?.includes('LoginScreen')) {
        return "none";
    }
    return "flex";
}

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({

                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                        size = focused ? size + 5 : size;
                    } else if (route.name === 'Search') {
                        iconName = focused ? 'search' : 'search-outline';
                        size = focused ? size + 5 : size;
                    } else if (route.name === 'Explore') {
                        iconName = focused ? 'compass' : 'compass-outline';
                        size = focused ? size + 5 : size;
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                        size = focused ? size + 5 : size;
                    }

                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#0ff',
                tabBarInactiveTintColor: '#fff',
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "#222222",
                    height: 40,
                    display: getRouteName(route)
                }

            })}>
            <Tab.Screen name="Home" component={HomeStackNavigator} />
            <Tab.Screen name="Search" component={SearchStackNavigator} />
            <Tab.Screen name="Explore" component={ExploreStackNavigator} />
            <Tab.Screen name="Profile" component={ProfileStackNavigator} />
        </Tab.Navigator>
    )
}

export default TabNavigator