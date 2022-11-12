import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigator from "./TabNavigator";
import GenreScreen from '../screens/Genre';
import SearchScreen from '../screens/Search';
import ExploreScreen from '../screens/Explore';
import ProfileScreen from '../screens/Profile';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={TabNavigator} />
            <Drawer.Screen name="Genre" component={GenreScreen} />
        </Drawer.Navigator>
    );
}

export default DrawerNavigator;