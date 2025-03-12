import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Modal, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  Image,
  Dimensions
} from 'react-native';

const { width, height } = Dimensions.get('window');

const StoriesAndHighlightsModal = ({ visible, onClose, stories, highlights }) => {
  const [activeTab, setActiveTab] = useState('stories');
  
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Stories & Highlights</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.tabs}>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'stories' && styles.activeTab]} 
              onPress={() => setActiveTab('stories')}
            >
              <Text style={[styles.tabText, activeTab === 'stories' && styles.activeTabText]}>Stories</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'highlights' && styles.activeTab]} 
              onPress={() => setActiveTab('highlights')}
            >
              <Text style={[styles.tabText, activeTab === 'highlights' && styles.activeTabText]}>Highlights</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.contentContainer}>
            {activeTab === 'stories' ? (
              <View style={styles.storiesContainer}>
                {stories && stories.length > 0 ? (
                  stories.map((story, index) => (
                    <View key={index} style={styles.storyItem}>
                      <Image source={{ uri: story.imageUrl }} style={styles.storyImage} />
                      <Text style={styles.storyTitle}>{story.title}</Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.emptyText}>No stories to show</Text>
                )}
                <TouchableOpacity style={styles.addButton}>
                  <Text style={styles.addButtonText}>+ Create New Story</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.highlightsContainer}>
                {highlights && highlights.length > 0 ? (
                  highlights.map((highlight, index) => (
                    <View key={index} style={styles.highlightItem}>
                      <Image source={{ uri: highlight.imageUrl }} style={styles.highlightImage} />
                      <Text style={styles.highlightTitle}>{highlight.title}</Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.emptyText}>No highlights to show</Text>
                )}
                <TouchableOpacity style={styles.addButton}>
                  <Text style={styles.addButtonText}>+ Create New Highlight</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: width * 0.9,
    height: height * 0.7,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  tabs: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#0095f6',
  },
  tabText: {
    fontSize: 16,
    color: '#999',
  },
  activeTabText: {
    color: '#0095f6',
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
  },
  storiesContainer: {
    flex: 1,
    padding: 10,
  },
  highlightsContainer: {
    flex: 1,
    padding: 10,
  },
  storyItem: {
    marginBottom: 20,
    alignItems: 'center',
  },
  storyImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 5,
  },
  storyTitle: {
    fontSize: 14,
  },
  highlightItem: {
    marginBottom: 20,
    alignItems: 'center',
  },
  highlightImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 5,
  },
  highlightTitle: {
    fontSize: 14,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginVertical: 20,
  },
  addButton: {
    padding: 15,
    backgroundColor: '#0095f6',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default StoriesAndHighlightsModal;