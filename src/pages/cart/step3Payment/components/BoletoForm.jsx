import { addDays, isSaturday, isSunday } from "date-fns";
import * as Clipboard from "expo-clipboard";
import { useEffect } from "react";
import { ActivityIndicator, Linking, Text, TouchableOpacity, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import Toast from "react-native-toast-message";
import { Button } from "../../../../components/Button/Button";
import { theme } from "../../../../global/styles/theme";
import Copy from "../../../../images/svg/Copy";
import useCartFormStore from "../../../../store/cartFormStore";
import useCartStore from "../../../../store/cartStore";
import useFreightStore from "../../../../store/freightStore";
import { formatDateBoleto } from "../../../../utils/format";

export const BoletoForm = ({ isLoading, dataBoleto, resetModal }) => {
	const { formData } = useCartFormStore();
	const { productsInCart, totalCart, resetCart } = useCartStore();
	const { freightData } = useFreightStore();

  const CopyCode = () => {
    Clipboard.setStringAsync(dataBoleto?.line);
    Toast.show({
      type: "sucessoToast",
      text1: "Código copiado com sucesso!",
    });
  };

  const openBrowser = async () => {
    if (dataBoleto) {
      try {
        const supported = await Linking.canOpenURL(dataBoleto.pdf);
        if (supported) {
          await Linking.openURL(dataBoleto.pdf);
        } else {
          Toast.show({
            type: "error",
            text1: "Não foi possível abrir o URL:",
            text2: dataBoleto.pdf,
          });
        }
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Não foi possível abrir o URL:",
          text2: error,
        });
      }
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={[styles.text]}>
        O prazo máximo para o pagamento aparecer na sua conta é de 2 dias úteis.
      </Text>
      {dataBoleto && (
        <>
          <Text style={[styles.text, styles.time]}>
            Pague até {formatDateBoleto(dataBoleto?.due_at)}
          </Text>
          <Text style={[styles.textS]}>
            Copiar linha digitável abaixo ou baixe o boleto
          </Text>
          <TouchableOpacity style={styles.codeContainer} onPress={CopyCode}>
            <Text style={styles.code}>{dataBoleto?.line}</Text>
            <Copy />
          </TouchableOpacity>
          <Button
            title="Ver Boleto"
            type="submit"
            width="100%"
            height={44}
            marginTop={20}
            backgroundColor={theme.colors.primaryColor}
            borderColor="transparent"
            textColor={theme.colors.white}
            onPress={openBrowser}
          />
        </>
      )}
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primaryColor} />
        </View>
      )}
    </View>
  );
};

export const styles = ScaledSheet.create({
  container: {
    gap: "15@s",
    alignItems: "center",
  },

  QRContainer: {
    width: "200@s",
    height: "200@s",
    borderWidth: "1@s",
    borderColor: theme.colors.grey0,
    borderRadius: "8@s",
    padding: "15@s",
  },

  text: {
    textAlign: "center",
    fontSize: "14@s",
  },
  textS: {
    textAlign: "center",
    fontSize: "12@s",
  },
  time: {
    fontSize: "18@s",
    fontWeight: "700",
  },

  codeContainer: {
    width: "100%",
    maxWidth: "100%",
    borderWidth: "1@s",
    borderColor: theme.colors.grey0,
    borderRadius: "8@s",
    padding: "15@s",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "10@s",
  },
  code: {
    width: "90%",
  },

  loadingContainer: { marginTop: "20@s" },
});
