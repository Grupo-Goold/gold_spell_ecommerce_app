import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import InputField from '../../../../../components/InputField';
import useAddressesStore from '../../../../../store/addressesStore';
import { theme } from '../../../../../global/styles/theme';
import api from '../../../../../services/api';
import { SVGgoBackIconAlternate } from '../../../../../images/svg/SVGgoBackIconAlternate';
import { SVGcloseX } from '../../../../../images/svg/SVGcloseX';

export const EditModal = ({ showEditModal, setShowEditModal, setShowActionModal, address }) => {
  const { updateAddress } = useAddressesStore();

    const [addressFieldsDisabled, setAddressFieldsDisabled] = useState({
        neighborhood: true,
        line_1: true,
        city: true,
        state: true,
    });

    const {
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            address_name: address.address_name,
            zip_code: address.zip_code,
            city: address.city,
            state: address.state,
            neighborhood: address.neighborhood,
            line_1: address.line_1,
            number: address.number,
            complement: address.complement,
        },
    });

    const handleCepChange = useCallback(async (cep) => {
		if (cep?.length === 8) {
			const addressData = await api
				.get(`https://viacep.com.br/ws/${cep}/json/`)
				.then((res) => {
					return res.data;
				});

			if (addressData && addressData.cep) {
				setValue(
					'neighborhood',
					addressData.bairro || '',
				);
				setValue('line_1', addressData.logradouro || '');
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
    updateAddress(address.id, data);
    setShowEditModal(false);
  };

  return (
    <Modal
      transparent={true}
      visible={showEditModal}
      animationType="fade"
      onRequestClose={() => setShowEditModal(false)}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          onPress={() => setShowEditModal(false)}
          activeOpacity={1}
        />
        <View style={styles.modalContainer}>
          <View style={styles.header}>
                <TouchableOpacity onPress={() => {
                  setShowActionModal(true);
                  setShowEditModal(false);
                }}
                >
                    <SVGgoBackIconAlternate arrowColor={theme.colors.white} fillColor={theme.colors.primaryColor} size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Salvar endereço</Text>
          </View>

          <ScrollView 
            style={styles.editContainer}
            contentContainerStyle={{ paddingBottom: 40 }}
          >
            <InputField
                control={control}
                rules={{
                    required: 'Campo obrigatório',
                }}
                name="address_name"
                label="Identificação do endereço"
                placeholder="Casa, trabalho, etc."
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
                error={errors.complement}
            />
          </ScrollView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      <View style={styles.closeContent}>
        <TouchableOpacity 
          style={styles.closeButton} 
          onPress={() => setShowEditModal(false)}
          activeOpacity={0.7}
        >
          <SVGcloseX name="close-circle" size={48} color="white" />
        </TouchableOpacity>
      </View>
      </View>
    </Modal>
  );
};

const styles = ScaledSheet.create({
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    opacity: 0.8,
  },
  modalContainer: {
    height: '79%',
    width: '85%',
    backgroundColor: 'white',
    borderRadius: '12@s',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    padding: '16@s',
  },
  headerTitle: {
    fontSize: '15@s',
    marginHorizontal: 'auto',
    fontWeight: '500',
  },
  closeButton: {
    fontSize: '12@s',
    fontWeight: '500',
  },
  editContainer: {
    flex: 1,
    paddingVertical: '16@s',
    paddingHorizontal: '16@s',
    paddingBottom: '16@s',
  },
  buttonContainer: {
    height: '80@s',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderTopLeftRadius: '15@s',
    borderTopRightRadius: '15@s',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButton: {
    width: '90%',
    backgroundColor: theme.colors.primaryColor,
    paddingVertical: '12@vs',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.white,
    fontWeight: '600',
  },
  closeContent: {
    height: '15%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    borderWidth: '2@s',
    borderColor: theme.colors.border,
    borderRadius: '24@s',
    padding: '10@s',
  }
});
