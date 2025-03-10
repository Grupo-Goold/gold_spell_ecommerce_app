import { Text, TouchableOpacity, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { theme } from "../../../../global/styles/theme";

export const SwitchPayment = ({ typePayment, createPayment }) => {
  return (
    <View style={styled.container}>
      <TouchableOpacity
        style={typePayment == "credit_card" ? styled.optionSelect : styled.option}
        onPress={() => {
          createPayment("credit_card");
        }}
      >
        <Text style={typePayment == "credit_card" ? styled.textSelect : styled.text}>
          Cartão
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={typePayment == "pix" ? styled.optionSelect : styled.option}
        onPress={() => {
          createPayment("pix");
        }}
      >
        <Text style={typePayment == "pix" ? styled.textSelect : styled.text}>
          Pix
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={typePayment == "boleto" ? styled.optionSelect : styled.option}
        onPress={() => {
          createPayment("boleto");
        }}
      >
        <Text style={typePayment == "boleto" ? styled.textSelect : styled.text}>
          Boleto
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styled = ScaledSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: "1@s",
    borderColor: theme.colors.grey0,
    borderRadius: "100@s",
    padding: "5@s",
    marginBottom: "30@s",
  },
  optionSelect: {
    width: "33%",
    height: "35@s",
    backgroundColor: theme.colors.primaryColor,
    borderRadius: "100@s",
    alignItems: "center",
    justifyContent: "center",
  },
  textSelect: {
    color: theme.colors.white,
    textAlign: "center",
    fontWeight: "500",
  },
  option: {
    width: "33%",
    height: "35@s",
    backgroundColor: theme.colors.white,
    borderRadius: "100@s",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    fontWeight: "500",
  },
});
