import { View, FlatList, TouchableOpacity, Dimensions, Image } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel-new';
import { ScaledSheet } from 'react-native-size-matters';
import React, { useState, useRef } from 'react';

import { theme } from '../../global/styles/theme';

export const ImageCarousel = ({ images }) => {
	const [activeSlide, setActiveSlide] = useState(0);
	const { width } = Dimensions.get('window');

	const carouselRef = useRef(null);

	const renderItem = ({ item }) => <Image style={styled.image} source={{ uri: images[item.i].url }} />;

	const handleThumbnailPress = (index) => {
		setActiveSlide(index);
		if (carouselRef.current) {
			carouselRef.current.snapToItem(index);
		}
	};

	return (
		<View>
			<Carousel
				data={images.map((e, i) => ({
					i,
				}))}
				renderItem={renderItem}
				sliderWidth={width}
				itemWidth={width}
				enableSnap={true}
				inactiveSlideOpacity={0.6}
				enableMomentum={true}
				onSnapToItem={(index) => {
					setActiveSlide(index);
				}}
				swipeThreshold={50}
				layoutCardOffset={-12}
				ref={carouselRef}
			/>
			<Pagination
				style={styled.pagination}
				dotsLength={images.length}
				activeDotIndex={activeSlide}
				dotStyle={{
					width: 10,
					height: 10,
					borderRadius: 5,
					backgroundColor: theme.colors.primaryColor,
				}}
				inactiveDotOpacity={0.3}
				inactiveDotScale={0.7}
			/>
			<FlatList
				data={images}
				horizontal
				renderItem={({ item, index }) => (
					<TouchableOpacity onPress={() => handleThumbnailPress(index)}>
						<View style={(styled.thumbnailWrapper, index === activeSlide && styled.thumbnailFocus)}>
							<Image style={styled.imageWrappe} source={{ uri: item?.url }} />
						</View>
					</TouchableOpacity>
				)}
				keyExtractor={(item, index) => index.toString()}
			/>
		</View>
	);
};

const styled = ScaledSheet.create({
	image: {
		width: '100%',
		height: '300@s',
		alignItems: 'center',
		justifyContent: 'center',
		objectFit: 'contain',
	},
	pagination: {
		width: '100@s',
		height: '20@s',
	},

	thumbnailWrapper: {
		width: 50,
		height: 50,
		margin: 5,
		alignItems: 'center',
		justifyContent: 'center',
	},
	thumbnailFocus: {
		borderColor: theme.colors.primaryColor,
		borderWidth: 2,
		borderRadius: '10@s',
	},
	imageWrappe: {
		width: '50@s',
		height: '50@s',
		borderRadius: '10@s',
		objectFit: 'contain',
	},
});
