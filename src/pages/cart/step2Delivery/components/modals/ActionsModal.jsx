import { useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { DeleteModal } from './DeleteModal';
import { EditModal } from './EditModal';

export const ActionsModal = ({ showActionModal, setShowActionModal, address }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setDeleteModal] = useState(false);

  return (
    <>
    <Modal
      transparent={true}
      visible={showActionModal}
      animationType="fade"
      onRequestClose={() => setShowActionModal(false)}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          onPress={() => setShowActionModal(false)}
          activeOpacity={1}
        />
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle}>Ações</Text>
            </View>
            <TouchableOpacity onPress={() => setShowActionModal(false)}>
              <Text style={styles.closeButton}>X</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.actionsContainer}>
            <View style={styles.actionItem}>
              <TouchableOpacity
                onPress={() => {
                    setShowEditModal(true);
                    setShowActionModal(false);
                }}
                style={styles.actionButton}
              >
                <Text style={styles.editText}>Editar endereço</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.actionItem}>
              <TouchableOpacity
                onPress={() => {
                    setDeleteModal(true);
                    setShowActionModal(false);
                }}
                style={styles.actionButton}
              >
                <Text style={styles.deleteText}>Excluir endereço</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>

      <DeleteModal
          showDeleteModal={showDeleteModal}
          setDeleteModal={setDeleteModal}
          address={address}
      />
      <EditModal
          showEditModal={showEditModal}
          setShowEditModal={setShowEditModal}
          address={address}
      />

    </>
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
  headerTitle: {
    fontSize: '15@s',
    fontWeight: '500',
  },
  closeButton: {
    fontSize: '12@s',
    fontWeight: '500',
  },
  actionsContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  actionItem: {
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: '#E5E5E5',
    padding: '16@s',
  },
  actionButton: {
    alignItems: 'center',
  },
  editText: {
    fontWeight: '500',
    fontSize: '14@s',
  },
  deleteText: {
    fontWeight: '500',
    fontSize: '14@s',
    color: '#EF4444',
  },
});
