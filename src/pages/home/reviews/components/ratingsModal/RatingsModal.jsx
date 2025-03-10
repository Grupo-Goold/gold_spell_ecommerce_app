import { ScaledSheet } from "react-native-size-matters";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import { SVGcloseX } from "../../../../../images/svg/SVGcloseX";

import { theme } from "../../../../../global/styles/theme";
import { Button } from "../../../../../components/Button/Button";
import { Input } from "../../../../../components/Input/Input";
import { StarRatings } from "../../../../productView/components/StarRatings/StarRatings";
import InputCPF from "../InputCPF/InputCPF";
import { useProductContextHook } from "../../../../../contexts/productsContext/ProductsContext";

export const RatingsModal = ({ modalVisible, setModalVisible }) => {
  const { createReviews, selectedProduct, setNewReview } =
    useProductContextHook();

  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    await createReviews(
      selectedProduct.id,
      data,
      setModalVisible,
      navigation,
      setNewReview
    );
    reset();
  };

  const cpfRegex = /^(?:\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/;

  return (
    <Modal
      transparent
      visible={modalVisible}
      animationType="slide"
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView style={styled.modalWrapper}>
          <View style={styled.modalContent}>
            <View style={styled.modalHeader}>
              <View style={styled.closeXAndTitleWrapper}>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <SVGcloseX />
                </TouchableOpacity>
                <Text
                  style={[styled.fonts["poppinsSemiBold"], styled.headerTitle]}
                >
                  Fazer review
                </Text>
              </View>
              <Button
                title={"Confirmar"}
                backgroundColor={theme.colors.primaryColor}
                textColor={"white"}
                width={120}
                borderColor={theme.colors.primaryColor}
                height={35}
                onPress={handleSubmit(onSubmit)}
              />
            </View>
            <View style={styled.mainWrapper}>
              <Controller
                control={control}
                name="cpf"
                rules={{
                  required: "Campo obrigatório!",
                  pattern: {
                    value: cpfRegex,
                    message: "CPF fora de padrão!",
                  },
                }}
                render={({ field }) => (
                  <InputCPF
                    value={field.value}
                    onChange={field.onChange}
                    control={control}
                    errors={errors}
                  />
                )}
              />
              <Text style={[styled.mainWrapperText, styled.fonts["poppins"]]}>
                Para a Gold continuar melhorando e evoluindo avalie nosso
                produto de 1 a 5.
              </Text>
              <Controller
                control={control}
                name="rating"
                render={({ field }) => (
                  <StarRatings
                    rating={field.value}
                    onRating={field.onChange}
                    height={35}
                    width={35}
                    gap={8}
                  />
                )}
              />
              <Controller
                control={control}
                name="review"
                rules={{
                  required: "Campo obrigatório!",
                  minLength: {
                    value: 20,
                    message: "Mínimo 20 caracteres!",
                  },
                  maxLength: {
                    value: 150,
                    message: "Máximo 150 caracteres!",
                  },
                }}
                render={({ field }) => (
                  <Input
                    value={field.value}
                    errorMessage={errors.review?.message}
                    isError={errors.review?.message}
                    placeholder="Insira uma avaliação..."
                    onChangeText={(value) => {
                      field.onChange(value);
                    }}
                    containerStyle={styled.reviewTextInput}
                    multiline
                  />
                )}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styled = ScaledSheet.create({
  modalWrapper: {
    flex: 1,
    backgroundColor: "rgba(248, 248, 248, 0.7)",
  },
  modalContent: {
    backgroundColor: "white",
    marginTop: "90%",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    height: "70%",
  },
  modalHeader: {
    borderBottomWidth: 1,
    borderColor: theme.colors.grey0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "20@s",
    alignItems: "center",
    padding: 10,
    paddingVertical: 20,
  },
  closeXAndTitleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headerTitle: {
    fontSize: "16@s",
  },
  mainWrapper: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 10,
  },
  mainWrapperText: {
    textAlign: "center",
    marginTop: "10@s",
  },
  reviewTextInput: {
    width: "100%",
  },
  fonts: {
    poppinsMedium: {
      fontFamily: theme.fonts.fontPoppinsMedium,
    },
    poppinsSemiBold: {
      fontFamily: theme.fonts.fontPoppinsSemiBold,
    },
    poppins: {
      fontFamily: theme.fonts.fontPoppinsRegular,
    },
  },
});
