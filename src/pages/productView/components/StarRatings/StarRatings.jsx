import React from "react";
import { View, TouchableOpacity } from "react-native";
import { SVGstarIcon } from "../../../../images/svg/SVGstarIcon";

import { theme } from "../../../../global/styles/theme";

export const StarRatings = ({
  totalStars = 5,
  rating,
  onRating,
  width,
  height,
  gap,
}) => {
  const renderStars = () => {
    let stars = [];
    for (let i = 1; i <= totalStars; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => {
            if (typeof onRating === "function") {
              onRating(i);
            }
          }}>
          <SVGstarIcon
            name={i <= rating ? "star" : "star-o"}
            width={width}
            height={height}
            color={i <= rating ? theme.colors.primaryColor : theme.colors.grey1}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <View style={{ flexDirection: "row", gap: gap }}>{renderStars()}</View>
  );
};
