import { useContext } from "react";
import { View, Modal, TouchableOpacity, Text } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

import XCheckout from "../../../../../images/svg/XCheckout";

import { theme } from "../../../../../global/styles/theme";
import { Button } from "../../../../../components/Button/Button";

export const DeniedModal = ({
  isVisible,
  onClose,
  handleSubmit,
  onSubmit,
  watch,
  totalValue,
}) => {
  const GeneratePix = async () => {
    setResetTimer((prev) => !prev);
    await handleSubmit(onSubmit)();
    setDeniedModalVisible(false);
  };

  const formatMoney = (value) => {
    const valueWithTwoDecimalPlaces = parseFloat(value);

    const formattedValue = valueWithTwoDecimalPlaces?.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return formattedValue;
  };

  const calculateInstallments = () => {
    if (watch("plot") > "1") {
      const juros = 0.0314;
      const parcelaBase = totalValue / watch("plot") + totalValue * juros;
      const valorArredondado = Math.ceil(parcelaBase);

      return `${watch("plot")}x ${formatMoney(valorArredondado)}`;
    } else {
      return `${formatMoney(totalValue)}`;
    }
  };

  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styled.overlay} onPress={onClose}>
        <View
          style={styled.modalContent}
          onStartShouldSetResponder={() => true} // Captura o evento de toque
          onTouchEnd={(event) => event.stopPropagation()} // Evita propagação
        >
          <View style={styled.header}>
            <XCheckout />
            <Text style={styled.modalTitle}>
              {paymentType == "card"
                ? "Compra não autorizada"
                : "Tempo expirado"}
            </Text>
          </View>
          <View style={styled.contentContainer}>
            <View style={styled.metodContainer}>
              <Text style={styled.title}>Método de pagamento</Text>
              <Text style={styled.text}>
                {paymentType == "card" ? "Cartão de crédito" : "PIX"}
              </Text>
            </View>
            <View style={styled.valueContainer}>
              <Text style={styled.valueTitle}>Valor</Text>
              <View style={styled.valueView}>
                <Text style={styled.valueText}>{calculateInstallments()}</Text>
                {watch("plot") > "1" && (
                  <Text style={styled.juro}>COM JUROS</Text>
                )}
              </View>
            </View>
            <View style={styled.buttonContainer}>
              <Button
                title={
                  paymentType == "card"
                    ? "Tentar outro método"
                    : "Gerar PIX novamente "
                }
                type="submit"
                height={44}
                backgroundColor={theme.colors.primaryColor}
                borderColor="transparent"
                textColor={theme.colors.white}
                onPress={() => {
                  if (paymentType == "card") {
                    setDeniedModalVisible(false);
                  } else {
                    GeneratePix();
                  }
                }}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styled = ScaledSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000CC",
  },
  modalContent: {
    width: "90%",
    backgroundColor: theme.colors.white,
    borderRadius: "20@s",
    borderWidth: 1,
    borderColor: theme.colors.grey0,
    paddingBottom: "10@s",
  },

  header: {
    alignItems: "center",
    gap: "12@s",
    padding: "20@s",
  },
  modalTitle: {
    fontSize: "16@s",
    color: theme.colors.black,
    fontFamily: theme.fonts.fontPoppinsMedium,
    textAlign: "center",
  },

  contentContainer: {
    paddingHorizontal: "20@s",
    gap: "10@s",
  },

  metodContainer: {
    borderTopWidth: 1,
    borderColor: theme.colors.grey0,
    paddingTop: "10@s",
  },

  title: {
    fontSize: "13@s",
    color: theme.colors.black,
    fontFamily: theme.fonts.fontPoppinsMedium,
  },
  text: {
    fontSize: "12@s",
    color: theme.colors.black,
    fontFamily: theme.fonts.fontPoppinsRegular,
  },

  valueContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    borderTopWidth: "1@s",
    borderStyle: "dashed",
    borderColor: theme.colors.grey0,
    paddingTop: "10@s",
  },
  valueTitle: {
    fontSize: "14@s",
    color: theme.colors.black,
    fontFamily: theme.fonts.fontPoppinsRegular,
  },
  valueView: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: "3@s",
  },
  valueText: {
    fontSize: "16@s",
    color: theme.colors.black,
    fontWeight: "600",
  },
  juro: {
    fontSize: "9@s",
    color: theme.colors.black,
    fontFamily: theme.fonts.fontPoppinsRegular,
  },

  buttonContainer: {
    borderTopWidth: "1@s",
    borderColor: theme.colors.grey0,
    paddingTop: "10@s",
  },
});

export default DeniedModal;
