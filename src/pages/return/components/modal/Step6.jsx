import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { Button } from '../../../../components/Button/Button';
import { theme } from "../../../../global/styles/theme";
import { SVGgoBackIconAlternate } from '../../../../images/svg/SVGgoBackIconAlternate';
import { SVGlogo } from '../../../../images/svg/SVGlogo';
import ExclamentionIcon from '../../../../images/svg/ExclamentionIcon';
import { ModalRouter } from './ModalRouter';

export const Step6 = () => {
  const navigation = useNavigation();
  const [deliveryMethod, setDeliveryMethod] = useState('correios');

  const handleSubmit = () => {
    navigation.navigate('Step7');
  };
  
  return (
    <ModalRouter>
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <SVGgoBackIconAlternate arrowColor={theme.colors.white} fillColor={theme.colors.primaryColor} size={20} />
            </TouchableOpacity>
            <View style={styles.logo}>
              <SVGlogo width={90} height={90} />
            </View>
          </View>

          <Text style={styles.title}>Forma de devolução</Text>
          <Text style={styles.subtitle}>
            Selecione a forma de devolução que for mais conveniente para você
          </Text>
          
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              onPress={() => setDeliveryMethod('correios')}
              style={[
                styles.optionButton,
                deliveryMethod === 'correios' && styles.optionButtonActive
              ]}
            >
              <View style={styles.imageContainer}>
                <Image
                  source={require('../../../../images/png/correios.png')}
                  style={styles.correiosImage}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>Postagem na agência</Text>
                <Text style={styles.optionDescription}>
                  Poste os produtos na agência dos Correios mais próxima de você.
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setDeliveryMethod('kiosk')}
              style={[
                styles.optionButton,
                deliveryMethod === 'kiosk' && styles.optionButtonActive
              ]}
            >
              <View style={styles.iconContainer}>
                <SVGlogo width={24} height={24} />
              </View>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>Quiosque Goold</Text>
                <Text style={styles.optionDescription}>
                  Leve os produtos do reembolso no quiosque mais próximo de você.
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setDeliveryMethod('lost')}
              style={[
                styles.optionButton,
                deliveryMethod === 'lost' && styles.optionButtonActive
              ]}
            >
              <View style={styles.iconContainer}>
                <ExclamentionIcon width={24} height={24} />
              </View>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>Produto foi extraviado</Text>
                <Text style={styles.optionDescription}>
                  Caso o produto foi extraviado selecione essa opção.
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
        
        <View style={styles.buttonContainer}>
          <Button
            title="Continuar"
            textColor={theme.colors.white}
            style={styles.button}
            onPress={handleSubmit}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '24@s',
  },
  backButton: {
    backgroundColor: theme.colors.primaryColor,
    borderRadius: 50,
    padding: '4@s',
  },
  logo: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: '18@s',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: '8@s',
  },
  subtitle: {
    fontSize: '14@s',
    textAlign: 'center',
    marginBottom: '20@s',
    lineHeight: 22,
  },
  optionsContainer: {
    gap: '20@s',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: '12@s',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    padding: '8@s',
  },
  optionButtonActive: {
    borderColor: theme.colors.quaternaryColor,
    backgroundColor: theme.colors.secondaryColor,
  },
  imageContainer: {
    width: '50@s',
    height: '50@s',
    borderWidth: 1,
    borderColor: theme.colors.primaryColor,
    borderRadius: 12,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  correiosImage: {
    width: '50@s',
    height: '50@s',
  },
  iconContainer: {
    width: '50@s',
    height: '50@s',
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 12,
    backgroundColor: 'white',
    padding: '6@s',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionTextContainer: {
    flex: 1,
    gap: '4@s',
  },
  optionTitle: {
    fontSize: '14@s',
    fontWeight: '500',
  },
  optionDescription: {
    fontSize: '12@s',
    color: '#555',
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
