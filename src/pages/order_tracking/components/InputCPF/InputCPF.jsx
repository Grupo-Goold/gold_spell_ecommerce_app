import { TextInput, View, TouchableOpacity } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { Controller, useForm } from "react-hook-form";

import Biometrics from "../../../../images/svg/SVGBiometrics";
import Search from "../../../../images/svg/SVGSearch";
import { theme } from "../../../../global/styles/theme";
import { useOrderTrackingContextHook } from "../../../../contexts/orderTrackingContext/OrderTrackingContext";
import { velidateDocument } from "../../../../utils/validate";
import { formatCpfCnpj } from "../../../../utils/format";

const InputCPF = ({ setIsLoading }) => {
  const { control, handleSubmit, setError, clearErrors } = useForm();

  const { getShipmentsByDocument } = useOrderTrackingContextHook();

  const onSubmit = (data) => {
    const document = data.document.replace(/\D/g, "");
    getShipmentsByDocument({ document, setIsLoading });
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <Biometrics style={styles.biometrics} />
        <Controller
          control={control}
          rules={{
            required: "O documento é obrigatório",
            minLength: {
              value: 14,
              message: "Mínimo 14 caracteres!",
            },
            maxLength: {
              value: 18,
              message: "Máximo 18 caracteres!",
            },
          }}
          render={({ field }) => (
            <TextInput
              style={styles.input}
              placeholder="Insira seu documento"
              value={field.value}
              onChangeText={(value) => {
                field.onChange(formatCpfCnpj(value));
                if (value.length == 14 || value.length == 18) {
                  velidateDocument(value, setError, clearErrors);
                }
              }}
              keyboardType={"numeric"}
            />
          )}
          name="document"
        />
      </View>
      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <Search />
      </TouchableOpacity>
    </View>
  );
};
const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "20@s",
  },
  containerInput: {
    width: "85%",
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
});

export default InputCPF;
