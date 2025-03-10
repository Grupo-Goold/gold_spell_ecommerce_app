import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { Button } from "../../../components/Button/Button";
import { Input } from "../../../components/Input/Input";
import { theme } from "../../../global/styles/theme";
import useKeyboardVisibility from "../../../hooks/useKeyboardVisibility";
import RetangleCheckout from "../../../images/svg/RetangleCheckout";
import SafeEnvironment from "../../../images/svg/SafeEnvironment";
import { SVGgoBackIcon } from "../../../images/svg/SVGgoBackIcon";
import useCartFormStore from "../../../store/cartFormStore";
import useCartStore from "../../../store/cartStore";
import { formatCpfCnpj, formatPhone, formatValue } from "../../../utils/format";
import { velidateDocument } from "../../../utils/validate";

export const Step1Info = () => {
  const navigation = useNavigation();
  const { totalCart } = useCartStore();
	const { formData, setFormData } = useCartFormStore();
  const isKeyboardVisible = useKeyboardVisibility();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
			name: formData.customer.name,
			document: formData.customer.document,
			email: formData.customer.email,
			phone: formData.customer.phone,
		},
  });

  const onSubmit = (data) => {
		setFormData({
			customer: {
				name: data.name,
				document: data.document,
				email: data.email,
				phone: data.phone?.replace(/\D/g, ''),
			},
		});

    navigation.navigate('Step2Delivery')
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
            <RetangleCheckout color={"#000000"} />
          </View>
          <View style={styled.screens}>
            <Text>Pagamento</Text>
            <RetangleCheckout color={"#000000"} />
          </View>
        </View>


        <View style={styled.container}>
          <Controller
            control={control}
            rules={{
              required: "O nome é obrigatório",
            }}
            render={({ field }) => (
              <Input
                value={field.value}
                errorMessage={errors.name?.message}
                isError={errors.name?.message}
                placeholder="Inseira seu nome"
                label="Nome completo"
                onChangeText={(value) => field.onChange(value)}
                containerStyle={styled.input}
                required
              />
            )}
            name="name"
          />
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
              <Input
                value={field.value}
                errorMessage={errors.document?.message}
                isError={errors.document?.message}
                placeholder="Insira o documento"
                label="CPF ou CNPJ"
                onChangeText={(value) => {
                  field.onChange(formatCpfCnpj(value));
                  if (value.length == 14 || value.length == 18) {
                    velidateDocument(value, setError, clearErrors);
                  }
                }}
                containerStyle={styled.input}
                required
                keyboardType={"numeric"}
              />
            )}
            name="document"
          />
          <Controller
            control={control}
            rules={{
              required: "O e-mail é obrigatório",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "E-mail inválido!",
              },
            }}
            render={({ field }) => (
              <Input
                value={field.value}
                errorMessage={errors.email?.message}
                isError={errors.email?.message}
                placeholder="Insira o e-mail"
                label="E-mail de contato"
                onChangeText={(value) => field.onChange(value)}
                containerStyle={styled.input}
                required
              />
            )}
            name="email"
          />
          <Controller
            control={control}
            rules={{
              required: "O número é obrigatório",
            }}
            render={({ field }) => (
              <Input
                value={field.value}
                errorMessage={errors.phone?.message}
                isError={errors.phone?.message}
                placeholder="Insira o número"
                label="Celular com DDD"
                onChangeText={(value) => {
                  field.onChange(formatPhone(value));
                }}
                containerStyle={styled.input}
                required
                keyboardType={"numeric"}
              />
            )}
            name="phone"
          />
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
            title="Prosseguir para entrega"
            type="submit"
            height={48}
            marginTop={20}
            backgroundColor={theme.colors.primaryColor}
            borderColor="transparent"
            textColor={theme.colors.white}
            onPress={handleSubmit(onSubmit)}
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
