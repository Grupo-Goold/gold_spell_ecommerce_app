import * as Clipboard from "expo-clipboard";
import { useEffect, useState } from "react";
import { ActivityIndicator, Animated, Image, Text, TouchableOpacity, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import Toast from "react-native-toast-message";
import Copy from "../../../../images/svg/Copy";
import { formatTime } from "../../../../utils/format";
import useCartFormStore from "../../../../store/cartFormStore";
import useCartStore from "../../../../store/cartStore";
import useFreightStore from "../../../../store/freightStore";
import { theme } from "../../../../global/styles/theme";

export const PixForm = ({
  isLoading,
	dataPix,
	setDataPix,
	setIsOpenErrorModal,
	handlePayment
}) => {
  const { formData } = useCartFormStore();
	const { totalCart } = useCartStore();
	const { freightData } = useFreightStore();
	const [timeLeft, setTimeLeft] = useState(420);

  const CopyCode = () => {
    Clipboard.setStringAsync(dataPix?.qr_code);
    Toast.show({
      type: "sucessoToast",
      text1: "Código copiado com sucesso!",
    });
  };

	useEffect(() => {
		if (!dataPix?.expires_at) return;

		const dateProvided = new Date(dataPix.expires_at).getTime();
		const currentDate = new Date().getTime();
		const timeDifference = Math.max(dateProvided - currentDate, 0);

		setTimeLeft(Math.floor(timeDifference / 1000));

		const timer = setInterval(() => {
			setTimeLeft((prev) => {
				if (prev <= 1) {
					clearInterval(timer);
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(timer);
	}, [dataPix?.expires_at]);

	useEffect(() => {
		if (timeLeft <= 0) {
			setIsOpenErrorModal(true);
			setDataPix(null);
		}
	}, [timeLeft]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>O tempo para você pagar acabar em:</Text>
      <Text style={[styles.text, styles.time]}>{formatTime(timeLeft)}</Text>
      <View style={styles.barTimeContainer}>
        <Animated.View style={[styles.barTime, { width: `${(timeLeft / 420) * 100}%` }]} />
      </View>
      <View style={styles.QRContainer}>
        {dataPix && (
          <Image source={{ uri: dataPix?.qr_code_url }} style={styles.QR} />
        )}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.primaryColor} />
          </View>
        )}
      </View>
      <Text style={styles.textS}>
        Escaneie o QR Code ou copie o código abaixo, cole em seu banco
      </Text>
      {dataPix && (
        <TouchableOpacity style={styles.codeContainer} onPress={CopyCode}>
          <Text style={styles.code}>{dataPix?.qr_code}</Text>
          <Copy />
        </TouchableOpacity>
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
  },
  QR: {
    width: "100%",
    height: "100%",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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

  barTimeContainer: {
    width: "80%",
    height: "5@s",
    backgroundColor: theme.colors.grey0,
  },
  barTime: {
    height: "5@s",
    backgroundColor: theme.colors.primaryColor,
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
});
