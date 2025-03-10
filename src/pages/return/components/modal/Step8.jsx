import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { Button } from '../../../../components/Button/Button';
import InputField from '../../../../components/InputField';
import { theme } from "../../../../global/styles/theme";
import { SVGgoBackIconAlternate } from '../../../../images/svg/SVGgoBackIconAlternate';
import { ModalRouter } from './ModalRouter';
import api from '../../../../services/api';
import { useForm } from 'react-hook-form';

export const Step8 = () => {
  const navigation = useNavigation();
  const {control, handleSubmit, setValue, formState: { errors }} = useForm();

  const [addressFieldsDisabled, setAddressFieldsDisabled] = useState({
		neighborhood: false,
		line_1: false,
		city: false,
		state: false,
	});

  const onSubmit = () => {
    navigation.navigate('Step9');
  };
  
  return (
    <ModalRouter>
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <SVGgoBackIconAlternate arrowColor={theme.colors.white} fillColor={theme.colors.primaryColor} size={20} />
            </TouchableOpacity>
            <Text style={styles.title}>Editar informações</Text>
          </View>

          <View style={styles.formView}>
            <Text style={styles.textContainer}>
              <Text style={styles.bold}>Observação:</Text>
              As informações devem estar sempre atualizadas para que nossa equipe possa analisar suas solicitações de troca e devolução com mais precisão.
            </Text>

            <Text style={styles.subtitle}>
              <Text style={styles.bold}>Informações de contato</Text>
            </Text>
                
            <InputField
              control={control}
              rules={{
                required: 'Campo obrigatório',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'E-mail inválido',
                },
              }}
              name="order"
              label="E-mail de contato*"
              placeholder="Insira o e-mail"
              error={errors.mail}
            />

            <InputField
              control={control}
              rules={{
                required: 'Campo obrigatório',
                validate: (value) => {
                  const phoneRegex = /^\(?(\d{2})\)?\s?9?\d{4}-?\d{4}$/;
                  return phoneRegex.test(value) || 'Número de celular inválido';
                },
              }}
              name="phone"
              label="Celular com DDD*"
              placeholder="Insira o número"
              error={errors.phone}
            />

            <Text style={styles.subtitle}>
              <Text style={styles.bold}>Informações de contato</Text>
            </Text>

            <InputField
              control={control}
              rules={{
                required: 'CEP é obrigatório',
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

                  setValue(
                    'neighborhood',
                    addressData.bairro || returnData.address.neighborhood,
                  );
                  setValue(
                    'line_1',
                    addressData.logradouro || returnData.address.line_1,
                  );
                  setValue('state', addressData.uf || '');
                  setValue('city', addressData.localidade || '');

                  setAddressFieldsDisabled({
                    neighborhood: !!addressData.bairro,
                    line_1: !!addressData.logradouro,
                    city: !!addressData.localidade,
                    state: !!addressData.uf,
                  });

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
              rules={{ required: 'Campo obrigatório' }}
              name="state"
              label="Estado*"
              placeholder="Insira o estado"
              disabled={addressFieldsDisabled.state}
              error={errors.state}
            />
      
            <InputField
              control={control}
              rules={{ required: 'Campo obrigatório' }}
              name="city"
              label="Cidade*"
              placeholder="Insira a cidade"
              disabled={addressFieldsDisabled.city}
              error={errors.city}
            />

            <InputField
              control={control}
              rules={{ required: 'Campo obrigatório' }}
              name="neighborhood"
              label="Bairro*"
              placeholder="Insira o bairro"
              disabled={addressFieldsDisabled.neighborhood}
              error={errors.neighborhood}
            />

            <InputField
              control={control}
              rules={{ required: 'Campo obrigatório' }}
              name="line_1"
              label="Rua*"
              placeholder="Insira o endereço"
              error={errors.line_1}
            />

            <InputField
              control={control}
              rules={{ required: 'Campo obrigatório' }}
              name="number"
              label="Número*"
              placeholder="Insira o número"
              error={errors.number}
            />

            <InputField
              control={control}
              rules={{ required: 'Campo obrigatório' }}
              name="complement"
              label="Complemento*"
              placeholder="Insira o complemento"
              error={errors.complement}
            />
          </View>
        </ScrollView>
        
        <View style={styles.buttonContainer}>
          <Button
            title="Continuar"
            textColor={theme.colors.white}
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </ModalRouter>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '24@s',
    borderBottomColor: theme.colors.border,
    borderBottomWidth: 1,
    paddingVertical: '10@s',
    paddingHorizontal: '16@s',
  },
  backButton: {
    backgroundColor: theme.colors.primaryColor,
    borderRadius: 50,
    padding: '4@s',
  },
  textContainer: {
    marginBottom: '16@s',
    textAlign: 'center',
  },
  formView: {
    paddingHorizontal: '16@s',
    marginBottom: '24@s',
  },
  title: {
    fontSize: '15@s',
    fontWeight: '500',
    marginInline: 'auto',
  },
  subtitle: {
    fontSize: '12@s',
    paddingBottom: '8@s',
  },
  bold: {
    fontWeight: '600',
  },
  buttonContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowOffset: {
      width: 0,
      height: -6,
    },
    shadowOpacity: 0.7,
    shadowRadius: 8,
    shadowColor: '#000',
    elevation: 16,
    zIndex: 1
  },
  button: {
    borderRadius: 60,
    width: '100%',
    height: '40@s',
    backgroundColor: theme.colors.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButon: {
    color: 'white',
    fontSize: '14@s',
    fontWeight: 'medium',
  }
});
