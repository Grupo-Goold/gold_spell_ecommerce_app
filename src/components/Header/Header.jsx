import { ScaledSheet } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";

import { theme } from "../../global/styles/theme";

import { View, TouchableOpacity } from "react-native";

import { SVGlogo } from "../../images/svg/SVGlogo";
import { SVGbagIcon } from "../../images/svg/tabsIcons/SVGbagIcon";
import { SVGcartIcon } from "../../images/svg/tabsIcons/SVGcartIcon";
import { SVGfavoritesIcon } from "../../images/svg/tabsIcons/SVGfavoritesIcon";
import { SVGtruckIcon } from "../../images/svg/tabsIcons/SVGtruckIcon";
import { SVGreturnIcon } from "../../images/svg/tabsIcons/SVGreturnIcon";
import { useState } from "react";

export const Header = () => {
  const [screen, setScreen] = useState("initial");

  const navigation = useNavigation();

  return (
    <View style={styled.headerContainer}>
      <SVGlogo width={90} height={90} />

      <View style={styled.tabRoutes}>
        <TouchableOpacity
          onPress={() => {
            setScreen("initial");
            navigation.navigate("InitialScreen");
          }}
        >
          <SVGbagIcon
            size={"36"}
            color={
              screen == "initial"
                ? theme.colors.white
                : theme.colors.primaryColor
            }
            strokeColor={
              screen == "initial"
                ? theme.colors.primaryColor
                : theme.colors.transparent
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setScreen("cart");
            navigation.navigate("ShoppingCart");
          }}
        >
          <SVGcartIcon
            size={"36"}
            color={
              screen == "cart" ? theme.colors.white : theme.colors.primaryColor
            }
            strokeColor={
              screen == "cart"
                ? theme.colors.primaryColor
                : theme.colors.transparent
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setScreen("favorite");
            navigation.navigate("Favorites");
          }}
        >
          <SVGfavoritesIcon
            size={"36"}
            color={
              screen == "favorite"
                ? theme.colors.white
                : theme.colors.primaryColor
            }
            strokeColor={
              screen == "favorite"
                ? theme.colors.primaryColor
                : theme.colors.transparent
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setScreen("truck");
            navigation.navigate("OrderTracking");
          }}
        >
          <SVGtruckIcon
            size={"36"}
            color={
              screen == "truck" ? theme.colors.white : theme.colors.primaryColor
            }
            strokeColor={
              screen == "truck"
                ? theme.colors.primaryColor
                : theme.colors.transparent
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setScreen("return");
            navigation.navigate("Return");
          }}
        >
          <SVGreturnIcon
            size={"36"}
            style={{ padding: 10 }}
            color={
              screen == "return" ? theme.colors.white : theme.colors.primaryColor
            }
            strokeColor={
              screen == "return"
                ? theme.colors.primaryColor
                : theme.colors.transparent
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styled = ScaledSheet.create({
  headerContainer: {
    width: "100%",
    height: "95@s",
    backgroundColor: theme.colors.secondaryColor,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomColor: theme.colors.grey1,
    borderLeftColor: theme.colors.grey1,
    borderRightColor: theme.colors.grey1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "20@s",
  },

  tabRoutes: {
    flexDirection: "row",
    alignItems: "center",
    gap: "15@s",
  },
});
