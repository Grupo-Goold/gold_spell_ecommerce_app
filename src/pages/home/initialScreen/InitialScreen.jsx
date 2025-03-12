import { View, Text, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useRef, useState } from 'react';
import { useEffect } from 'react';

import { theme } from '../../../global/styles/theme';

import { ProductCard } from '../../home/components/productCard/ProductCard';
import { SearchBar } from '../../home/components/searchBar/SearchBar';
import { Header } from '../../../components/Header/Header';
import Footer from '../components/footer/Footer';
import Banner from '../components/banner/Banner';

import { FilterModal } from '../filterModal/FilterModal';
import { SVGfilterIcon } from '../../../images/svg/SVGfilterIcon';
import { getCategories } from '../../../services/categories/getCategories';
import { getStories } from '../../../services/stories/getStories';
import { getAllProducts } from '../../../services/products/getAllProducts';
import { getHighlights } from '../../../services/stories/getHighlights';
import { StoriesAndHighlights } from '../components/stories/StoriesAndHighlights';

export const InitialScreen = () => {
	const [categories, setCategories] = useState([]);
	const [products, setProducts] = useState([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState('Todos os produtos');
	const [query, setQuery] = useState('');
	const [minPrice, setMinPrice] = useState(10);
	const [maxPrice, setMaxPrice] = useState(500);
	const [stories, setStories] = useState([]);
	const [highlights, setHighlights] = useState([]);

	const filteredProducts = Array.isArray(products)
		? products.filter((product) => {
				if (selectedCategory !== 'Todos os produtos') {
					if (product.category !== selectedCategory) {
						return false;
					}
				}
				if (product.price > maxPrice || product.price < minPrice) {
					return false;
				}
				if (query.length > 0) {
					if (!product.title.toLowerCase().includes(query.toLowerCase())) {
						return false;
					}
				}
				return true;
			})
		: [];

	const flatListRef = useRef(null);

	const handleQueryChange = (queryValue) => {
		setQuery(queryValue);
	};

	useEffect(() => {
		const getProducts = async () => {
			const response = await getAllProducts();

			setProducts(response);
		};
		getProducts();
	}, []);

	useEffect(() => {
		(async () => {
			const response = await getCategories();
			setCategories([{ name: 'Todos os produtos' }, ...response]);
			
			const stories = await getStories();
			setStories(stories);

			const highlights = await getHighlights();
			setHighlights(highlights);
		})();
	}, []);

	const renderBanner = () => (
		<>
			<Banner flatListRef={flatListRef} />
			{highlights && stories && (
				<StoriesAndHighlights
					initialHighlights={highlights}
					initialStories={stories}
				/>
			)}
			<View style={styled.searchBarContainer}>
				<SearchBar queryValue={query} onQueryChange={handleQueryChange} />
				<TouchableOpacity onPress={() => setModalVisible(true)}>
					<SVGfilterIcon />
				</TouchableOpacity>
			</View>
		</>
	);

	return (
		<SafeAreaView style={styled.pageContainer}>
			<Header />
			<FlatList
				ref={flatListRef}
				data={filteredProducts}
				style={{ flex: 1, backgroundColor: 'white' }}
				ListHeaderComponent={renderBanner}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => <ProductCard product={item} />}
				numColumns={2}
				columnWrapperStyle={styled.row}
				contentContainerStyle={styled.productsList}
				getItemLayout={(data, index) => ({
					length: 312,
					offset: 312 * index,
					index,
				})}
				showsVerticalScrollIndicator={false}
				removeClippedSubviews={true}
				ListFooterComponent={<Footer />}
			/>

			<FilterModal
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
				selectedCategory={selectedCategory}
				categories={categories}
				setSelectedCategory={setSelectedCategory}
				maxPrice={maxPrice}
				minPrice={minPrice}
				setMaxPrice={setMaxPrice}
				setMinPrice={setMinPrice}
			/>
		</SafeAreaView>
	);
};

const styled = ScaledSheet.create({
	pageContainer: {
		flex: 1,
		backgroundColor: theme.colors.secondaryColor,
		alignItems: 'center',
	},

	storiesContainer: {
		paddingTop: '15@s',
		borderBottomWidth: 1,
		borderBottomColor: theme.colors.grey1,
	},
	storiesTitle: {
		flex: 1,
		fontFamily: theme.fonts.fontPoppinsSemiBold,
		fontSize: '20@s',
		color: theme.colors.quaternaryColor,
	},

	searchBarContainer: {
		marginTop: '20@s',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: '20@s',
	},
	selectedCategory: {
		color: theme.colors.primaryColor,
	},

	productsList: {
		flexGrow: 1,
		justifyContent: 'center',
		gap: '20@s',
		paddingHorizontal: '20@s',
		backgroundColor: 'white',
	},
	row: {
		gap: '20@s',
	},
});
