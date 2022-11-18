import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from "./src/navigation/DrawerNavigator";
import AppLoading from 'expo-app-loading';
import {
	useFonts,
	Montserrat_400Regular,
	Montserrat_700Bold
} from '@expo-google-fonts/montserrat';

export default function App() {

	let [fontsLoaded] = useFonts({
		"Montserrat": Montserrat_400Regular,
		"MontserratBold": Montserrat_700Bold,
	});
	if (!fontsLoaded) {
		return null;
	} else {
		return (
			<View style={styles.container}>
				<NavigationContainer>
					<DrawerNavigator></DrawerNavigator>
				</NavigationContainer>
			</View>
		);
	}


}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 26,
	},
});
