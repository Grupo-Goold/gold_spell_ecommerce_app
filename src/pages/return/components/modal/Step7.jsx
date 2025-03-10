import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { Button } from '../../../../components/Button/Button';
import { theme } from "../../../../global/styles/theme";
import { SVGgoBackIconAlternate } from '../../../../images/svg/SVGgoBackIconAlternate';
import { SVGlogo } from '../../../../images/svg/SVGlogo';
import { ModalRouter } from './ModalRouter';
import EditIcon from '../../../../images/svg/EditIcon';

export const Step7 = () => {
  const navigation = useNavigation();

  const handleSubmit = () => {
    navigation.navigate('Step9');
  };

  const getDeliveryMethodText = () => {
    if (returnData.deliveryMethod === 'correios') return 'Agência correios';
    if (returnData.deliveryMethod === 'kiosk') return 'Quiosque Goold';
    if (returnData.deliveryMethod === 'lost') return 'Produtos extraviados';
    return '';
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

          <Text style={styles.title}>Confirmação de Solicitação</Text>

          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Tipo solicitação</Text>
              <Text style={styles.detailValue}>Vale Compras + R$ 12,00</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Valor total</Text>
              <Text style={styles.detailValue}>R$ 190,00</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Devolução do itens</Text>
              <Text style={styles.detailValue}>Agência correios</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Motivo</Text>
              <Text style={styles.detailValue}>Me arrependi da compra</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Nome</Text>
              <Text style={styles.detailValue}>Mateus barbosa dos santos</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>CPF</Text>
              <Text style={styles.detailValue}>456.343.299-11</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>E-mail</Text>
              <View style={styles.editableValue}>
                <Text style={styles.detailValue}>mateus@goldspell.com.br</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Step8')}>
                  <EditIcon width={16} height={16} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Telefone</Text>
              <View style={styles.editableValue}>
                <Text style={styles.detailValue}>11977965692</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Step8')}>
                  <EditIcon width={16} height={16} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Endereço</Text>
              <View style={styles.editableValue}>
                <Text style={styles.addressValue}>
                  R. Coronel irineu de castro n°43, Jardim Analia franco, São paulo - SP
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Step8')}>
                  <EditIcon width={16} height={16} />
                </TouchableOpacity>
              </View>
            </View>
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
  detailsContainer: {
    paddingVertical: '16@s',
    gap: '8@s',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: '8@s',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  detailLabel: {
    fontSize: '12@s',
    color: '#666',
  },
  detailValue: {
    fontSize: '12@s',
    fontWeight: '600',
  },
  editableValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: '8@s',
  },
  addressValue: {
    fontSize: '12@s',
    fontWeight: '600',
    textAlign: 'right',
    maxWidth: '180@s',
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
