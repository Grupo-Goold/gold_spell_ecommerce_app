import { ScaledSheet } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import { View, TextInput, TouchableOpacity, FlatList } from "react-native";
import { useState } from "react";

import { theme } from "../../../../global/styles/theme";

import { SVGgoBackIcon } from "../../../../images/svg/SVGgoBackIcon";
import { SVGmagnifyingGlassFavorites } from "../../../../images/svg/SVGmagnifyingGlassFavorites";

import { ProductCard } from "../../../home/components/productCard/ProductCard";

import { useFavoriteProductsContextHook } from "../../../../contexts/favoritesProductsContext/FavoritesProductsContext";

export const FavoritesSearch = () => {
  const [query, setQuery] = useState("");

  const { favoriteFilter } = useFavoriteProductsContextHook();

  const navigation = useNavigation();
  const favorites = favoriteFilter;

  const filteredFavorites = !query
    ? favorites
    : favorites.filter((product) => {
        return product.title.toLowerCase().includes(query.toLowerCase());
      });

  const handleQueryChange = (queryValue) => {
    setQuery(queryValue);
  };

  return (
    <View style={styled.pageWrapper}>
      <View style={styled.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <SVGgoBackIcon width={40} height={40} />
        </TouchableOpacity>
        <View style={styled.textInputWrapper}>
          <View style={styled.lensWrapper}>
            <SVGmagnifyingGlassFavorites
              width={25}
              height={25}
              strokeColor={theme.colors.primaryColor}
            />
          </View>
          <TextInput
            style={styled.textInput}
            value={query}
            onChangeText={(text) => handleQueryChange(text)}
            placeholder="Pesquisar..."
          />
        </View>
      </View>

      <FlatList
        data={filteredFavorites}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard product={item} />}
        contentContainerStyle={styled.productsList}
        columnWrapperStyle={styled.row}
        getItemLayout={(data, index) => ({
          length: 312,
          offset: 312 * index,
          index,
        })}
        removeClippedSubviews={true}
      />
    </View>
  );
};

const styled = ScaledSheet.create({
  pageWrapper: {
    backgroundColor: "white",
    height: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "20@s",
    gap: "20@s",
    paddingVertical: "20@s",
    paddingHorizontal: "10@s",
  },
  textInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  lensWrapper: {
    position: "absolute",
    left: "15@s",
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: theme.colors.grey0,
    width: "90%",
    height: "45@s",
    paddingLeft: "45@s",
    fontFamily: theme.fonts.fontPoppinsRegular,
  },

  productsList: {
    flexGrow: 1,
    justifyContent: "center",
    gap: "20@s",
    backgroundColor: "white",
    paddingBottom: "30@s",
  },
  row: {
    justifyContent: "center",
    gap: "20@s",
  },
});
