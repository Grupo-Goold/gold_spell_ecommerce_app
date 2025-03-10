import { View, Text, TouchableOpacity } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { theme } from '../../../../global/styles/theme';

export const ToggleIsSavedAddres = ({ isSavedAddresses, setIsSavedAddresses }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={() => setIsSavedAddresses(true)}
        style={styles.tabButton}
      >
        <Text style={styles.tabText}>Endereços salvos</Text>
        {isSavedAddresses && <View style={styles.activeIndicator} />}
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => setIsSavedAddresses(false)}
        style={styles.tabButton}
      >
        <Text style={styles.tabText}>Outro endereço</Text>
        {!isSavedAddresses && <View style={styles.activeIndicator} />}
      </TouchableOpacity>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: '24@s',
    marginBottom: '24@s',
  },
  tabButton: {
    alignItems: 'center',
  },
  tabText: {
    fontSize: '14@s',
    marginBottom: '4@s',
  },
  activeIndicator: {
    height: '4@s',
    width: '100%',
    backgroundColor: theme.colors.primaryColor,
    borderRadius: '2@s',
  },
});