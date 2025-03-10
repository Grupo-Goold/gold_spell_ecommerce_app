import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import useKeyboardVisibility from "../../../hooks/useKeyboardVisibility";
import RetangleCheckout from "../../../images/svg/RetangleCheckout";
import SafeEnvironment from "../../../images/svg/SafeEnvironment";
import { SVGgoBackIcon } from "../../../images/svg/SVGgoBackIcon";
import useCartFormStore from "../../../store/cartFormStore";
import useCartStore from "../../../store/cartStore";
import { theme } from "../../../global/styles/theme";
import { Button } from "../../../components/Button/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SwitchPayment } from "./components/SwitchPayment";
import { PixForm } from "./components/PixForm";
import { BoletoForm } from "./components/BoletoForm";
import { CreditCardForm } from "./components/CreditCardForm";
import { apiOrders } from "../../../services/api";
import { useNavigation } from "@react-navigation/native";

export const Step3Payment = () => {
  const navigation = useNavigation();
  const { productsInCart, totalCart, resetCart } = useCartStore();
	const { formData } = useCartFormStore();
  const isKeyboardVisible = useKeyboardVisibility();
	const [isLoading, setIsLoading] = useState(false);
	const [typePayment, setTypePayment] = useState('credit_card');
	const [orderId, setOrderId] = useState();
	const [webSocktData, setWebSocktData] = useState();
	const [dataPix, setDataPix] = useState(null);
	const [dataBoleto, setDataBoleto] = useState(null);
	const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false);
	const [isOpenErrorModal, setIsOpenErrorModal] = useState(false);

	const handlePaymentUpdate = (data) => {
		if (data.status === 'paid') {
			setWebSocktData(data);
			setIsOpenSuccessModal(true);
			sessionStorage?.removeItem('@itensInCart');
			resetModal();
			localStorage.removeItem('@order');
		}
	};

	const handlePayment = async (type) => {
		const items = productsInCart?.map((product) => ({
			id: product.id,
			quantity: product.quantity,
			category: product.category,
		}));

		const dataPayment = {
			...formData,
			sales_channel: 'mobile',
			items: items,
			influencerId: AsyncStorage.getItem('influencerId') || '',
			payment_method: type,
		};

		try {
			setIsLoading(true);

			const response = await apiOrders.post('/checkout', dataPayment);

			if (dataPayment.payment_method === 'pix') {
        AsyncStorage.setItem(
          "@order_id",
          JSON.stringify(response.data.pix.order_id)
        );
				setOrderId(response.data.pix.order_id);
				setDataPix(response?.data?.pix);
			} else if (dataPayment.payment_method === 'boleto') {
				setDataBoleto(response?.data?.boleto);
				setOrderId(response.data.boleto.order_id);
        AsyncStorage.setItem(
          "@order_id",
          JSON.stringify(response.data.boleto.order_id)
        );
			}
		} catch (error) {
			console.log(error);
			sendToast('error', error?.response?.data?.message);
		} finally {
			setIsLoading(false);
		}
	};

	const createPayment = (type) => {
		if (type === 'pix' && !dataPix) handlePayment('pix');
		if (type === 'boleto' && !dataBoleto) handlePayment('boleto');
		setTypePayment(type);
	};

	const resetModal = () => {
		setDataPix(null);
		setDataBoleto(null);
		resetStep();
		setTypePayment('credit_card');
	};

  return (
    <View style={styled.pageContainer}>
      <View style={styled.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styled.close}
        >
          <SVGgoBackIcon />
        </TouchableOpacity>
        <View>
          <Text style={styled.title}>Checkout rápido</Text>
        </View>
        <View style={styled.safeContainer}>
          <SafeEnvironment />
        </View>
      </View>
      <ScrollView
        style={[
          styled.main,
          isKeyboardVisible && styled.mainKeyboard
        ]}
        contentContainerStyle={styled.scroll}
      >
        <View style={styled.screensContainer}>
          <View style={styled.screens}>
            <Text>Informações</Text>
            <RetangleCheckout color={"#CBC698"} />
          </View>
          <View style={styled.screens}>
            <Text>Entrega</Text>
            <RetangleCheckout color={"#CBC698"} />
          </View>
          <View style={styled.screens}>
            <Text>Pagamento</Text>
            <RetangleCheckout color={"#CBC698"} />
          </View>
        </View>

        <View>
            <SwitchPayment
              typePayment={typePayment}
              createPayment={createPayment}
            />
            {typePayment == "credit_card" && (
              <CreditCardForm />
            )}
            {typePayment == "pix" && (
              <PixForm
                isLoading={isLoading}
                dataPix={dataPix}
                setDataPix={setDataPix}
                setIsOpenErrorModal={setIsOpenErrorModal}
                handlePayment={handlePayment}
              />
            )}
            {typePayment == "boleto" && (
              <BoletoForm 
                isLoading={isLoading}
                dataBoleto={dataBoleto}
                resetModal={resetModal}
              />
            )}
        </View>
      </ScrollView>
    </View>
  );
};

const styled = ScaledSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: theme.colors.white,
    position: "relative",
  },
  header: {
    width: "100%",
    height: "85@s",
    flexDirection: "row",
    alignItems: "center",
    gap: "30@s",
    justifyContent: "flex-end",
    borderWidth: 1,
    borderColor: theme.colors.grey0,
    paddingTop: "27@s",
    paddingLeft: "150@s",
    position: "relative",
  },
  close: {
    position: "absolute",
    left: "10@s",
    top: "40@s",
  },
  title: {
    fontSize: "17@s",
    color: theme.colors.black,
    fontFamily: theme.fonts.fontPoppinsMedium,
  },
  safeContainer: {
    width: "110@s",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    gap: "15@s",
  },
  main: {
    flex: 1,
    padding: "25@s",
    marginBottom: "180@s",
  },
  mainKeyboard: {
    marginBottom: "0@s",
  },
  mainPix: {
    flex: 1,
    padding: "25@s",
    marginBottom: "104@s",
  },
  scroll: {
    paddingBottom: "50@s",
  },
  screensContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "22@s",
    marginBottom: "30@s",
  },
  screens: {
    alignItems: "center",
    justifyContent: "center",
    gap: "9@s",
  },

  footerContainer: {
    width: "100%",
    padding: "25@s",
    borderWidth: "1@s",
    gap: "15@s",
    borderColor: theme.colors.grey0,
    borderTopLeftRadius: "20@s",
    borderTopRightRadius: "20@s",
    position: "absolute",
    bottom: "0@s",
    backgroundColor: theme.colors.white,
  },
  lineFooter: {
    width: "100%",
    flexDirection: "row",
    gap: "10@s",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontWeight: "600",
  },
  lineTotalFooter: {
    width: "100%",
    flexDirection: "row",
    gap: "10@s",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
