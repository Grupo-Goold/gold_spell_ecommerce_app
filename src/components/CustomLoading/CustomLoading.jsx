import { SafeAreaView } from "react-native-safe-area-context";
import { SVGlogo } from "../../images/svg/SVGlogo";
import { theme } from "../../global/styles/theme";
import { ActivityIndicator, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

export const CustomLoading = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <SVGlogo width={90} height={90} />
        <ActivityIndicator size="large" color={theme.colors.primaryColor} />
      </View>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16@s',
  },
});