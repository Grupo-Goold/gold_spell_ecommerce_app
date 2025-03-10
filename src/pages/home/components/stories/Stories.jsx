import { ScaledSheet } from "react-native-size-matters";
import * as VideoThumbnails from "expo-video-thumbnails";
import { theme } from "../../../../global/styles/theme";

import {
  View,
  Text,
  FlatList,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { StoriesDetailsModal } from "./StoriesDetailsModal";

export const Stories = ({ stories }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [thumbnails, setThumbnails] = useState({});

  useEffect(() => {
    const generateThumbnails = async () => {
      const newThumbnails = {};
      for (let story of stories) {
        if (story.type_file === "2" && story.url) {
          try {
            const { uri } = await VideoThumbnails.getThumbnailAsync(story.url, {
              time: 5000,
            });
            newThumbnails[story.url] = uri;
          } catch (error) {
            console.error("Erro ao gerar a miniatura do vídeo:", error);
          }
        }
      }
      setThumbnails(newThumbnails);
    };

    generateThumbnails();
  }, [stories]);

  const renderStories = ({ item }) => {
    const isVideo = item?.type_file === "2";
    const thumbnailUri = isVideo ? thumbnails[item.url] : item.url;

    return (
      <TouchableOpacity onPress={showModal}>
        <View style={styled.itemContainer}>
          <View style={styled.imgContainer}>
            {thumbnailUri ? (
              <Image source={{ uri: thumbnailUri }} style={styled.image} />
            ) : (
              <Text>Carregando...</Text>
            )}
          </View>
          <Text style={styled.title}>{item?.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  return (
    <View>
      <FlatList
        data={[stories[0]]}
        renderItem={renderStories}
        keyExtractor={(item, index) => index}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={hideModal}
      >
        <StoriesDetailsModal hideModal={hideModal} stories={stories} />
      </Modal>
    </View>
  );
};

const styled = ScaledSheet.create({
  itemContainer: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 50,
  },
  title: {
    fontFamily: theme.fonts.fontPoppinsRegular,
  },
  imgContainer: {
    borderWidth: 3,
    borderColor: theme.colors.primaryColor,
    borderRadius: 50,
  },
});
