import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";

import RetangleCheckout from "../../../images/svg/RetangleCheckout";
import SafeEnvironment from "../../../images/svg/SafeEnvironment";
import { SVGgoBackIcon } from "../../../images/svg/SVGgoBackIcon";

import { Button } from "../../../components/Button/Button";
import InputField from "../../../components/InputField";
import { theme } from "../../../global/styles/theme";
import useKeyboardVisibility from "../../../hooks/useKeyboardVisibility";
import useCartFormStore from "../../../store/cartFormStore";
import useCartStore from "../../../store/cartStore";
import useFreightStore from "../../../store/freightStore";
import { formatValue } from "../../../utils/format";
import api, { apiOrders } from "../../../services/api";
import Toast from "react-native-toast-message";
import { SelectKiosk } from "./components/SelectKiosk";
import SwitchDelivery from "./components/SwitchDelivery";
import { ToggleIsSavedAddres } from "./components/ToggleIsSavedAddres";
import { ListSavedAddresses } from "./components/ListSavedAddresses";
import useAddressesStore from "../../../store/addressesStore";

export const Step2Delivery = () => {
  const navigation = useNavigation();
  const { formData, setFormData } = useCartFormStore();
	const { productsInCart, totalCart } = useCartStore();
	const { setFreightData, freightData } = useFreightStore();
	const { addAddress } = useAddressesStore();
  const isKeyboardVisible = useKeyboardVisibility();

  const [isKiosk, setIsKiosk] = useState(formData.isKiosk);
  const [selectedKiosk, setSelectedKiosk] = useState(null);
  const [isSavedAddresses, setIsSavedAddresses] = useState(true);
	const [selectedAddress, setSelectedAddress] = useState(null);
  const [saveNewAddress, setSaveNewAddress] = useState(false);
	const [addressFieldsDisabled, setAddressFieldsDisabled] = useState({
		neighborhood: false,
		line_1: false,
		city: false,
		state: false,
	});

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
		defaultValues: {
			zip_code: formData.address.zip_code,
			city: formData.address.city,
			state: formData.address.state,
			neighborhood: formData.address.neighborhood,
			line_1: formData.address.line_1,
			number: formData.address.number,
			complement: formData.address.complement,
		},
	});

  const handleCepChange = useCallback(async (cep) => {
		if (cep?.length === 8) {
			const addressData = await api
				.get(`https://viacep.com.br/ws/${cep}/json/`)
				.then((res) => {
					return res.data;
				});

			try {
				const body = {
					productIds: productsInCart.map((elem) => {
						return { id: elem.id, quantity: elem.quantity };
					}),
					cepDestino: cep,
				};

				const response = await apiOrders.post(
					`/correios/shipping/calculate`,
					body,
				);

				setFreightData(response.data);
			} catch (error) {
				console.log(error);
			}

			if (addressData && addressData.cep) {
				setValue(
					'neighborhood',
					addressData.bairro || formData.address.neighborhood,
				);
				setValue('line_1', addressData.logradouro || formData.address.line_1);
				setValue('state', addressData.uf || '');
				setValue('city', addressData.localidade || '');

				setAddressFieldsDisabled({
					neighborhood: !!addressData.bairro,
					line_1: !!addressData.logradouro,
					city: !!addressData.localidade,
					state: !!addressData.uf,
				});
			} else {
				setValue('neighborhood', '');
				setValue('line_1', '');
				setValue('state', '');
				setValue('city', '');

				setFreightData({
					codeService: [],
					deadline: '',
					price: 'R$ 0,00',
					priceNumber: 0,
					services: 'R$ 0,00',
				});

				setAddressFieldsDisabled({
					neighborhood: false,
					line_1: false,
					city: false,
					state: false,
				});
			}
		}
	}, []);

	useEffect(() => {
		const cep = watch('zip_code');
		handleCepChange(cep);
	}, [watch('zip_code')]);

  const onSubmit = async (data) => {
    if (isSavedAddresses) {
      if(selectedAddress === null) {
        Toast.show({
          type: 'erroToast',
          text1: 'Selecione um endereço',
          visibilityTime: 3000,
        });
        return;
      }
      setFormData({
        isKiosk: false,
        address: selectedAddress,
      });
    } else {
      if(saveNewAddress){
        addAddress(data)
      }
      
      setFormData({
        isKiosk: false,
        address: data,
      });
    }


    navigation.navigate('Step3Payment')
  };

  const handleContinue = () => {
		if (isKiosk) {
			if (selectedKiosk === null) {
        Toast.show({
          type: 'erroToast',
          text1: 'Selecione um quiosque',
          visibilityTime: 3000,
        });
			} else {
				setFormData({
					isKiosk: true,
					kioskId: selectedKiosk.id,
					kiosk_name: selectedKiosk.kiosk_name,
				});

        navigation.navigate('Step3Payment')
			}
		} else {
			handleSubmit(onSubmit)();
		}
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
          <RetangleCheckout color={"#000000"} />
        </View>
      </View>

      <View style={styled.container}>
        <SwitchDelivery
          isKiosk={isKiosk}
          setIsKiosk={setIsKiosk}
        />
        {isKiosk ? (
            <SelectKiosk
              selectedKiosk={selectedKiosk}
              setSelectedKiosk={setSelectedKiosk}
            />
          ) : (
            <>
              <ToggleIsSavedAddres isSavedAddresses={isSavedAddresses} setIsSavedAddresses={setIsSavedAddresses}/>
              {isSavedAddresses ? (
                <ListSavedAddresses selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} />
              ) : (
                <View style={styled.homeContainer}>
                  <View style={styled.checkBoxRow}>
                    <TouchableOpacity 
                      style={[
                        styled.checkboxContainer, 
                        saveNewAddress && styled.checkboxChecked
                      ]}
                      onPress={() => setSaveNewAddress(!saveNewAddress)}
                    >
                      {saveNewAddress && (
                        <Text style={styled.checkMark}>✓</Text>
                      )}
                    </TouchableOpacity>
                    <Text>
                      Salvar este endereço para compras futuras
                    </Text>
                  </View>

                  <InputField
                    control={control}
                    rules={{
                      required: 'Campo obrigatório',
                    }}
                    name="address_name"
                    label="Identificação do endereço"
							      placeholder="Casa, trabalho, etc."
                    disabled={addressFieldsDisabled.address_name}
                    error={errors.address_name}
                  />
                  
                  <InputField
                    control={control}
                    rules={{
                      required: 'Campo obrigatório',
                      validate: async (value) => {
                        if (value.length !== 8) {
                          return 'CEP deve ter exatamente 8 dígitos';
                        }
        
                        const addressData = await api
                          .get(`https://viacep.com.br/ws/${value}/json/`)
                          .then((res) => {
                            return res.data;
                          });
        
                        if (!addressData || !addressData.cep) {
                          return 'CEP inválido';
                        }
        
                        return true;
                      },
                    }}
                    name="zip_code"
                    label="CEP*"
                    placeholder="Insira o CEP"
                    error={errors.zip_code}
                  />

                  <InputField
                    control={control}
                    rules={{
                      required: 'Campo obrigatório',
                    }}
                    name="state"
                    label="Estado*"
                    placeholder="Insira o estado"
                    disabled={addressFieldsDisabled.state}
                    error={errors.state}
                  />

                  <InputField
                    control={control}
                    rules={{
                      required: 'Campo obrigatório',
                    }}
                    name="city"
                    label="Cidade*"
                    placeholder="Insira a cidade"
                    disabled={addressFieldsDisabled.city}
                    error={errors.city}
                  />

                  <InputField
                    control={control}
                    rules={{
                      required: 'Campo obrigatório',
                    }}
                    name="neighborhood"
                    label="Bairro*"
                    placeholder="Insira o bairro"
                    disabled={addressFieldsDisabled.neighborhood}
                    error={errors.neighborhood}
                  />

                  <InputField
                    control={control}
                    rules={{
                      required: 'Campo obrigatório',
                    }}
                    name="line_1"
                    label="Rua*"
                    placeholder="Insira o endereço"
                    disabled={addressFieldsDisabled.line_1}
                    error={errors.line_1}
                  />

                  <InputField
                    control={control}
                    rules={{
                      required: 'Campo obrigatório',
                    }}
                    name="number"
                    label="Número*"
                    placeholder="Insira o número"
                    disabled={addressFieldsDisabled.number}
                    error={errors.number}
                  />

                  <InputField
                    control={control}
                    rules={{
                      required: 'Campo obrigatório',
                    }}
                    name="complement"
                    label="Complemento*"
                    placeholder="Insira o complemento"
                    disabled={addressFieldsDisabled.complement}
                    error={errors.complement}
                  />
                </View>
              )}
            </>
          )}
          </View>

      </ScrollView>
      {!isKeyboardVisible && (
        <View style={styled.footerContainer}>
          <View style={styled.lineFooter}>
            <Text>Frete</Text>
            <Text style={styled.price}>Próxima etapa</Text>
          </View>
          <View style={styled.lineTotalFooter}>
            <Text>Valor total</Text>
            <Text style={styled.price}>R$ {formatValue(totalCart)}</Text>
          </View>
            <Button
                title="Prosseguir para pagamento"
                type="submit"
                height={48}
                marginTop={20}
                backgroundColor={theme.colors.primaryColor}
                borderColor="transparent"
                textColor={theme.colors.white}
                onPress={handleContinue}
            />
        </View>
      )}
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
  main: {
    flex: 1,
    padding: "25@s",
    marginBottom: "180@s",
  },
  mainKeyboard: {
    flex: 1,
    padding: "25@s",
  },
  homeContainer: {
    gap: "15@s",
  },
  checkBoxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: "10@s",
    gap: "10@s",
  },
  checkboxContainer: {
    width: '24@s',
    height: '24@s',
    borderWidth: 1,
    borderColor: theme.colors.primaryColor,
    borderRadius: '99@s',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  checkboxChecked: {
    backgroundColor: theme.colors.primaryColor
  },
  checkMark: {
    color: theme.colors.white
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
  container: {
    gap: "15@s",
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
