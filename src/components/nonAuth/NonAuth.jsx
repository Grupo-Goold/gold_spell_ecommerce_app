import { ScaledSheet } from "react-native-size-matters";
import { Text, View, TouchableOpacity } from "react-native";
import { SVGnonAuthorizedLady } from "../../images/svg/SVGnonAuthorizedLady";
import { Button } from "../../pages/my_profile/components/Button/Button";
import { theme } from "../../global/styles/theme";
import { useNavigation } from "@react-navigation/native";

export const NonAuth = ({ pageName }) => {
  const navigation = useNavigation();

  const handleNavigateToSignUp = () => {
    navigation.navigate("Register");
  };

  const handleNavigateToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styled.container}>
      <SVGnonAuthorizedLady />
      <Text style={styled.upperText}>
        Registre-se ou faça login em sua conta para ter acesso a
        <Text style={styled.boldText}> {pageName}.</Text>
      </Text>
      <Button
        aditionalStyle={styled.enterButton}
        title="Entrar"
        onPress={handleNavigateToLogin}
        backgroundColor={theme.colors.primaryColor}
        borderColor="transparent"
        textColor={theme.colors.white}
      />
      <View style={styled.lowerContainer}>
        <Text style={styled.lowerText}> Não tem uma conta? </Text>

        <TouchableOpacity onPress={handleNavigateToSignUp}>
          <Text style={styled.signInText}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styled = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: "20@s",
  },
  upperText: {
    fontFamily: theme.fonts.fontPoppinsRegular,
    fontSize: "12@s",
    color: theme.colors.black,
    textAlign: "center",
    marginTop: "10@s",
  },
  lowerText: {
    fontFamily: theme.fonts.fontPoppinsRegular,
    fontSize: "12@s",
    color: theme.colors.grey3,
    textAlign: "center",
    marginTop: "5@s",
  },
  boldText: {
    fontFamily: theme.fonts.fontPoppinsBold,
  },
  signInText: {
    fontFamily: theme.fonts.fontPoppinsMedium,
    fontSize: "12@s",
    color: theme.colors.quaternaryColor,
    textAlign: "center",
    marginTop: "5@s",
  },
  enterButton: {
    height: "38@s",
    width: "80%",
    marginTop: "25@s",
  },
  lowerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "25@s",
    gap: "15@s",
  },
});
