import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from "./src/navigation/TabNavigator";
import DrawerNavigator from "./src/navigation/DrawerNavigator";

export default function App() {
	return (
		<View style={styles.container}>
			<NavigationContainer>
				<DrawerNavigator></DrawerNavigator>
			</NavigationContainer>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 24
	},
});
