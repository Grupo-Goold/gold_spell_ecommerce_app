import { Dimensions, Image, Platform, StyleSheet, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import Carousel, {
  Pagination,
  ParallaxImage,
} from "react-native-snap-carousel-new";
import { useState } from "react";

import { theme } from "../../../../global/styles/theme";

const CarouselBanner = () => {
  const { width } = Dimensions.get("window");

  const [activeSlide, setActiveSlide] = useState(0);

  const images = [
    require("../../../../images/png/carousel1.png"),
    require("../../../../images/png/carousel2.png"),
    require("../../../../images/png/carousel3.png"),
  ];

  const renderItem = ({ item, index }, parallaxProps) => {
    return (
      <View style={styles.item}>
        {/* <ParallaxImage
          source={item}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        /> */}
        <Image source={item} style={styles.image} />
      </View>
    );
  };

  return (
    <>
      <Carousel
        sliderWidth={width - 80}
        sliderHeight={width}
        itemWidth={135}
        data={images}
        renderItem={renderItem}
        hasParallaxImages={true}
        loop
        onSnapToItem={(index) => setActiveSlide(index)}
        style={styles.pagination}
      />
      <View style={styles.pagination}>
        <Pagination
          dotsLength={images.length}
          activeDotIndex={activeSlide}
          dotStyle={{
            width: 30,
            height: 7,
            borderRadius: 5,
            backgroundColor: theme.colors.primaryColor,
          }}
          inactiveDotStyle={{
            width: 7,
            height: 7,
            borderRadius: 5,
            backgroundColor: theme.colors.primaryColor,
          }}
          inactiveDotOpacity={0.3}
          inactiveDotScale={0.7}
          animatedFriction={2}
        />
      </View>
    </>
  );
};

const styles = ScaledSheet.create({
  pagination: {
    marginTop: "-20@s",
  },
  item: {
    width: "115@s",
    height: "153@s",
  },
  imageContainer: {
    flex: 1,
    width: "100%",
    marginBottom: Platform.select({ ios: 0, android: 1 }),
    backgroundColor: "white",
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
    borderRadius: 8,
    width: "115@s",
    height: "153@s",
  },
});

export default CarouselBanner;
