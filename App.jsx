import { theme } from './src/global/styles/theme';
// import { StatusBar } from 'expo-status-bar';
import { Routes } from './src/routes/Routes';
import { NavigationContainer } from '@react-navigation/native';
import { Providers } from './src/providers/Providers';
import Toast from 'react-native-toast-message';
import toastConfig from './src/utils/toastConfig';
import { StatusBar } from 'react-native';

import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { SafeAreaView } from 'react-native-safe-area-context';

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
				<Providers>
					<Routes />
				</Providers>
				<Toast config={toastConfig} />
			</NavigationContainer>
		</>
	);
}
