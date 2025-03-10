import { ScaledSheet } from "react-native-size-matters";

import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { theme } from "../../../../global/styles/theme";

export const CollapsibleText = ({ text, numberOfLines = 3 }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <View>
        <Text
          style={styled.text}
          numberOfLines={isCollapsed ? numberOfLines : null}
        >
          {text}
        </Text>
        <TouchableOpacity onPress={toggleCollapsed}>
          <Text style={styled.collapseText}>
            {isCollapsed ? "Ler mais . . ." : "Menos"}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styled = ScaledSheet.create({
  collapseText: {
    fontFamily: theme.fonts.fontPoppinsSemiBold,
  },
  text: {
    textAlign: "justify",
    paddingRight: "10@s",
    fontFamily: theme.fonts.fontPoppinsRegular,
    color: theme.colors.grey2,
    // paddingLeft: "10@s",
  },
});
