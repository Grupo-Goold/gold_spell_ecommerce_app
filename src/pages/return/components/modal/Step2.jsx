import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, Text, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { Button } from '../../../../components/Button/Button';
import InputField from '../../../../components/InputField';
import { theme } from "../../../../global/styles/theme";
import { SVGlogo } from '../../../../images/svg/SVGlogo';
import { ModalRouter } from './ModalRouter';

export const Step2 = () => {
  const navigation = useNavigation();
  const {control, handleSubmit, formState: { errors }} = useForm();

  const onSubmit = () => {
    navigation.navigate('Step3');
  };
  
  return (
    <ModalRouter>
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
          <View style={styles.logo}>
            <SVGlogo width={90} height={90} />
          </View>
          
          <Text style={styles.title}>Central de Trocas e Devoluções</Text>
          
          <Text style={styles.text}>
            Insira o número do pedido da compra efetuada em nossa loja para que
            possamos identificar quais produtos deseja solicitar a troca ou
            devolução.
          </Text>


          <InputField
            control={control}
            rules={{
              required: 'Campo obrigatório',
            }}
            name="cpf"
            label="CPF"
            placeholder="Inserir CPF"
            disabled={false}
            error={errors.cpf}
          />

          <InputField
            control={control}
            rules={{
              required: 'Campo obrigatório',
            }}
            name="order"
            label="Número do Pedido"
            placeholder="Exemplo: 281123"
            disabled={false}
            error={errors.order}
          />

        </ScrollView>
        
        <View style={styles.buttonContainer}>
          <Button
            title="Continuar"
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
  scrollContent: {
    paddingHorizontal: '16@s',
    paddingVertical: '20@s',
  },
  logo: {
    alignSelf: 'center',
    width: '96@s',
    height: '96@s',
    marginBottom: '24@s',
  },
  title: {
    fontSize: '18@s',
    fontFamily: theme.fonts.fontPoppinsSemiBold,
    textAlign: 'center',
    marginBottom: '20@s',
  },
  text: {
    fontSize: '14@s',
    textAlign: 'center',
    marginBottom: '20@s',
    lineHeight: '20@s',
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
});
