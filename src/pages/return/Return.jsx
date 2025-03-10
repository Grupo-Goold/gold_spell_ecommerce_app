import { ScrollView, Text, View, ActivityIndicator, SafeAreaView, TouchableOpacity } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { theme } from '../../global/styles/theme';

import { Header } from '../../components/Header/Header';
import InputCPF from './components/InputCPF/InputCPF';
import SVGnoTracking from '../../images/svg/SVGnoTracking';
import { CardReturn } from './components/CardReturn/CardReturn';
import { useState } from 'react';
import PlusIcon from "../../images/svg/PlusIcon"
import { useNavigation } from '@react-navigation/native';

export const Return = () => {
	const navigation = useNavigation();
	
  	const [returnRequests, setReturnRequests] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	return (
		<SafeAreaView style={styles.pageContainer}>
			<Header />

			<ScrollView style={styles.pageWrapper}>
				<View style={styles.pageBox}>
					<Text style={styles.title}>Trocar & Devolver</Text>
					<InputCPF setIsLoading={setIsLoading} setReturnRequests={setReturnRequests} />

					{returnRequests && returnRequests.length > 0 && !isLoading && returnRequests.map((returnRequest, index) => <CardReturn key={index} returnRequest={returnRequest} />)}

					{returnRequests.length < 1 && !isLoading && (
						<View style={styles.noTrackingContainer}>
							<SVGnoTracking />
							<Text
								style={{
									textAlign: 'center',
									fontFamily: theme.fonts.fontPoppinsRegular,
								}}
							>
								Insira seu CPF para visualizar suas solicitações de devolução.
							</Text>
						</View>
					)}

					{isLoading && (
						<View style={styles.noTrackingContainer}>
							<ActivityIndicator size="large" color="#CBC698" />
							<Text>Carregando pedidos...</Text>
						</View>
					)}
					<View style={styles.spaceView} />


					<View style={styles.spaceView} />
				</View>
			</ScrollView>

			<TouchableOpacity
				style={styles.floatingButton}
				onPress={() => navigation.navigate('ReturnCreateModal')}
				>
				<PlusIcon name="plus" size={24} color="white" />
			</TouchableOpacity>
		</SafeAreaView>
	);
};

const styles = ScaledSheet.create({
	pageContainer: {
		zIndex: 10,
		flex: 1,
		backgroundColor: theme.colors.secondaryColor,
		color: theme.colors.black,
	},
	pageWrapper: {
		flex: 1,
		backgroundColor: 'white',
	},
	pageBox: {
		flex: 1,
		padding: '20@s',
	},
	title: {
		fontSize: '20@s',
		color: theme.colors.primaryColor,
		fontFamily: theme.fonts.fontPoppinsSemiBold,
		marginBottom: '10@s',
	},
	conditionalButtonsBox: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: theme.colors.grey0,
		borderRadius: 60,
		marginVertical: '15@s',
	},
	spaceView: {
		height: '50@s',
	},
	noTrackingContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: '30@s',
		gap: '10@s',
	},
	floatingButton: {
		position: 'absolute',
		bottom: '24@s',
		right: '24@s',
		backgroundColor: theme.colors.primaryColor,
		width: '50@s',
		height: '50@s',
		borderRadius: '25@s',
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 5,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
	},
});
