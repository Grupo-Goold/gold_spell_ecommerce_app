import { Text, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { LinearGradient } from "expo-linear-gradient";

import ToastSuccess from "../images/svg/toast-success";
import ToastError from "../images/svg/toast-error";
import ToastInfo from "../images/svg/toats-info";
import { theme } from "../global/styles/theme";

const toastConfig = {
  sucessoToast: ({ text1, text2 }) => (
    <LinearGradient
      colors={["#08a045", "#04a30a"]}
      style={styles.toastContainer}
      start={{ x: 0.5, y: 0.1 }}
    >
      <View style={styles.mainIcon}>
        <ToastSuccess color={"#08a045"} />
      </View>

      <View style={styles.textContainer}>
        {text1 && <Text style={styles.titleText}>{text1}</Text>}
        {text2 && <Text style={styles.messageText}>{text2}</Text>}
      </View>
    </LinearGradient>
  ),

  erroToast: ({ text1, text2 }) => (
    <LinearGradient
      colors={["#EA0000", "#c90000"]}
      style={styles.toastContainer}
      start={{ x: 0.5, y: 0.1 }}
    >
      <View style={styles.mainIcon}>
        <ToastError color={"#08a045"} />
      </View>

      <View style={styles.textContainer}>
        {text1 && <Text style={styles.titleText}>{text1}</Text>}
        {text2 && <Text style={styles.messageText}>{text2}</Text>}
      </View>
    </LinearGradient>
  ),

  infoToast: ({ text1, text2 }) => (
    <LinearGradient
      colors={["#bfbb8c", "#bfbb8c"]}
      style={styles.toastContainer}
      start={{ x: 1, y: 0.5 }}
    >
      <View style={styles.mainIcon}>
        <ToastInfo color={"#FFD400"} />
      </View>

      <View style={styles.textContainer}>
        {text1 && <Text style={styles.titleText}>{text1}</Text>}
        {text2 && <Text style={styles.messageText}>{text2}</Text>}
      </View>
    </LinearGradient>
  ),

  specialToast: ({ text1, text2 }) => (
    <LinearGradient
      colors={["#EA0000", "#c90000"]}
      style={styles.specialToast}
      start={{ x: 0.5, y: 0.1 }}
    >
      <View style={styles.mainIcon}>
        <ToastError color={"#EA0000"} />
      </View>
      <View style={styles.textContainer}>
        {text1 && <Text style={styles.titleText}>{text1}</Text>}
        {text2 && <Text style={styles.titleText}>{text2}</Text>}
      </View>
    </LinearGradient>
  ),
};

const styles = ScaledSheet.create({
  // Main
  sucesso: {
    width: "90%",
    minHeight: "60@s", // Aumentei para acomodar mais linhas
    backgroundColor: "#08a045",
    borderRadius: "10@s",
    padding: "10@s", // Adicionado padding para melhor espaçamento
  },
  main: {
    width: "100%",
    backgroundColor: "transparent",
    borderRadius: "10@s",
    flexDirection: "row",
    alignItems: "flex-start",
    paddingRight: "10@s",
  },
  mainIcon: {
    backgroundColor: "#fff",
    padding: "10@s",
    height: "55@s",
    width: "50@s",
    borderTopLeftRadius: "8@s",
    borderBottomLeftRadius: "8@s",
    marginRight: "10@s",
    justifyContent: "center",
    alignItems: "center"
  },
  toastContainer: {
    width: "90%",
    height: "55@s",
    borderRadius: "10@s",
    backgroundColor: "blue",
    borderWidth: 0.5,
    flexDirection: "row",
    justifyContent: "flex-start",
    borderColor: theme.colors.grey1,
  },
  toastContent: {
    height: "60@s",
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "blue",
    borderTopLeftRadius: "10@s",
    borderBottomLeftRadius: "10@s",
  },
  specialToast: {
    width: "90%",
    minHeight: "60@s",
    paddingRight: "20@s",
    borderRadius: "10@s",
    padding: "10@s",
  },
  mainSpecial: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%",
    backgroundColor: "transparent",
    borderRadius: "10@s",
    paddingRight: "20@s",
  },
  // Icon Container
  iconContainer: {
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: "10@s",
    borderTopLeftRadius: "10@s",
    borderBottomLeftRadius: "10@s",
    marginRight: "10@s",
  },
  textContainer: {
    paddingVertical: "5@s",
    justifyContent: "center"
  },
  titleText: {
    fontSize: "13@s",
    color: "white",
    fontWeight: "bold",
    marginBottom: "2@s",
  },
  messageText: {
    fontSize: "11@s",
    color: "white",
    marginBottom: "2@s",
  },
  mainText: {
    flex: 1, // Ocupa o espaço restante
    paddingVertical: "5@s",
  },
  text1: {
    fontSize: "13@s",
    color: "white",
    fontWeight: "bold",
    marginBottom: "2@s",
  },
  text2: {
    fontSize: "11@s",
    color: "white",
    marginBottom: "2@s",
  },
  text3: {
    fontSize: "11@s",
    color: "white",
    marginBottom: "2@s",
  },
  text4: {
    fontSize: "11@s",
    color: "white",
  },
});

export default toastConfig;
