import React, { useState } from "react";
import { ScaledSheet } from "react-native-size-matters";

import { useNavigation } from "@react-navigation/native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import { theme } from "../../../global/styles/theme";
import { StarRatings } from "../../productView/components/StarRatings/StarRatings";
import { RatingsModal } from "./components/ratingsModal/RatingsModal";

import { SVGgoBackIcon } from "../../../images/svg/SVGgoBackIcon";
import { SVGreviewIcon } from "../../../images/svg/SVGreviewIcon";

import { useProductContextHook } from "../../../contexts/productsContext/ProductsContext";
import { UserRatings } from "./components/userRatings/UserRatings";

export const Reviews = () => {
  const { selectedProduct } = useProductContextHook();
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  const handleOpenModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <ScrollView
      style={styled.pageContainer}
      contentContainerStyle={styled.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styled.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <SVGgoBackIcon />
        </TouchableOpacity>
        <Text style={styled.title}>Reviews</Text>
        <View style={styled.spaceView} />
      </View>

      <View style={styled.mainWrapper}>
        <View style={styled.reviewButtonSectionWrapper}>
          <View style={styled.reviewNumbersAndStarsWrapper}>
            <Text style={styled.fonts["poppinsMedium"]}>
              {selectedProduct.reviews.length} Reviews
            </Text>

            <View style={styled.totalRatingWrapper}>
              <Text style={styled.fonts["poppinsMedium"]}>
                {selectedProduct.average_rating.toFixed(1)}
              </Text>
              <View style={styled.ratingStarsWrapper}>
                <StarRatings
                  rating={selectedProduct.average_rating}
                  onRating={null}
                  width={15}
                  height={15}
                />
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styled.makeReviewButton}
            onPress={() => handleOpenModal()}
          >
            <SVGreviewIcon />
            <Text
              style={[styled.fonts["poppinsMedium"], styled.buttonFontColor]}
            >
              Fazer review
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {selectedProduct.reviews.length > 0 &&
        selectedProduct.reviews.map((review) => (
          <UserRatings
            comment={review.review}
            date={review.createdAt}
            rating={review.rating}
            key={review.id}
          />
        ))}
      <RatingsModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </ScrollView>
  );
};

const styled = ScaledSheet.create({
  pageContainer: {
    flexGrow: 1,
    backgroundColor: theme.colors.white,
  },
  scrollContent: {
    paddingBottom: "20@s",
  },
  header: {
    width: "100%",
    height: "88@s",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: theme.colors.grey0,
    paddingTop: "20@s",
    paddingHorizontal: "20@s",
  },
  title: {
    fontSize: "18@s",
    color: theme.colors.black,
    fontFamily: theme.fonts.fontPoppinsMedium,
  },
  spaceView: {
    width: "25@s",
  },
  mainWrapper: {
    marginTop: "20@s",
    paddingHorizontal: "15@s",
    // backgroundColor: theme.colors.green0,
  },
  reviewButtonSectionWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  reviewNumbersAndStarsWrapper: {
    gap: 3,
  },
  ratingStarsWrapper: {
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
  },
  totalRatingWrapper: {
    flexDirection: "row",
    gap: 6,
  },
  fonts: {
    poppinsMedium: {
      fontFamily: theme.fonts.fontPoppinsMedium,
    },
    poppinsSemiBold: {
      fontFamily: theme.fonts.fontPoppinsSemiBold,
    },
  },
  makeReviewButton: {
    backgroundColor: theme.colors.primaryColor,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "30@s",
    width: 150,
    height: 40,
  },
  buttonFontColor: {
    color: theme.colors.white,
  },
});
