import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

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
      <View style={styled.modalContainer}>
        <View style={styled.modalContent}>
          <View style={styled.header}>
            <Text style={styled.headerTitle}>Stories & Highlights</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styled.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styled.tabs}>
            <TouchableOpacity 
              style={[styled.tab, activeTab === 'stories' && styled.activeTab]} 
              onPress={() => setActiveTab('stories')}
            >
              <Text style={[styled.tabText, activeTab === 'stories' && styled.activeTabText]}>Stories</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styled.tab, activeTab === 'highlights' && styled.activeTab]} 
              onPress={() => setActiveTab('highlights')}
            >
              <Text style={[styled.tabText, activeTab === 'highlights' && styled.activeTabText]}>Highlights</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styled.contentContainer}>
            {activeTab === 'stories' ? (
              <View style={styled.storiesContainer}>
                {stories && stories.length > 0 ? (
                  stories.map((story, index) => (
                    <View key={index} style={styled.storyItem}>
                      <Image source={{ uri: story.imageUrl }} style={styled.storyImage} />
                      <Text style={styled.storyTitle}>{story.title}</Text>
                    </View>
                  ))
                ) : (
                  <Text style={styled.emptyText}>No stories to show</Text>
                )}
                <TouchableOpacity style={styled.addButton}>
                  <Text style={styled.addButtonText}>+ Create New Story</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styled.highlightsContainer}>
                {highlights && highlights.length > 0 ? (
                  highlights.map((highlight, index) => (
                    <View key={index} style={styled.highlightItem}>
                      <Image source={{ uri: highlight.imageUrl }} style={styled.highlightImage} />
                      <Text style={styled.highlightTitle}>{highlight.title}</Text>
                    </View>
                  ))
                ) : (
                  <Text style={styled.emptyText}>No highlights to show</Text>
                )}
                <TouchableOpacity style={styled.addButton}>
                  <Text style={styled.addButtonText}>+ Create New Highlight</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styled = ScaledSheet.create({
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
    borderRadius: '10@s',
    padding: '15@s',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '15@s',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: '18@ms',
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: '20@ms',
    fontWeight: 'bold',
  },
  tabs: {
    flexDirection: 'row',
    marginTop: '15@s',
    marginBottom: '15@s',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    paddingVertical: '10@s',
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#0095f6',
  },
  tabText: {
    fontSize: '16@ms',
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
    padding: '10@s',
  },
  highlightsContainer: {
    flex: 1,
    padding: '10@s',
  },
  storyItem: {
    marginBottom: '20@s',
    alignItems: 'center',
  },
  storyImage: {
    width: '70@s',
    height: '70@s',
    borderRadius: '35@s',
    marginBottom: '5@s',
  },
  storyTitle: {
    fontSize: '14@ms',
  },
  highlightItem: {
    marginBottom: '20@s',
    alignItems: 'center',
  },
  highlightImage: {
    width: '70@s',
    height: '70@s',
    borderRadius: '35@s',
    marginBottom: '5@s',
  },
  highlightTitle: {
    fontSize: '14@ms',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginVertical: '20@s',
  },
  addButton: {
    padding: '15@s',
    backgroundColor: '#0095f6',
    borderRadius: '5@s',
    alignItems: 'center',
    marginTop: '10@s',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default StoriesAndHighlightsModal;