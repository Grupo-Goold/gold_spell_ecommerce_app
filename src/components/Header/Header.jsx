import { ScaledSheet } from "react-native-size-matters";
import { useNavigation, useRoute } from "@react-navigation/native";

import { theme } from "../../global/styles/theme";

import { TouchableOpacity, View } from "react-native";

import { SVGlogo } from "../../images/svg/SVGlogo";
import { SVGbagIcon } from "../../images/svg/tabsIcons/SVGbagIcon";
import { SVGcartIcon } from "../../images/svg/tabsIcons/SVGcartIcon";
import { SVGfavoritesIcon } from "../../images/svg/tabsIcons/SVGfavoritesIcon";
import { SVGreturnIcon } from "../../images/svg/tabsIcons/SVGreturnIcon";
import { SVGtruckIcon } from "../../images/svg/tabsIcons/SVGtruckIcon";

export const Header = () => {
  const navigation = useNavigation();
  const route = useRoute();
    
  const getIconStyle = (screenName) => {    
    const isActive = route.name === screenName;
    
    return {
      color: isActive ? theme.colors.white : theme.colors.primaryColor,
      strokeColor: isActive ? theme.colors.primaryColor : theme.colors.transparent
    };
  };

  return (
    <View style={styled.headerContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate("InitialScreen")}
      >
        <SVGlogo width={90} height={90} />
      </TouchableOpacity>

      <View style={styled.tabRoutes}>
        <TouchableOpacity
          onPress={() => navigation.navigate("InitialScreen")}
        >
          <SVGbagIcon
            size={"36"}
            color={getIconStyle("InitialScreen").color}
            strokeColor={getIconStyle("InitialScreen").strokeColor}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("ShoppingCart")}
        >
          <SVGcartIcon
            size={"36"}
            color={getIconStyle("ShoppingCart").color}
            strokeColor={getIconStyle("ShoppingCart").strokeColor}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Favorites")}
        >
          <SVGfavoritesIcon
            size={"36"}
            color={getIconStyle("Favorites").color}
            strokeColor={getIconStyle("Favorites").strokeColor}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("OrderTracking")}
        >
          <SVGtruckIcon
            size={"36"}
            color={getIconStyle("OrderTracking").color}
            strokeColor={getIconStyle("OrderTracking").strokeColor}
          />
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => navigation.navigate("Return")}
        >
          <SVGreturnIcon
            size={"36"}
            style={{ padding: 10 }}
            color={getIconStyle("Return").color}
            strokeColor={getIconStyle("Return").strokeColor}
          />
        </TouchableOpacity> */}
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
    gap: "25@s",
    alignItems: "center",
    paddingHorizontal: "20@s",
  },

  tabRoutes: {
    flexDirection: "row",
    alignItems: "center",
    gap: "10@s",
  },
});
