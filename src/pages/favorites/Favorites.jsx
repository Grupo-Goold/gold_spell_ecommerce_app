import { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

import { SVGmagnifyingGlassFavorites } from '../../images/svg/SVGmagnifyingGlassFavorites';
import SVGnoFavorites from '../../images/svg/SVGnoFavorites';

import { Header } from '../../components/Header/Header';
import { theme } from '../../global/styles/theme';
import { SVGgoBackIcon } from '../../images/svg/SVGgoBackIcon';
import { getAllProducts } from '../../services/products/getAllProducts';
import { useFavoritesStore } from '../../store/favoritesStore';
import { ProductCard } from '../home/components/productCard/ProductCard';

export const Favorites = () => {
	const [products, setProducts] = useState([]);
	const [isSearching, setIsSearching] = useState(false);
	const [query, setQuery] = useState('');

	const { favorites } = useFavoritesStore();
	const productIds = Object.keys(favorites);

	useEffect(() => {
		const getProducts = async () => {
			const response = await getAllProducts();

			setProducts(response);
		};
		getProducts();
	}, []);

	const filteredProducts = products.filter(
		(product) =>
			productIds.includes(product.id) &&
			(!query || product.title.toLowerCase().includes(query.toLowerCase())),
	);

	return (
		<SafeAreaView style={styled.pageContainer}>
			{!isSearching && <Header />}

			<ScrollView style={styled.pageWrapper}>
				<View style={styled.pageBox}>
					{ isSearching ? (
						<View style={styled.header}>
							<TouchableOpacity onPress={() => setIsSearching(false)}>
								<SVGgoBackIcon width={40} height={40} />
							</TouchableOpacity>
							<View style={styled.textInputWrapper}>
								<View style={styled.lensWrapper}>
									<SVGmagnifyingGlassFavorites
										width={25}
										height={25}
										strokeColor={theme.colors.primaryColor}
									/>
								</View>
								<TextInput
									style={styled.textInput}
									value={query}
									onChangeText={(text) => setQuery(text)}
									placeholder="Pesquisar..."
								/>
							</View>
						</View>
					) : (
						<View style={styled.titleWrapper}>
							<Text style={[styled.fonts['poppinsSemiBold'], styled.title]}>Favoritos</Text>
							<View style={styled.magnifyingLensWrapper}>
								<TouchableOpacity onPress={() => setIsSearching(true)}>
									<SVGmagnifyingGlassFavorites width={25} height={25} strokeColor={theme.colors.primaryColor} />
								</TouchableOpacity>
							</View>
						</View>
					)}
					<View style={styled.mainWrapper}>
						{filteredProducts && filteredProducts.length > 0 ? (
							<FlatList
								data={filteredProducts}
								scrollEnabled={false}
								numColumns={2}
								showsVerticalScrollIndicator={false}
								keyExtractor={(item) => item.id}
								renderItem={({ item }) => <ProductCard product={item} />}
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
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: "20@s",
		gap: "20@s",
		paddingVertical: "20@s",
		paddingHorizontal: "10@s",
	},
		textInputWrapper: {
		flexDirection: "row",
		alignItems: "center",
	},
		lensWrapper: {
		position: "absolute",
		left: "15@s",
	},
		textInput: {
		borderWidth: 1,
		borderRadius: 20,
		borderColor: theme.colors.grey0,
		width: "90%",
		height: "45@s",
		paddingLeft: "45@s",
		fontFamily: theme.fonts.fontPoppinsRegular,
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
