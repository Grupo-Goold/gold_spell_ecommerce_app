import { useEffect, useState } from "react";
import { View, Modal, TouchableOpacity, Text, ScrollView } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";

import Check from "../../../../../images/svg/Check";

import { theme } from "../../../../../global/styles/theme";
import ProductCard from "../productCard/ProductCard";

export const ConfirmModal = ({ isVisible, onClose, watch, totalValue }) => {
  const navigation = useNavigation();
  const [currentDateTime, setCurrentDateTime] = useState("");

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

  const close = () => {
    onClose();
    navigation.navigate("ShoppingCart");
    setPixObj(undefined);
    setBoletoObj(undefined);
  };

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const daysOfWeek = [
        "Domingo",
        "Segunda-feira",
        "Terça-feira",
        "Quarta-feira",
        "Quinta-feira",
        "Sexta-feira",
        "Sábado",
      ];

      const formattedDate = now.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      const formattedTime = now.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const dayOfWeek = daysOfWeek[now.getDay()];

      setCurrentDateTime(`${formattedDate} às ${formattedTime} - ${dayOfWeek}`);
    };

    updateDateTime();
  }, []);

  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styled.modalContainer}>
        <TouchableOpacity style={styled.overlay} onPress={close} />
        <View style={styled.modalContent}>
          <View style={styled.header}>
            <Check />
            <Text style={styled.modalTitle}>
              Pedido confirmado com sucesso :)
            </Text>
          </View>
          <View style={styled.contentContainer}>
            <View style={styled.dataContainer}>
              <Text style={styled.title}>Data</Text>
              <Text style={styled.text}>{currentDateTime}</Text>
            </View>
            <View>
              <Text style={styled.title}>Método de pagamento</Text>
              <Text style={styled.text}>
                {paymentType == "card"
                  ? "Cartão de crédito"
                  : paymentType == "pix"
                    ? "PIX"
                    : "Boleto"}
              </Text>
            </View>
            <View>
              <View style={styled.deliveryContainer}>
                <Text style={styled.title}>Entrega</Text>
                {paymentType == "ticket" && (
                  <Text style={styled.span}>
                    Somente após a confirmação do pagamento
                  </Text>
                )}
              </View>
              <Text style={styled.text}>
                <Text style={styled.frete}>Frete - 2 dias úteis: </Text>
                {watch("street")} nº {watch("number")},{watch("zip_code")}
              </Text>
            </View>
            <View>
              <Text style={styled.title}>Produtos</Text>
              <ScrollView
                style={styled.scroll}
                contentContainerStyle={styled.contentScroll}
              >
                {productsInCart.map((elm) => {
                  <ProductCard product={elm} />;
                })}
              </ScrollView>
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
            <View style={styled.obsContainer}>
              <Text style={styled.textObs}>
                <Text style={styled.titleObs}>Obs:</Text>A confirmação do pedido
                foi enviada por e-mail. Enviaremos atualizações até que seu
                pedido chegue na sua casa. ❤️
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styled = ScaledSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },

  modalContent: {
    flex: 1,
    width: "90%",
    maxHeight: "75%",
    backgroundColor: theme.colors.white,
    borderRadius: "20@s",
    borderWidth: 1,
    borderColor: theme.colors.grey0,
  },

  header: {
    alignItems: "center",
    gap: "10@s",
    paddingHorizontal: "20@s",
    paddingVertical: "10@s",
  },
  modalTitle: {
    fontSize: "18@s",
    color: theme.colors.black,
    fontFamily: theme.fonts.fontPoppinsMedium,
    textAlign: "center",
  },

  contentContainer: {
    flex: 1,
    paddingHorizontal: "20@s",
    gap: "5@s",
  },

  scroll: {
    height: "80@s",
  },
  contentScroll: {
    paddingVertical: "6@s",
    gap: "10@s",
  },

  dataContainer: {
    borderTopWidth: 1,
    borderColor: theme.colors.grey0,
    paddingTop: "8@s",
  },
  deliveryContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: "3@s",
  },

  title: {
    fontSize: "13@s",
    color: theme.colors.black,
    fontWeight: "600",
  },
  text: {
    fontSize: "11@s",
    color: theme.colors.black,
    fontFamily: theme.fonts.fontPoppinsRegular,
  },
  frete: {
    fontSize: "11@s",
    color: theme.colors.black,
    fontFamily: theme.fonts.fontPoppinsMedium,
  },
  span: {
    fontSize: "9@s",
    color: theme.colors.black,
  },

  valueContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    borderTopWidth: "1@s",
    borderStyle: "dashed",
    borderColor: theme.colors.grey0,
    paddingTop: "8@s",
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
    fontSize: "18@s",
    color: theme.colors.black,
    fontWeight: "600",
  },
  juro: {
    fontSize: "9@s",
    color: theme.colors.black,
    fontFamily: theme.fonts.fontPoppinsRegular,
  },

  obsContainer: {
    borderTopWidth: "1@s",
    borderColor: theme.colors.grey0,
    paddingVertical: "5@s",
  },
  titleObs: {
    fontSize: "11@s",
    color: theme.colors.black,
    fontFamily: theme.fonts.fontPoppinsMedium,
    textAlign: "center",
  },
  textObs: {
    fontSize: "11@s",
    color: theme.colors.black,
    fontFamily: theme.fonts.fontPoppinsRegular,
    textAlign: "center",
  },
});

export default ConfirmModal;
