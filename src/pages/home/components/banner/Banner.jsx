import { Text, TouchableOpacity, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

import SVGSearch from "../../../../images/svg/SVGForSearch";

import CarouselBanner from "../carouselBanner/CarouselBanner";
import { theme } from "../../../../global/styles/theme";

const Banner = ({ flatListRef }) => {
  const handleScrollToBottom = () => {
    flatListRef.current?.scrollToOffset({ offset: 740, animated: true });
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Ciencia simples e resultados reais!</Text>
        <Text style={styles.text}>
          Na Goold, vivemos e respiramos cosméticos! Nosso objetivo é levar
          beleza e felicidade aos clientes com produtos de alta qualidade,
          serviços exclusivos e parcerias duradouras.
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleScrollToBottom}>
        <SVGSearch />
        <Text style={styles.textButton}>Confira agora nossos produtos</Text>
      </TouchableOpacity>
      <CarouselBanner />
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    maxWidth: "100%",
    marginTop: "20@s",
    padding: "20@s",
    paddingBottom: "0@s",
    backgroundColor: theme.colors.secondaryColor,
    borderWidth: "1@s",
    borderColor: theme.colors.primaryColor,
    borderRadius: "14@s",
    gap: "20@s",
    alignItems: "center",
  },

  title: {
    fontFamily: theme.fonts.fontPoppinsRegular,
    fontSize: "27@s",
    color: theme.colors.primaryColor,
  },
  text: {
    fontSize: "14@s",
    fontWeight: "300",
  },

  button: {
    width: "100%",
    height: "44@s",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: "8@s",
    borderRadius: "40@s",

    backgroundColor: theme.colors.primaryColor,
  },
  textButton: {
    fontFamily: theme.fonts.fontPoppinsRegular,
    fontSize: "12@s",
    color: theme.colors.white,
  },
});
export default Banner;
