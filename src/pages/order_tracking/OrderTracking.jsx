import { useState } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { theme } from '../../global/styles/theme';

import { Header } from '../../components/Header/Header';
import InputCPF from './components/InputCPF/InputCPF';
import { TrackingCard } from './components/TrackingCard/TrackingCard';

import SVGnoTracking from '../../images/svg/SVGnoTracking';


export const OrderTracking = () => {
	const [shipments, setShipments] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	return (
		<SafeAreaView style={styles.pageContainer}>
			<Header />

			<ScrollView style={styles.pageWrapper}>
				<View style={styles.pageBox}>
					<Text style={styles.title}>Rastreios de pedidos</Text>
					<InputCPF setIsLoading={setIsLoading} setShipments={setShipments} />

					{shipments && shipments.length > 0 && !isLoading && shipments.map((shipment, index) => <TrackingCard key={index} shipment={shipment} />)}

					{shipments.length < 1 && !isLoading && (
						<View style={styles.noTrackingContainer}>
							<SVGnoTracking />
							<Text
								style={{
									textAlign: 'center',
									fontFamily: theme.fonts.fontPoppinsRegular,
								}}
							>
								Insira seu CPF para ter acesso ao rastreamento e histórico de todos os seus pedidos.
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
				</View>
			</ScrollView>
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
});
