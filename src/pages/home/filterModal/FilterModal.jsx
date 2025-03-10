import { Modal, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

import { PriceSlider } from './components/priceSlider/PriceSlider';
import { Button } from '../../../components/Button/Button';

import { SVGcloseX } from '../../../images/svg/SVGcloseX';

import { theme } from '../../../global/styles/theme';

export const FilterModal = ({
	modalVisible,
	setModalVisible,
	selectedCategory,
	setSelectedCategory,
	minPrice,
	setMinPrice,
	maxPrice,
	setMaxPrice,
	categories,
}) => {
	const ItemSeparator = () => <View style={{ width: 10 }} />;

	const renderCategories = ({ item }) => (
		<TouchableOpacity onPress={() => setSelectedCategory(item.name)}>
			<Text style={[styled.categoriesCardTitle, item.name === selectedCategory ? styled.selectedCategory : styled.notSelectedCategory]}>
				{item.name}
			</Text>
		</TouchableOpacity>
	);

	return (
		<Modal
			visible={modalVisible}
			animationType="slide"
			transparent={true}
			onRequestClose={() => {
				setModalVisible((prevState) => !prevState);
			}}
		>
			<View style={styled.modalWrapper}>
				<View style={styled.modalContent}>
					{/* HEADER */}
					<View style={styled.modalHeader}>
						<View style={styled.closeXAndTitleWrapper}>
							<TouchableOpacity
								onPress={() => setModalVisible(!modalVisible)}
								style={{ height: 32, width: 32, alignItems: 'center', justifyContent: 'center' }}
							>
								<SVGcloseX width={16} height={16} />
							</TouchableOpacity>

							<Text style={[styled.fonts['poppinsSemiBold'], styled.headerTitle]}>Filtros</Text>
						</View>

						<Button
							title={'Salvar'}
							backgroundColor={theme.colors.primaryColor}
							textColor={'white'}
							width={120}
							borderColor={theme.colors.primaryColor}
							height={35}
							onPress={() => setModalVisible(false)}
						/>
					</View>

					<View style={styled.categoriesContainer}>
						<Text style={[styled.fonts['poppins'], styled.categoryTitle]}>Categorias</Text>
						<FlatList
							showsHorizontalScrollIndicator={false}
							data={categories}
							renderItem={renderCategories}
							horizontal
							ItemSeparatorComponent={<ItemSeparator />}
							style={{ paddingVertical: 4 }}
						/>
					</View>

					<View style={styled.sliderWrapper}>
						<PriceSlider maxPrice={maxPrice} minPrice={minPrice} setMaxPrice={setMaxPrice} setMinPrice={setMinPrice} />
					</View>
				</View>
			</View>
		</Modal>
	);
};

const styled = ScaledSheet.create({
	modalWrapper: {
		flex: 1,
		backgroundColor: 'rgba(248, 248, 248, 0.7)',
		justifyContent: 'flex-end',
	},
	modalContent: {
		backgroundColor: 'white',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.5,
		shadowRadius: 4,
		elevation: 5,
		paddingBottom: 50,
	},
	closeXAndTitleWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	modalHeader: {
		borderBottomWidth: 1,
		borderColor: theme.colors.grey0,
		width: '100%',
		height: 60,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: '15@s',
		alignItems: 'center',
	},
	headerTitle: {
		fontSize: '16@s',
	},
	categoriesContainer: {
		paddingHorizontal: '20@s',
		marginTop: '20@s',
		alignItems: 'flex-start',
		gap: 10,
	},
	categoryTitle: {
		fontSize: '16@s',
	},
	categoriesCardTitle: {
		fontFamily: theme.fonts.fontPoppinsRegular,
		padding: 10,
		paddingBottom: '10@s',
	},
	selectedCategory: {
		color: theme.colors.white,
		backgroundColor: theme.colors.primaryColor,
		borderRadius: '20@s',
	},
	notSelectedCategory: {
		color: theme.colors.primaryColor,
		borderWidth: 1,
		borderRadius: '20@s',
		borderColor: theme.colors.primaryColor,
	},
	sliderWrapper: {
		marginTop: '10@s',
		justifyContent: 'center',
		alignItems: 'center',
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
