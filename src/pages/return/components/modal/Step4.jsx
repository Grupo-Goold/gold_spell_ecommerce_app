import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { Button } from '../../../../components/Button/Button';
import { theme } from "../../../../global/styles/theme";
import { SVGgoBackIconAlternate } from '../../../../images/svg/SVGgoBackIconAlternate';
import { SVGlogo } from '../../../../images/svg/SVGlogo';
import { ModalRouter } from './ModalRouter';
import ReturnIcon from '../../../../images/svg/ReturnIcon';
import CashBackIcon from '../../../../images/svg/CashBackIcon';

export const Step4 = () => {
  const navigation = useNavigation();
  const [requestMode, setRequestMode] = useState('exchange');

  const handleSubmit = () => {
    if (requestMode === 'exchange') {
      navigation.navigate('Step6');
    } else {
      navigation.navigate('Step5');
    }
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

          <Text style={styles.title}>Tipo de solicitação</Text>
          <Text style={styles.subtitle}>
            Selecione o tipo de solicitação que deseja, troca ou reembolso
          </Text>
          
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              onPress={() => setRequestMode('exchange')}
              style={[
                styles.optionButton,
                requestMode === 'exchange' && styles.optionButtonActive
              ]}
            >
              <View style={styles.iconContainer}>
                <ReturnIcon width={28} height={28} fillColor={"#fff"} />
              </View>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>Troca</Text>
                <Text style={styles.optionDescription}>
                  Você envia o produto para troca, e nós enviamos um novo assim
                  que o recebermos.
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setRequestMode('refund')}
              style={[
                styles.optionButton,
                requestMode === 'refund' && styles.optionButtonActive
              ]}
            >
              <View style={styles.iconContainer}>
                <CashBackIcon width={28} height={28} />
              </View>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>Reembolso</Text>
                <Text style={styles.optionDescription}>
                  Você envia o produto de volta, e fazemos o reembolso do valor
                  pago assim que o recebermos.
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
  iconContainer: {
    backgroundColor: theme.colors.primaryColor,
    padding: '6@s',
    borderRadius: 12,
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
