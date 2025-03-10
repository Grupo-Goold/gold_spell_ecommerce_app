import { ScaledSheet } from 'react-native-size-matters';
import { useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { SVGmagnifyingGlassFavorites } from '../../images/svg/SVGmagnifyingGlassFavorites';
import SVGnoFavorites from '../../images/svg/SVGnoFavorites';

import { theme } from '../../global/styles/theme';
import { useFavoriteProductsContextHook } from '../../contexts/favoritesProductsContext/FavoritesProductsContext';
import { useProductContextHook } from '../../contexts/productsContext/ProductsContext';
import { Header } from '../../components/Header/Header';
import { ProductCard } from '../home/components/productCard/ProductCard';

export const Favorites = () => {
	const navigation = useNavigation();

	const { fetchProductsForHomePage } = useProductContextHook();
	const { favoriteList, favoriteFilter, setFavoriteFilter, getFavorites } = useFavoriteProductsContextHook();

	const getFavoritesFilter = async () => {
		await getFavorites();

		const response = await fetchProductsForHomePage();

		const favorites = response?.filter((item) => favoriteList?.includes(item.id));

		setFavoriteFilter(favorites);
	};

	useEffect(() => {
		(async () => {
			await getFavoritesFilter();
		})();
	}, []);

	return (
		<SafeAreaView style={styled.pageContainer}>
			<Header />

			<ScrollView style={styled.pageWrapper}>
				<View style={styled.pageBox}>
					<View style={styled.titleWrapper}>
						<Text style={[styled.fonts['poppinsSemiBold'], styled.title]}>Favoritos</Text>
						<View style={styled.magnifyingLensWrapper}>
							<TouchableOpacity onPress={() => navigation.navigate('FavoritesSearch')}>
								<SVGmagnifyingGlassFavorites width={25} height={25} strokeColor={theme.colors.primaryColor} />
							</TouchableOpacity>
						</View>
					</View>
					<View style={styled.mainWrapper}>
						{favoriteFilter && favoriteFilter.length > 0 ? (
							<FlatList
								data={favoriteFilter}
								scrollEnabled={false}
								numColumns={2}
								showsVerticalScrollIndicator={false}
								keyExtractor={(item) => item.id}
								renderItem={({ item }) => <ProductCard product={item} getFavoritesFilter={getFavoritesFilter} />}
								contentContainerStyle={styled.productsList}
								columnWrapperStyle={styled.row}
							/>
						) : (
							<View style={styled.noFavoritesContainer}>
								<SVGnoFavorites />
								<Text
									style={{
										textAlign: 'center',
										fontFamily: theme.fonts.fontPoppinsRegular,
									}}
								>
									Seus produtos favoritos serão mostrados aqui
								</Text>
							</View>
						)}
					</View>
				</View>
			</ScrollView>
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
		flex: 1,
		backgroundColor: 'white',
	},
	pageBox: {
		flex: 1,
		paddingHorizontal: '20@s',
	},
	titleWrapper: {
		paddingTop: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	title: {
		fontSize: '24@s',
		color: theme.colors.primaryColor,
	},
	magnifyingLensWrapper: {
		borderWidth: 1,
		borderRadius: 12,
		padding: 5,
		borderColor: theme.colors.grey1,
	},
	mainWrapper: {
		flex: 1,
		marginBottom: '80@s',
		paddingTop: '20@s',
	},
	productsList: {
		flexGrow: 1,
		justifyContent: 'center',
		gap: '20@s',
	},
	row: {
		justifyContent: 'center',
		gap: '20@s',
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

	noFavoritesContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: '30@s',
		gap: '10@s',
	},
});
