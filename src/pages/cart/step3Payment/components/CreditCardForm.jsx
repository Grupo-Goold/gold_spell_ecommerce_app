import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { ScaledSheet } from "react-native-size-matters";
import { Input } from "../../../../components/Input/Input";
import { theme } from "../../../../global/styles/theme";
import CardFlag from "../../../../images/svg/CardFlag";
import CVCCard from "../../../../images/svg/CVCCard";
import useCartFormStore from "../../../../store/cartFormStore";
import useCartStore from "../../../../store/cartStore";
import useFreightStore from "../../../../store/freightStore";

export const CreditCardForm = () => {
	const { formData, setFormData } = useCartFormStore();
	const { productsInCart, totalCart } = useCartStore();
	const { freightData } = useFreightStore();

	const [isLoading, setIsLoading] = useState(false);
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

	const installments = () => {
		const juros = 0.0314; // Taxa de juros de 3.14%

		const total = formData.isKiosk
			? totalCart
			: totalCart + freightData.priceNumber;

		const parcelas = [];

		for (let i = 1; i <= 9; i++) {
			let parcelaBase = total / i;

			if (i > 1) {
				parcelaBase += total * juros;
			}

			parcelas.push({
				label: `${i}x ${formatMoney(parcelaBase.toFixed(2))} ${i === 1 ? 'sem juros' : 'com juros'}`,
				value: i,
			});
		}

		return parcelas;
	};

  const errorExist = () => {
    if (errors?.card || errors?.nameCard || errors?.date || errors?.code) {
      return true;
    }
    return false;
  };

  const errorFunction = () => {
    if (errors.card) {
      return errors.card.message;
    } else if (errors.nameCard) {
      return errors.nameCard.message;
    } else if (errors.date) {
      return errors.date.message;
    } else if (errors.code) {
      return errors.code.message;
    }
  };

  const formatCardNumber = (value) => {
    return value
      .replace(/\D/g, "") // Remove caracteres não numéricos
      .replace(/(\d{4})(?=\d)/g, "$1 ") // Adiciona um espaço a cada 4 dígitos
      .trim() // Remove espaços desnecessários
      .slice(0, 19); // Limita o número máximo de caracteres a 19 (16 dígitos + 3 espaços)
  };

  const formatDateMMYY = (value) => {
    return value
      .replace(/\D/g, "") // Remove caracteres não numéricos
      .replace(/^(\d{2})(\d{1,2})/, "$1/$2") // Adiciona a barra após os dois primeiros dígitos
      .slice(0, 5); // Limita a string a 5 caracteres no máximo (MM/AA)
  };

  const formatCVC = (value) => {
    return value
      .replace(/\D/g, "") // Remove caracteres não numéricos
      .slice(0, 3); // Limita a entrada a 4 dígitos
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <Text>Informações do cartão</Text>
        <View style={styles.containerInputs}>
          <Controller
            control={control}
            rules={{
              required: "O número é obrigatório",
              minLength: {
                value: 14,
                message: "Mínimo 14 caracteres!",
              },
              maxLength: {
                value: 19,
                message: "Máximo 19 caracteres!",
              },
            }}
            render={({ field }) => (
              <View style={styles.inputNameContainer}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Número do cartão"
                  value={field.value}
                  onChangeText={(value) =>
                    field.onChange(formatCardNumber(value))
                  }
                  isError={errors.document?.message}
                  keyboardType="numeric"
                />
                <CardFlag />
              </View>
            )}
            name="card"
          />
          <Controller
            control={control}
            rules={{
              required: "O nome é obrigatório",
            }}
            render={({ field }) => (
              <TextInput
                style={[styles.textInput, styles.inputCardName]}
                placeholder="Nome impresso no cartão"
                value={field.value}
                onChangeText={(value) => field.onChange(value)}
              />
            )}
            name="nameCard"
          />
          <View style={styles.dateCodeContainer}>
            <Controller
              control={control}
              rules={{
                required: "A data é obrigatória",
              }}
              render={({ field }) => (
                <TextInput
                  style={[
                    styles.textInput,
                    styles.dateCodeInput,
                    styles.dateInput,
                  ]}
                  placeholder="MM / AA"
                  value={field.value}
                  onChangeText={(value) =>
                    field.onChange(formatDateMMYY(value))
                  }
                  keyboardType="numeric"
                />
              )}
              name="date"
            />
            <Controller
              control={control}
              rules={{
                required: "O código é obrigatório",
              }}
              render={({ field }) => (
                <View style={styles.inputCVCContainer}>
                  <TextInput
                    style={[styles.textInput, styles.dateCodeInput]}
                    placeholder="CVC"
                    value={field.value}
                    onChangeText={(value) => field.onChange(formatCVC(value))}
                    keyboardType="numeric"
                  />
                  <CVCCard />
                </View>
              )}
              name="code"
            />
          </View>
        </View>
        {errorExist() && (
          <Text style={styles.errorMessage}>{errorFunction()}</Text>
        )}
      </View>
      <View style={styles.containerTitle}>
        <Text>Parcelamento</Text>
        <View style={styles.selectPicker}>
          <Controller
            control={control}
            rules={{
              required: "Selecione o parcelamento",
            }}
            render={({ field }) => (
              <RNPickerSelect
                placeholder={{
                  label: "Selecione",
                  value: null,
                  color: theme.colors.grey3,
                }}
                items={installments()}
                onValueChange={(value) => field.onChange(value)}
                value={field.value}
              />
            )}
            name="plot"
          />
        </View>
        {errors.plot && (
          <Text style={styles.errorMessage}>{errors.plot.message}</Text>
        )}
      </View>
      <View style={styles.homeContainer}>
        <Controller
          control={control}
          rules={{
            required: "O CEP é obrigatório",
          }}
          render={({ field }) => (
            <Input
              value={field.value}
              errorMessage={errors.zip_code?.message}
              isError={errors.zip_code?.message}
              placeholder="Insira o CEP"
              label="CEP"
              keyboardType={"numeric"}
              required
            />
          )}
          name="zip_code"
        />
        <Controller
          control={control}
          render={({ field }) => (
            <Input
              value={field.value}
              errorMessage={errors.street?.message}
              isError={errors.street?.message}
              placeholder="Insira seu endereço"
              label="Endereço"
              onChangeText={(value) => field.onChange(value)}
            />
          )}
          name="street"
        />
        <Controller
          control={control}
          rules={{
            required: "O número é obrigatório",
          }}
          render={({ field }) => (
            <Input
              value={field.value}
              errorMessage={errors.number?.message}
              isError={errors.number?.message}
              placeholder="Insira o número"
              label="Número"
              onChangeText={(value) => field.onChange(value)}
              required
              keyboardType={"numeric"}
            />
          )}
          name="number"
        />
        <Controller
          control={control}
          render={({ field }) => (
            <Input
              value={field.value}
              errorMessage={errors.complement?.message}
              isError={errors.complement?.message}
              placeholder="Insira o complemento"
              label="Complemento"
              onChangeText={(value) => field.onChange(value)}
            />
          )}
          name="complement"
        />
        <Controller
          control={control}
          render={({ field }) => (
            <Input
              value={field.value}
              errorMessage={errors.neighborhood?.message}
              isError={errors.neighborhood?.message}
              placeholder="Insira o bairro"
              label="Bairro"
              onChangeText={(value) => field.onChange(value)}
            />
          )}
          name="neighborhood"
        />
        <Controller
          control={control}
          render={({ field }) => (
            <Input
              value={field.value}
              errorMessage={errors.city?.message}
              isError={errors.city?.message}
              placeholder="Insira a cidade"
              label="Cidade"
              onChangeText={(value) => field.onChange(value)}
            />
          )}
          name="city"
        />
        {/* Adicionando o campo de estado */}
        <Controller
          control={control}
          rules={{
            required: "O estado é obrigatório",
          }}
          render={({ field }) => (
            <Input
              value={field.value}
              errorMessage={errors.state?.message}
              isError={errors.state?.message}
              placeholder="Insira o estado"
              label="Estado"
              onChangeText={(value) => field.onChange(value)}
            />
          )}
          name="state"
        />
      </View>
    </View>
  );
};

export const styles = ScaledSheet.create({
  container: {
    gap: "25@s",
  },

  containerTitle: { gap: "8@s" },

  containerInputs: {
    borderWidth: 1,
    borderColor: theme.colors.grey0,
    borderRadius: "20@s",
  },
  textInput: {
    height: "40@s",
    paddingHorizontal: "16@s",
    fontSize: "12@s",
  },

  inputNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: "16@s",
    borderBottomWidth: 1,
    borderColor: theme.colors.grey0,
  },
  inputCardName: {
    borderBottomWidth: 1,
    borderColor: theme.colors.grey0,
  },

  dateCodeContainer: {
    flexDirection: "row",
  },
  dateCodeInput: {
    width: "50%",
  },
  dateInput: {
    borderRightWidth: "1@s",
    borderColor: theme.colors.grey0,
  },

  inputCVCContainer: {
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: "16@s",
  },

  selectPicker: {
    borderWidth: "1@s",
    borderColor: theme.colors.grey0,
    borderRadius: "8@s",
  },

  errorMessage: {
    marginVertical: 5,
    fontFamily: theme.fonts.fontPoppinsRegular,
    fontSize: "12@s",
    textAlign: "left",
    color: theme.colors.red0,
  },

  homeContainer: {
    gap: "15@s",
  },
});
