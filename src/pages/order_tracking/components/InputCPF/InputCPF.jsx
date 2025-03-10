import { Controller, useForm } from "react-hook-form";
import { TextInput, TouchableOpacity, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

import { theme } from "../../../../global/styles/theme";
import Biometrics from "../../../../images/svg/SVGBiometrics";
import Search from "../../../../images/svg/SVGSearch";
import { getShipmentsByDocument } from "../../../../services/shipments/getShipmentsByDocument";
import { formatCpfCnpj } from "../../../../utils/format";
import { velidateDocument } from "../../../../utils/validate";

const InputCPF = ({ setIsLoading, setShipments }) => {
  const { control, handleSubmit, setError, clearErrors } = useForm();

  const onSubmit = async (data) => {
    const document = data.document.replace(/\D/g, "");
    const shipments = await getShipmentsByDocument({ document, setIsLoading });
    setShipments(shipments);
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
