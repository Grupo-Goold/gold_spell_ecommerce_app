import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

import { theme } from '../../global/styles/theme';

import { SVGbuyButtonCart } from '../../images/svg/SVGbuyButtonCart';
import { SVGFavoriteIcon } from '../../images/svg/SVGfavoriteIcon';
import { SVGgoBackIconAlternate } from '../../images/svg/SVGgoBackIconAlternate';
import { SVGminusButton } from '../../images/svg/SVGminusButton';
import { SVGnotFavoriteIcon } from '../../images/svg/SVGnotFavoriteIcon';
import { SVGplusButton } from '../../images/svg/SVGplusButton';

import { ImageCarousel } from '../../components/ImageCarousel/ImageCarousel';
import { CollapsibleText } from './components/CollapsibleText/CollapsibleText';
import { StarRatings } from './components/StarRatings/StarRatings';

import { CustomLoading } from '../../components/CustomLoading/CustomLoading';
import { getProduct } from '../../services/products/getProduct';
import useCartStore from '../../store/cartStore';
import { useFavoritesStore } from '../../store/favoritesStore';
import { formatPrice } from '../../utils/utils';

export const ProductView = () => {
	const { count, increase, decrease, resetCount, addItem } = useCartStore();
	const { toggleFavorite, isFavorite } = useFavoritesStore();
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);

	const navigation = useNavigation();
	const route = useRoute();
	const { id } = route.params;

	useEffect(() => {
		const fetchProduct = async () => {
			setLoading(true);
			try {
				const productData = await getProduct(id);
				setProduct(productData);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		fetchProduct();
	}, [id]);

	useEffect(() => {
		return () => {
			resetCount();
		};
	}, []);

	if (loading) {
		return <CustomLoading />;
	}

	return (
		<SafeAreaView style={styled.pageContainer}>
			<ScrollView style={styled.scrollView} showsVerticalScrollIndicator={false}>
				<View style={styled.productImageContainer}>
					<TouchableOpacity
						onPress={() => {
							navigation.goBack();
						}}
						style={styled.goBackButton}
					>
						<SVGgoBackIconAlternate arrowColor={theme.colors.white} fillColor={theme.colors.primaryColor} size={50} />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => toggleFavorite(product.id)} style={styled.favoriteButton}>
						{isFavorite(product.id) ? <SVGFavoriteIcon width={45} height={45} /> : <SVGnotFavoriteIcon width={45} height={45} />}
					</TouchableOpacity>
				</View>

				{/* CARROSSEL */}
				<View style={styled.carouselWrapper}>
					<ImageCarousel images={product.products_photos} />
				</View>

				<View style={styled.titleWrapper}>
					<Text style={styled.titleFonts}>{product.title}</Text>
					<Text style={styled.price}>{formatPrice(product.price)}</Text>
				</View>

				<TouchableOpacity
					onPress={() => {
						navigation.navigate('Reviews', { product });
					}}
					style={styled.ratingWrapper}
				>
					<Text style={styled.reviewNumber}>
						<Text style={styled.ratingNumber}>{product.average_rating.toFixed(1)}</Text>
						{` (${product.reviews && product.reviews.length} Reviews)`}
					</Text>
					<View style={styled.ratingStarsWrapper}>
						<StarRatings rating={product.average_rating} onRating={null} width={15} height={15} />
					</View>
				</TouchableOpacity>

				<View style={styled.descriptionWrapper}>
					<CollapsibleText text={product.description} numberOfLines={3} />
				</View>
			</ScrollView>

			<View style={styled.buyButtonWrapper}>
				<View style={styled.minusPlusWrapper}>
					<TouchableOpacity onPress={decrease}>
						<SVGminusButton width={30} height={30} />
					</TouchableOpacity>
					<Text style={styled.quantityFonts}>{count}</Text>
					<TouchableOpacity onPress={increase}>
						<SVGplusButton width={30} height={30} />
					</TouchableOpacity>
				</View>
				<TouchableOpacity style={styled.buyButton} onPress={() => addItem(product)}>
					<SVGbuyButtonCart />
					<Text style={styled.buttonColor}>Adicionar ao carrinho | {formatPrice(product.price)}</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

const styled = ScaledSheet.create({
	scrollView: {
		flex: 1,
	},
	pageContainer: {
		zIndex: 10,
		flex: 1,
		backgroundColor: theme.colors.white,
		color: theme.colors.black,
	},
	productImageContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: '15@s',
	},
	goBackButton: {
		// marginLeft: "10@s",
		// position: "absolute",
	},
	carouselWrapper: {
		marginBottom: '28@s',
		paddingHorizontal: '15@s',
	},

	titleWrapper: {
		paddingHorizontal: '15@s',
	},
	minusPlusWrapper: {
		flexDirection: 'row',
		gap: 6,
	},
	titleFonts: {
		fontFamily: theme.fonts.fontPoppinsSemiBold,
		fontSize: '18@s',
	},
	price: {
		fontFamily: theme.fonts.fontPoppinsSemiBold,
		fontSize: '16@s',
	},
	quantityFonts: {
		fontFamily: theme.fonts.fontPoppinsSemiBold,
		fontSize: '16@s',
		width: '20@s',
		textAlign: 'center',
	},
	ratingWrapper: {
		flexDirection: 'row',
		gap: 10,
		alignItems: 'center',
		paddingHorizontal: '15@s',
		paddingTop: '5@s',
	},
	descriptionWrapper: {
		marginTop: '13@s',
		marginBottom: '10@s',
		paddingBottom: 5,
		paddingHorizontal: '15@s',
	},
	ratingStarsWrapper: {
		flexDirection: 'row',
		gap: 3,
	},
	ratingNumber: {
		color: theme.colors.black,
		fontFamily: theme.fonts.fontPoppinsSemiBold,
	},
	reviewNumber: {
		color: theme.colors.primaryColor,
	},
	buyButtonWrapper: {
		paddingHorizontal: '25@s',
		paddingVertical: '15@s',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		flexDirection: 'row',
		gap: '10@s',
		borderWidth: 1,
		borderColor: theme.colors.border,
		borderTopLeftRadius: '20@s',
		borderTopRightRadius: '20@s',
	},
	buyButton: {
		backgroundColor: theme.colors.primaryColor,
		borderRadius: '30@s',
		height: '45@s',
		width: '80%',
		maxWidth: '300@s',
		flexDirection: 'row',
		gap: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonColor: {
		color: theme.colors.white,
		fontFamily: theme.fonts.fontPoppinsMedium,
		fontSize: '10@s',
	},
});
