import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { formatedAddres } from '../../../../../utils/format';
import { theme } from '../../../../../global/styles/theme';
import useAddressesStore from '../../../../../store/addressesStore';

export const DeleteModal = ({ showDeleteModal, setDeleteModal, address }) => {
  const { deleteAddress } = useAddressesStore();

  return (
    <Modal
      transparent={true}
      visible={showDeleteModal}
      animationType="fade"
      onRequestClose={() => setDeleteModal(false)}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          onPress={() => setDeleteModal(false)}
          activeOpacity={1}
        />
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <View style={styles.closeContainer}>
                <TouchableOpacity onPress={() => setDeleteModal(false)}>
                    <Text style={styles.closeButton}>X</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Excluir endereço</Text>
            </View>

            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => {
                    deleteAddress(address.id)
                    setDeleteModal(false)
                }}
                >
                <Text style={styles.deleteButtonText}>Excluir</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.deleteContainer}>
            <Text style={styles.deleteText}>
                Tem certeza que deseja excluir seu endereço salvo:{' '}
            </Text>
            <Text style={styles.deleteTextBold}>
                {formatedAddres(address)}
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = ScaledSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 100,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    opacity: 0.8,
  },
  modalContainer: {
    height: '30%',
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: '12@s',
    borderTopRightRadius: '12@s',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderBottomColor: '#E5E5E5',
    padding: '16@s',
  },
  closeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: '8@s',
  },
  headerTitle: {
    fontSize: '15@s',
    fontWeight: '500',
  },
  closeButton: {
    fontSize: '12@s',
    fontWeight: '500',
  },
  deleteButton: {
    borderRadius: '99@s',
    border: 2,
    backgroundColor: theme.colors.red7,
  },
  deleteButtonText: {
    fontSize: '14@s',
    fontWeight: '500',
    paddingInline: '24@s',
    paddingVertical: '4@s',
    color: theme.colors.red0,
  },
  deleteContainer: {
    width: '100%',
    paddingHorizontal: '16@s',
    flex: 1,
    justifyContent: 'center',
  },
  deleteText: {
    fontSize: '15@s',
    textAlign: 'center',
  },
  deleteTextBold: {
    fontSize: '15@s',
    textAlign: 'center',
    fontWeight: '600',
  },
});
