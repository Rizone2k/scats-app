import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigator from "./TabNavigator";
import DrawerContent from '../components/DrawerContent';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            screenOptions={{ drawerPosition: "right", headerShown: false }}
            drawerContent={props => <DrawerContent {...props} />}
        >
            <Drawer.Screen name="HomeDrawer" component={TabNavigator} />
        </Drawer.Navigator>
    );
}

export default DrawerNavigator;