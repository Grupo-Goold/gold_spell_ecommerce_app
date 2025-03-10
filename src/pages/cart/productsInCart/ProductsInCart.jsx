import { useNavigation } from '@react-navigation/native';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { Button } from '../../../components/Button/Button';
import { Header } from '../../../components/Header/Header';
import { theme } from '../../../global/styles/theme';
import useCartStore from '../../../store/cartStore';
import { formatPrice } from '../../../utils/utils';
import { CouponInput } from './components/CouponInput';
import { CartProductCard } from './components/CartProductCard';

export const ProductsInCart = () => {
	const navigation = useNavigation();
	const { productsInCart, totalCart } = useCartStore();

	return (
		<SafeAreaView style={styled.pageContainer}>
			<View style={styled.pageWrapper}>
				<Header />
				<View style={styled.mainWrapper}>
					<CouponInput />
					<View>
						<FlatList
							showsVerticalScrollIndicator={false}
							style={styled.flatListStyle}
							scrollEnabled={true}
							data={productsInCart}
							keyExtractor={(item) => item.id}
							renderItem={({ item, index }) => {
								return productsInCart.length > 0 ? (
									<View style={styled.itemContainer}>
										<CartProductCard product={item} />
									</View>
								) : null;
							}}
						/>
					</View>
				</View>
				<View style={styled.summaryWrapper}>
					<View style={styled.headerSummary}>
						<Text style={[styled.fonts['poppinsMedium'], { fontSize: 18 }]}>Resumo do pedido</Text>
					</View>
					<View>
						<View style={styled.totalPriceWrapper}>
							<Text style={styled.fonts['poppins']}>Valor total</Text>
							<Text
								style={{
									color: 'black',
									fontFamily: theme.fonts.fontPoppinsMedium,
								}}
							>
								{formatPrice(totalCart)}
							</Text>
						</View>
						<Button
							aditionalStyle={styled.checkoutButton}
							title="Prosseguir para o checkout"
							type="submit"
							onPress={() => {
								navigation.navigate('Step1Info');
							}}
							backgroundColor={theme.colors.primaryColor}
							borderColor="transparent"
							textColor={theme.colors.white}
						/>
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
};

const styled = ScaledSheet.create({
	pageContainer: {
		zIndex: 10,
		flex: 1,
		backgroundColor: theme.colors.secondaryColor,
		color: theme.colors.black,
	},
	pageWrapper: {
		backgroundColor: theme.colors.white,
		height: '100%',
	},
	mainWrapper: {
		flex: 1,
		marginHorizontal: 10,
		paddingHorizontal: '10@s',
	},
	header: {
		width: '100%',
		height: '98@s',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderWidth: 1,
		borderColor: theme.colors.grey0,
		paddingTop: '30@s',
		paddingHorizontal: '20@s',
	},
	title: {
		fontSize: '18@s',
		color: theme.colors.black,
		fontFamily: theme.fonts.fontPoppinsMedium,
	},
	spaceView: {
		width: '25@s',
	},
	adressAndCouponWrapper: {
		marginVertical: '15@s',
	},
	couponWrapper: {
		borderWidth: 1,
		borderColor: theme.colors.grey0,
		borderRadius: 15,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: '20@s',
		paddingVertical: '4@s',
	},
	buttonWrapper: {
		height: '30@s',
		backgroundColor: theme.colors.primaryColor,
		borderRadius: 15,
		justifyContent: 'center',
		paddingHorizontal: '12@s',
		paddingVertical: '2@s',
	},
	couponButton: {
		color: 'white',
	},
	couponTextInput: {
		width: '70%',
	},
	itemContainer: {
		marginVertical: '10@s',
	},
	flatListStyle: {
		marginBottom: 50,
	},
	summaryWrapper: {
		borderColor: theme.colors.grey0,
		borderWidth: 1,
		padding: 10,
		borderRadius: 10,
		height: '30%',
		paddingHorizontal: 15,
		backgroundColor: 'white',

		bottom: -60,
	},

	headerSummary: {
		flexDirection: 'row',
		gap: 10,
		alignItems: 'center',
		borderBottomColor: theme.colors.grey0,
		borderBottomWidth: 1,
		paddingBottom: 10,
		marginBottom: '15@s',
	},
	totalPriceWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: '15@s',
	},
	checkoutButton: {
		height: '40@s',
	},

	fonts: {
		poppinsMedium: {
			fontFamily: theme.fonts.fontPoppinsMedium,
		},
		poppinsSemiBold: {
			fontFamily: theme.fonts.fontPoppinsSemiBold,
		},
		poppins: {
			fontFamily: theme.fonts.fontPoppinsRegular,
		},
	},
});
