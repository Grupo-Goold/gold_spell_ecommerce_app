import { ScaledSheet } from "react-native-size-matters";
import { TouchableOpacity, View, Dimensions } from "react-native";
import { theme } from "../../../../global/styles/theme";
import { StoriesCarouselComponent } from "./StoriesCarousel";
import { SVGcloseX } from "../../../../images/svg/SVGcloseX";

export const StoriesDetailsModal = ({ stories, hideModal }) => {
  return (
    <>
      <TouchableOpacity
        style={styles.modalCloseButtonContainer}
        onPress={hideModal}>
        <View style={styles.buttonWrapper}>
          <SVGcloseX color={"white"} />
        </View>
      </TouchableOpacity>

      <View style={styles.storiesWrapper}>
        <StoriesCarouselComponent stories={stories} />
      </View>
    </>
  );
};

const styles = ScaledSheet.create({
  text: {
    fontFamily: theme.fonts.fontPoppinsRegular,
  },
  itemContainer: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  image: {
    width: 85,
    height: 85,
    borderRadius: 50,
  },
  imgContainer: {
    borderWidth: 3,
    borderColor: theme.colors.primaryColor,
    borderRadius: 50,
  },
  modalCloseButtonContainer: {
    position: "absolute",
    top: 45,
    right: 10,
    zIndex: 1000,
  },
  buttonWrapper: {
    backgroundColor: theme.colors.primaryColor,
    padding: 7,
    borderRadius: 50,
    alignSelf: "flex-start",
  },
  storiesWrapper: {
    flex: 1,
    zIndex: 1,
  },
});
