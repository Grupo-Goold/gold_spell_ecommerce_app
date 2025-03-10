import { ScaledSheet } from "react-native-size-matters";
import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";

import { theme } from "../../../../global/styles/theme";

import { SVGmagnifyingGlass } from "../../../../images/svg/SVGmagnifyingGlass";

export const SearchBar = ({ queryValue, onQueryChange }) => {
  return (
    <View style={styled.container}>
      <SVGmagnifyingGlass style={styled.magnifyingGlass} />
      <TextInput
        placeholder="Pesquisar item..."
        value={queryValue}
        onChangeText={onQueryChange}
        style={styled.input}
      />
    </View>
  );
};

const styled = ScaledSheet.create({
  container: {
    position: "relative",
    flex: 1,
  },
  input: {
    height: 50,
    borderWidth: 1,
    padding: 10,
    position: "relative",
    borderRadius: "30@s",
    paddingLeft: "40@s",
    borderColor: theme.colors.grey1,
  },
  magnifyingGlass: {
    position: "absolute",
    left: 15,
    top: 15,
    height: "20@s",
    width: "20@s",
  },
});
