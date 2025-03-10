import { Linking, Text, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";

import { SVGlogo } from "../../../../images/svg/SVGlogo";
import Instagram from "../../../../images/svg/SVGInstagram";
import TikTok from "../../../../images/svg/SVGTikTok";

import { theme } from "../../../../global/styles/theme";

const Footer = () => {
  const handleRedirect = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        Toast.show({
          type: "erroToast",
          text2: "Não foi possível abrir o link.",
          visibilityTime: 3000,
        });
      }
    } catch (error) {
      Toast.show({
        type: "erroToast",
        text2: "Ocorreu um problema ao tentar abrir o link.",
        visibilityTime: 3000,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.socialContainer}>
        <TouchableOpacity
          onPress={() => {
            handleRedirect("https://www.instagram.com/goldspellcosmeticos/");
          }}
        >
          <Instagram />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleRedirect("https://www.tiktok.com/@goldspellcosmeticos");
          }}
        >
          <TikTok />
        </TouchableOpacity>
      </View>
      <View style={styles.linksContainer}>
        <TouchableOpacity>
          <Text style={styles.linksText}>Politica de privacidade</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.linksText}>Termos de uso</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.linksText}>Troca e devoluções</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.noAnimalsContainer}>
        <SVGlogo width={90} height={90} />
        <Text style={styles.noAnimalsText}>
          💖 Não testamos em animais! 💖 
        </Text>
      </View>
      <View style={styles.noAnimalsContainer}>
        <Text style={styles.text}>Produtos fabricados e distribuídos por:</Text>
        <Text style={styles.span}>CNPJ: 57.570.640/0001-54 </Text>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    paddingVertical: "40@s",
    alignItems: "center",
    justifyContent: "center",
    gap: "30@s",
  },

  socialContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: "20@s",
  },

  linksContainer: {
    alignItems: "center",
    gap: "10@s",
  },
  linksText: {
    fontFamily: theme.fonts.fontPoppinsRegular,
    fontSize: "15@s",
  },

  noAnimalsContainer: {
    alignItems: "center",
    gap: "9@s",
  },
  noAnimalsText: {
    fontFamily: theme.fonts.fontPoppinsRegular,
    fontSize: "15@s",
  },
  text: {
    fontFamily: theme.fonts.fontPoppinsMedium,
    fontSize: "13@s",
  },
  span: {
    fontSize: "12@s",
    color: theme.colors.grey15,
  },
});

export default Footer;
