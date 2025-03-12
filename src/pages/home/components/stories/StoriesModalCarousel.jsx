import { View, Text, Image, ActivityIndicator, Dimensions, TouchableOpacity } from "react-native";
import { useRef, useState } from "react";
import { ScaledSheet } from "react-native-size-matters";
import { Video } from "expo-av";

import Carousel, { Pagination } from "react-native-snap-carousel-v2-maintained";
import { theme } from "../../../../global/styles/theme";
import { SVGcloseX } from "../../../../images/svg/SVGcloseX";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export const StoriesModalCarousel = ({ stories, hideModal }) => {
  const carouselRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.slide}>
        {loading && (
          <ActivityIndicator
            size="large"
            color={"black"}
            style={styles.spinner}
          />
        )}
        {item?.type_file == "1" ? (
          <Image
            source={{ uri: item?.url }}
            style={styles.image}
            resizeMode="cover"
            onLoad={() => setLoading(false)}
          />
        ) : (
          <Video
            source={{ uri: item?.url }}
            style={styles.video}
            useNativeControls={false}
            resizeMode="cover"
            isLooping
            shouldPlay={index === activeIndex}
            volume={1.0}
            onLoadStart={() => setLoading(true)}
            onLoad={() => setLoading(false)}
          />
        )}
        <Text style={styles.title}>{item.title}</Text>
      </View>
    );
  };

  {
    return (
      <>
      <TouchableOpacity
        style={styles.modalCloseButtonContainer}
        onPress={hideModal}>
        <View style={styles.buttonWrapper}>
          <SVGcloseX color={"white"} />
        </View>
      </TouchableOpacity>
      <View style={styles.storiesWrapper}>
        <Carousel
          ref={carouselRef}
          data={stories}
          layout="default"
          renderItem={renderItem}
          sliderWidth={screenWidth}
          itemWidth={screenWidth}
          itemHeight={screenHeight}
          onSnapToItem={(index) => setActiveIndex(index)}
        />
        <Pagination
          dotsLength={stories.length}
          activeDotIndex={activeIndex}
          containerStyle={styles.paginationContainer}
          dotStyle={styles.activeDotStyle}
          inactiveDotStyle={styles.inactiveDotStyle}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </View>
      </>
    );
  }
};

const styles = ScaledSheet.create({
  text: {
    fontFamily: theme.fonts.fontPoppinsRegular,
  },
  itemContainer: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  image: {
    width: 85,
    height: 85,
    borderRadius: 50,
  },
  imgContainer: {
    borderWidth: 3,
    borderColor: theme.colors.primaryColor,
    borderRadius: 50,
  },
  modalCloseButtonContainer: {
    position: "absolute",
    top: 45,
    right: 10,
    zIndex: 1000,
  },
  buttonWrapper: {
    backgroundColor: theme.colors.primaryColor,
    padding: 7,
    borderRadius: 50,
    alignSelf: "flex-start",
  },
  storiesWrapper: {
    flex: 1,
    zIndex: 1,
  },
  slide: {
    flex: 1,
    backgroundColor: theme.colors.grey0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    height: screenHeight,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    position: "absolute",
    bottom: 10,
    color: theme.colors.white,
  },
  image: {
    width: "100%",
    height: screenHeight,
    borderRadius: 10,
  },
  video: {
    width: "100%",
    height: screenHeight,
    borderRadius: 10,
  },
  spinner: {
    position: "absolute",
    zIndex: 10,
  },
  paginationContainer: {
    paddingVertical: 10,
    zIndex: 10,
    position: "absolute",
    top: 45,
  },
  activeDotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primaryColor,
  },
  inactiveDotStyle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.disabled,
  },
});