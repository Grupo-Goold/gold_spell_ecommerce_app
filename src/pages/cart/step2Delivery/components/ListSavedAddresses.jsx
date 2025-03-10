import { View, Text, TouchableOpacity } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import ThreeDotsSVG from '../../../../images/svg/ThreeDotsSVG';
import useAddressesStore from '../../../../store/addressesStore';
import { formatedAddres } from '../../../../utils/format';
import { useState } from 'react';
import { theme } from '../../../../global/styles/theme';
import { ActionsModal } from './modals/ActionsModal';

export const ListSavedAddresses = ({ selectedAddress, setSelectedAddress }) => {
  const { addresses } = useAddressesStore();
  const [showActionModal, setShowActionModal] = useState(false);

  return (
    <View style={styles.container}>
      {addresses.map((address, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedAddress(address)}
            style={[
              styles.addressItem,
              selectedAddress === address && styles.selectedAddressItem
            ]}
          >
            <View style={styles.addressInfoContainer}>
              <Text style={styles.addressName}>
                {address.address_name?.toLowerCase()}
              </Text>
              <TouchableOpacity style={styles.threeDotsButton} onPress={() => setShowActionModal(true)}>
                <ThreeDotsSVG />
              </TouchableOpacity>
            </View>

            <View>
              <View>
                <Text>{formatedAddres(address)}</Text>
              </View>
            </View>
            <ActionsModal
              showActionModal={showActionModal}
              setShowActionModal={setShowActionModal}
              address={address}
            />
          </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    marginBottom: '32@s',
    flexDirection: 'column',
    gap: '16@s',
  },
  addressItem: {
    flexDirection: 'column',
    borderWidth: 2,
    borderRadius: '8@s',
    padding: '8@s',
    paddingHorizontal: '16@s',
    borderColor: '#ccc',
  },
  selectedAddressItem: {
    borderColor: theme.colors.primaryColor,
    backgroundColor: theme.colors.tertiaryColor,
  },
  addressName: {
    fontSize: '18@s',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  addressInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  threeDotsButton: {
    paddingLeft: '12@s',
  },
});
