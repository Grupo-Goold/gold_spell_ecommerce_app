import React from 'react';
import { View, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SVGcloseX } from '../../../../images/svg/SVGcloseX';
import { ScaledSheet } from 'react-native-size-matters';
import { theme } from "../../../../global/styles/theme";

export const ModalRouter = ({ children }) => {
  const navigation = useNavigation();

  const closeModal = () => {
    navigation.navigate('Return');
  };
  
  return (
    <TouchableWithoutFeedback onPress={closeModal}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
          <View style={styles.modalContent}>
            {children}
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.closeContent}>
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={closeModal}
            activeOpacity={0.7}
          >
            <SVGcloseX name="close-circle" size={48} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = ScaledSheet.create({
  container: {
    padding: 25,
  },
  modalContent: {
    backgroundColor: theme.colors.white,
    borderRadius: '10@s',
    width: '100%',
    height: '85%',
    maxWidth: '400@s',
    overflow: 'hidden',
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