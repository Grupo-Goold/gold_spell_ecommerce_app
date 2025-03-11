import { Controller, useForm } from "react-hook-form";
import {
  Modal,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";

import { SVGcloseX } from "../../../../../images/svg/SVGcloseX";

import { useTransition } from "react";
import Toast from "react-native-toast-message";
import { Button } from "../../../../../components/Button/Button";
import { Input } from "../../../../../components/Input/Input";
import { theme } from "../../../../../global/styles/theme";
import { StarRatings } from "../../../../productView/components/StarRatings/StarRatings";
import InputCPF from "../InputCPF/InputCPF";
import TextArea from "../../../../../components/TextArea";

export const RatingsModal = ({ modalVisible, setModalVisible, productId }) => {
	const [isPending, startTransition] = useTransition();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
		startTransition(async () => {
			try {
				createReview(productId, data);

				reset();
				setModalVisible(false);
			} catch (error) {
        Toast.show({
          type: "erroToast",
          text1: "Erro",
          text2: error.response.data.message,
          visibilityTime: 3000,
        });
			}
		});
  };

  const cpfRegex = /^(?:\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/;

  return (
    <Modal
      transparent
      visible={modalVisible}
      animationType="fade"
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styled.overlay}>
        <TouchableOpacity
          style={styled.backdrop}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        />
          <View style={styled.modalContent}>
            <View style={styled.modalHeader}>
              <View style={styled.closeXAndTitleWrapper}>
                <TouchableOpacity
                  style={styled.closeBtn}
                  onPress={() => setModalVisible(false)}
                >
                  <SVGcloseX />
                </TouchableOpacity>
                <Text
                  style={[styled.fonts["poppinsSemiBold"], styled.headerTitle]}
                >
                  Fazer review
                </Text>
              </View>
              <Button
                title={isPending ? 'loading...' : 'Fazer Review'}
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
              <TextArea
                control={control}
                rules={{
                  required: 'Campo obrigatório',
                  minLength: {
                    value: 20,
                    message: "Mínimo 20 caracteres!",
                  },
                  maxLength: {
                    value: 150,
                    message: "Máximo 150 caracteres!",
                  },
                }}
                name="review"
                placeholder="Insira uma avaliação..."
                error={errors.review}
              />
            </View>
          </View>
      </View>
    </Modal>
  );
};

const styled = ScaledSheet.create({
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
  modalContent: {
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    height: 400,
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
  closeBtn: {
    padding: "10@s",
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
