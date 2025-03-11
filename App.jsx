// import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import Toast from 'react-native-toast-message';
import { Routes } from './src/routes/Routes';
import toastConfig from './src/utils/toastConfig';

import { Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins';

export default function App() {
	const [fontsLoaded] = useFonts({
		Poppins_400Regular,
		Poppins_500Medium,
		Poppins_600SemiBold,
		Poppins_700Bold,
	});

	if (!fontsLoaded) {
		return null;
	}

	return (
		<>
			<StatusBar barStyle="dark-content" />

			<NavigationContainer>
				<Routes />
				<Toast config={toastConfig} />
			</NavigationContainer>
		</>
	);
}
