import { Text, View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScaledSheet } from 'react-native-size-matters';
import { useEffect } from 'react';

import { theme } from '../../../../global/styles/theme';

import { SVGnotFavoriteIcon } from '../../../../images/svg/SVGnotFavoriteIcon';
import { SVGstarMockIcon } from '../../../../images/svg/SVGstarMockIcon';
import { SVGFavoriteIcon } from '../../../../images/svg/SVGfavoriteIcon';

import { useProductContextHook } from '../../../../contexts/productsContext/ProductsContext';
import { formatPrice } from '../../../../utils/utils';
import { useFavoritesStore } from '../../../../store/favoritesStore';

const defaultWidth = 120;
const defaultHeight = 205;

export const ProductCard = ({ product }) => {
	const { setSelectedProduct } = useProductContextHook();
	const { toggleFavorite, isFavorite } = useFavoritesStore();
	const navigation = useNavigation();

	return (
		<View style={styled.productWrapper}>
			<View style={styled.imgWrapper}>
				<TouchableOpacity
					onPress={() => toggleFavorite(product.id)}
					style={styled.favoriteButton}
				>
					{isFavorite(product.id) ? <SVGFavoriteIcon /> : <SVGnotFavoriteIcon />}
				</TouchableOpacity>

				<TouchableOpacity
					onPress={() => {
						setSelectedProduct(product);
						navigation.navigate('ProductView');
					}}
				>
					<Image
						source={{ uri: product.products_photos[0].url }}
						style={{
							width: defaultWidth,
							height: defaultHeight,
							resizeMode: 'contain',
						}}
					/>
				</TouchableOpacity>
			</View>
			<View style={styled.lowerWrapper}>
				<View>
					<Text numberOfLines={2} style={styled.title}>
						{product.title}
					</Text>
					<Text numberOfLines={1} style={styled.category}>
						{product.category}
					</Text>
				</View>
				<View style={styled.priceRatingWrapper}>
					<Text style={styled.price}>{formatPrice(product.price)}</Text>
					<View style={styled.ratingWrapper}>
						<SVGstarMockIcon />
						<Text>{product.average_rating.toFixed(1)}</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

const styled = ScaledSheet.create({
	productWrapper: {
		width: '145@s',
		height: 312,
		alignItems: 'flex-start',
		fontFamily: theme.fonts.fontPoppinsRegular,
	},
	imgWrapper: {
		borderWidth: 1,
		borderColor: theme.colors.grey1,
		borderRadius: '12@s',
		width: '145@s',
		alignItems: 'center',
		flexDirection: 'row',
		position: 'relative',
		justifyContent: 'center',
	},
	favoriteButton: {
		position: 'absolute',
		zIndex: 1,
		top: '10@s',
		left: '10@s',
	},
	lowerWrapper: {
		gap: '6@s',
	},
	title: {
		fontFamily: theme.fonts.fontPoppinsMedium,
		fontSize: '12@s',
		marginVertical: '6@s',
		minHeight: '40@s',
	},
	category: {
		fontSize: '9@s',
		color: theme.colors.grey3,
		marginTop: '-5@s',
	},
	priceRatingWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	ratingWrapper: {
		flexDirection: 'row',
		gap: '5@s',
	},
	price: {
		fontFamily: theme.fonts.fontPoppinsMedium,
		fontSize: '14@s',
	},
});
