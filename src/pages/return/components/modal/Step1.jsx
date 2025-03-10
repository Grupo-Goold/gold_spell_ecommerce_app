import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { Button } from '../../../../components/Button/Button';
import CustomSwitch from '../../../../components/CustomSwitch';
import { theme } from "../../../../global/styles/theme";
import { SVGlogo } from '../../../../images/svg/SVGlogo';
import { ModalRouter } from './ModalRouter';

export const Step1 = () => {
  const navigation = useNavigation();
  const [isChecked, setIsChecked] = useState(false);

  const onSubmit = () => {
    navigation.navigate('Step2');
  };
  
  return (
    <ModalRouter>
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
          <View style={styles.logo}>
            <SVGlogo width={90} height={90} />
          </View>
          
          <View style={styles.textContainer}>
            <Text style={styles.paragraph}>
              Agora você poderá efetuar sua troca ou fazer a devolução do seu
              pedido de forma automatizada e simples. Após enviar a sua
              solicitação, faremos uma análise da mesma e da foto enviada e
              aprovaremos ou rejeitaremos a solicitação.
            </Text>
            
            <Text style={styles.paragraph}>
              Você tem direito de{' '}
              <Text style={styles.bold}>devolver e solicitar o reembolso</Text> do seu produto em{' '}
              <Text style={styles.bold}>até 7 dias após o recebimento do pedido,</Text> desde que
              esteja intacto e sem indícios de uso, e{' '}
              <Text style={styles.bold}>
                até 30 dias para troca pelo mesmo item, em caso de defeito e
                avaria, ou item recebido errado.
              </Text>
            </Text>
          </View>

          <View style={styles.switchContainer}>
            <CustomSwitch
              value={isChecked}
              onValueChange={setIsChecked}
              activeTrackColor={theme.colors.primaryColor}
              inactiveTrackColor="#d9d9d9"
              thumbColor="#ffffff"
            />
            <Text style={styles.switchText}>Li e aceito os termos</Text>
          </View>
        </ScrollView>
        
        <View style={styles.buttonContainer}>
          <Button
            title="Continuar"
            onPress={onSubmit}
            disabled={!isChecked}
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
  textContainer: {
    marginBottom: '20@s',
  },
  paragraph: {
    fontSize: '14@s',
    lineHeight: '20@s',
    textAlign: 'center',
    marginBottom: '8@s',
    color: theme.colors.text,
  },
  bold: {
    fontWeight: 'bold',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '20@s',
  },
  switchText: {
    marginLeft: '8@s',
    fontSize: '12@s',
    color: theme.colors.text,
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
  textButon: {
    color: 'white',
    fontSize: '14@s',
    fontWeight: 'medium',
  }
});
