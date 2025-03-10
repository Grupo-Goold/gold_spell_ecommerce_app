import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { theme } from "../../../../global/styles/theme";
import { SVGlogo } from '../../../../images/svg/SVGlogo';
import { ModalRouter } from './ModalRouter';
import SucessIcon from '../../../../images/svg/SucessIcon';

export const Step9 = () => {
  const navigation = useNavigation();

  const handleSubmit = () => {
    navigation.navigate('return');
  };
  
  return (
    <ModalRouter>
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
          <View style={styles.logo}>
            <SVGlogo width={90} height={90} />
          </View>

          <View style={styles.textContainer}>
            <View style={styles.icon}>
              <SucessIcon />
            </View>
            <Text style={styles.title}>Solicitação de Troca Realizado com sucesso</Text>
            <Text style={styles.paragraph}>Se sua solicitação for aprovada, você receberá um e-mail com instruções para o envio dos produtos.</Text>
            <Text style={styles.paragraph}>O estoque dos itens solicitados foi reservado e, caso o pedido seja aprovado, a mercadoria poderá ser retirada no quiosque selecionado após a confirmação do recebimento dos produtos por nossa equipe.</Text> 
          </View>
        </ScrollView>
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
  },
  icon: {
    alignSelf: 'center',
    marginBottom: '24@s',
  },
  title: {
    fontSize: '18@s',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: '8@s',
  },
  textContainer: {
    marginBottom: '20@s',
    marginTop: '20@s',
  },
  paragraph: {
    fontSize: '12@s',
    lineHeight: '20@s',
    textAlign: 'center',
    marginBottom: '8@s',
    color: theme.colors.text,
  },
});
