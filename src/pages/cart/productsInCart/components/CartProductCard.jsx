import { ScaledSheet } from "react-native-size-matters";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SVGcloseButtonCart } from "../../../../images/svg/SVGcloseButtonCart";
import { SVGminusIconCart } from "../../../../images/svg/SVGminusIconCart";
import { SVGplusIconCart } from "../../../../images/svg/SVGplusIconCart";
import useCartStore from "../../../../store/cartStore";
import { formatValue } from "../../../../utils/format";
import { theme } from "../../../../global/styles/theme";

export const CartProductCard = ({ product }) => {
  const { addItem, removeItem } = useCartStore();

  return (
    <View style={styled.productWrapper}>
      <View style={styled.imgWrapper}>
        <Image
          source={{ uri: product.products_photos[0].url }}
          style={{ width: 70, height: 110, margin: 4 }}
        />
      </View>
      <View style={styled.rightSideWrapper}>
        <View style={styled.titleAndCloseButtonWrapper}>
          <View style={styled.titleAndCategoryWrapper}>
            <Text style={[styled.fonts["poppinsMedium"], styled.productTitle]}>
              {product.title}
            </Text>
            <Text style={[styled.category, styled.fonts["poppins"]]}>
              {product.category}
            </Text>
          </View>
          <TouchableOpacity
            style={styled.closeButtonWrapper}
            onPress={() => removeItem(product.id)}
          >
            <SVGcloseButtonCart size={19} />
          </TouchableOpacity>
        </View>
        <View style={styled.priceAndQuantityWrapper}>
          <Text style={[styled.fonts["poppinsMedium"], styled.price]}>
            {formatValue(product.price)}
          </Text>
          <View style={styled.minusPlusWrapper}>
            <TouchableOpacity onPress={() => removeItem(product.id)}>
              <SVGminusIconCart size={30} />
            </TouchableOpacity>
            <Text style={[styled.fonts["poppins"], { color: "white" }]}>
              {product.quantity}
            </Text>
            <TouchableOpacity onPress={() => addItem(product)}>
              <SVGplusIconCart size={30} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styled = ScaledSheet.create({
  productWrapper: {
    alignItems: "center",
    fontFamily: theme.fonts.fontPoppinsRegular,
    borderBottomWidth: 1,
    borderColor: theme.colors.grey1,
    flexDirection: "row",
  },

  imgWrapper: {
    borderWidth: 1,
    borderColor: theme.colors.grey1,
    borderRadius: "10@s",
    margin: 10,
  },

  titleAndCloseButtonWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexShrink: 1,
  },

  rightSideWrapper: {
    flex: 1,
    paddingRight: 10,
  },

  titleAndCategoryWrapper: {
    width: "90%",
  },

  closeButtonWrapper: {
    alignSelf: "flex-start",
  },

  priceAndQuantityWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexShrink: 1,
  },

  category: {
    color: theme.colors.grey3,
    fontSize: "10@s",
  },

  productTitle: {
    fontSize: "13@s",
  },

  price: {
    fontSize: "14@s",
  },

  minusPlusWrapper: {
    flexDirection: "row",
    backgroundColor: theme.colors.primaryColor,
    borderRadius: 10,
    alignItems: "center",
    gap: 7,
  },

  fonts: {
    poppinsMedium: {
      fontFamily: theme.fonts.fontPoppinsMedium,
    },
    poppinsSemiBold: {
      fontFamily: theme.fonts.fontPoppinsSemiBold,
    },
    poppins: {
      fontFamily: theme.fonts.fontPoppinsRegular,
    },
  },
});
