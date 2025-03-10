import { Text, TouchableOpacity, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { theme } from "../../../../global/styles/theme";


const SwitchDelivery = ({ isKiosk, setIsKiosk }) => {
  return (
    <View style={styled.container}>
      <TouchableOpacity
        style={!isKiosk ? styled.optionSelect : styled.option}
        onPress={() => {
          setIsKiosk(false);
        }}
      >
        <Text style={!isKiosk ? styled.textSelect : styled.text}>
          Receber em casa
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={isKiosk ? styled.optionSelect : styled.option}
        onPress={() => {
          setIsKiosk(true);
        }}
      >
        <Text
          style={isKiosk ? styled.textSelect : styled.text}
        >
          Retirar no shopping
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
  },
  optionSelect: {
    width: "50%",
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
    width: "50%",
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

export default SwitchDelivery;
