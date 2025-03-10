import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { Button } from '../../../../components/Button/Button';
import { SVGgoBackIconAlternate } from '../../../../images/svg/SVGgoBackIconAlternate';
import { SVGlogo } from '../../../../images/svg/SVGlogo';
import { ModalRouter } from './ModalRouter';
import CheckIcon from '../../../../images/svg/CheckIcon';
import { generateOptionsQuantity, ordersMock, returnReasonOptions } from '../../../../mocks/return';
import { formatValue } from '../../../../utils/format';
import TextArea from '../../../../components/TextArea';
import SelectField from '../../../../components/SelectField';
import { useForm } from 'react-hook-form';
import { theme } from '../../../../global/styles/theme';

export const Step3 = () => {
  const navigation = useNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const {control, handleSubmit, formState: { errors }} = useForm();

  const onSubmit = () => {
    navigation.navigate('Step4');
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

          <Text style={styles.title}>Pedido: 281123</Text>
          <Text style={styles.subtitle}>
            Selecione os produtos para troca ou devolução
          </Text>

          <View style={styles.containerCard}>
            <View style={styles.itemContainer}>
              <TouchableOpacity
                onPress={() => setIsOpen(!isOpen)}
                style={[
                  styles.checkButton,
                  isOpen && styles.checkButtonActive
                ]}
              >
                <CheckIcon width={20} height={20} />
              </TouchableOpacity>
              
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: ordersMock[0].lista_produtos[0].products_photos }}
                  style={styles.productImage}
                />
              </View>

              <View style={styles.infoContainer}>
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.productTitle}>
                  {ordersMock[0].lista_produtos[0].title}
                </Text>
                <View style={styles.priceRow}>
                  <Text style={styles.price}>{formatValue(ordersMock[0].lista_produtos[0].price)}</Text>
                  <View style={styles.quantityBadge}>
                    <Text style={styles.quantityText}>
                      QTD:{ordersMock[0].lista_produtos[0].quantity}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {isOpen && (
              <View style={styles.expandedContent}>
                <View style={styles.formRow}>
                  <View style={styles.reasonField}>
                    <SelectField
                      label="Motivo*"
                      options={returnReasonOptions}
                      control={control}
                      rules={{
                        required: 'Campo obrigatório',
                      }}
                      name="reason"
                      error={errors.reason}
                    />
                  </View>
                  <View style={styles.quantityField}>
                    <SelectField
                      control={control}
                      rules={{
                        required: 'Campo obrigatório',
                      }}
                      label="Quantidade*"
                      name="quantity"
                      options={generateOptionsQuantity(8)}
                      error={errors.quantity}
                    />
                  </View>
                </View>
                <TextArea
                  control={control}
                  rules={{
                    required: 'Campo obrigatório',
                  }}
                  name="description"
                  label="Comentários e Fotos*"
                  placeholder="Descreva o ocorrido e anexe uma foto, se necessário"
                  error={errors.description}
                />
              </View>
            )}
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
  containerCard: {
    borderWidth: 1,
    borderRadius: '12@s',
    padding: '8@s',
    borderColor: '#E0E0E0',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: '12@s',
  },
  checkButton: {
    width: '24@s',
    height: '24@s',
    borderRadius: '12@s',
    borderWidth: 1,
    borderColor: theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkButtonActive: {
    backgroundColor: theme.colors.primaryColor,
  },
  imageContainer: {
    marginRight: '4@s',
  },
  productImage: {
    width: '40@s',
    height: '50@vs',
    resizeMode: 'contain',
  },
  infoContainer: {
    width: '100%',
    flex: 1,
    gap: '4@s',
  },
  productTitle: {
    fontSize: '12@s',
    fontWeight: '500',
    flexShrink: 1
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: '12@s',
    fontWeight: '500',
  },
  quantityBadge: {
    marginLeft: 'auto',
    backgroundColor: theme.colors.yellow6,
    borderRadius: '100@s',
    paddingHorizontal: '4@s',
    paddingVertical: '2@vs',
    borderWidth: 1,
    borderColor: theme.colors.yellow7,
  },
  quantityText: {
    fontSize: '10@s',
    fontWeight: '500',
    color: theme.colors.primaryColor,
  },
  expandedContent: {
    paddingTop: '12@s',
  },
  formRow: {
    flexDirection: 'row',
    gap: '12@s',
    marginBottom: '8@s',
  },
  reasonField: {
    flex: 2,
  },
  quantityField: {
    flex: 1,
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
