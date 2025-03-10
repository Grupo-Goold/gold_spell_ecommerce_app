import { Text, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { theme } from "../../../../../global/styles/theme";
import Biometrics from "../../../../../images/svg/SVGBiometrics";
import MaskInput, { Masks } from "react-native-mask-input";

const InputCPF = ({ value, onChange, errors }) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <Biometrics style={styles.biometrics} />
        <MaskInput
          mask={Masks.BRL_CPF}
          value={value}
          onChangeText={onChange}
          placeholder="Insira seu CPF"
          style={styles.input}
        />
      </View>
      {errors.cpf && (
        <Text style={styles.errorMessage}>{errors.cpf?.message}</Text>
      )}
    </View>
  );
};
const styles = ScaledSheet.create({
  container: {
    width: "100%",
  },
  containerInput: {
    width: "100%",
    height: "45@s",
    borderColor: theme.colors.grey0,
    borderWidth: "1@s",
    borderRadius: "20@s",
    justifyContent: "center",
  },
  input: {
    width: "90%",
    borderWidth: 1,
    borderWidth: "0@s",
    paddingLeft: "45@s",
    fontFamily: theme.fonts.fontPoppinsRegular,
  },
  biometrics: {
    position: "absolute",
    left: "15@s",
  },

  errorMessage: {
    fontFamily: theme.fonts.fontPoppinsRegular,
    fontSize: "12@s",
    color: theme.colors.red0,
  },
});

export default InputCPF;
