import { ScaledSheet } from "react-native-size-matters";

import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { View, Text, TextInput } from "react-native";

import { theme } from "../../../../../global/styles/theme";
import { formatPrice } from "../../../../../utils/utils";

export const PriceSlider = ({
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
}) => {
  const displayMinPrice = formatPrice(minPrice);
  const displayMaxPrice = formatPrice(maxPrice);

  const handleSliderChange = (values) => {
    setMinPrice(values[0]);
    setMaxPrice(values[1]);
  };

  const CustomSliderMarkerLeft = ({ currentValue }) => {
    return (
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            height: 20,
            width: 20,
            borderRadius: 10,
            backgroundColor: "white",
            borderColor: theme.colors.primaryColor,
            borderWidth: 2,
          }}
        />
        <Text
          style={{
            marginBottom: -25,
            fontFamily: theme.fonts.fontPoppinsMedium,
          }}
        >
          {currentValue}
        </Text>
      </View>
    );
  };
  const CustomSliderMarkerRight = ({ currentValue }) => {
    return (
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            marginTop: -25,
            fontFamily: theme.fonts.fontPoppinsMedium,
          }}
        >
          {currentValue}
        </Text>
        <View
          style={{
            height: 20,
            width: 20,
            borderRadius: 10,
            backgroundColor: "white",
            borderColor: theme.colors.primaryColor,
            borderWidth: 2,
          }}
        />
      </View>
    );
  };

  return (
    <View>
      <View style={styled.sliderContainer}>
        <Text
          style={{
            fontFamily: theme.fonts.fontPoppinsRegular,
            fontSize: 16,
            left: -5,
          }}
        >
          Preço
        </Text>

        <MultiSlider
          values={[minPrice, maxPrice]}
          onValuesChange={handleSliderChange}
          min={10}
          max={500}
          step={10}
          allowOverlap={false}
          snapped
          minMarkerOverlapDistance={20}
          isMarkersSeparated={true}
          customMarkerLeft={(e) => {
            return <CustomSliderMarkerLeft currentValue={e.currentValue} />;
          }}
          customMarkerRight={(e) => {
            return <CustomSliderMarkerRight currentValue={e.currentValue} />;
          }}
          trackStyle={{ height: 5, borderRadius: 10 }}
          unselectedStyle={{ backgroundColor: theme.colors.grey0 }}
          selectedStyle={{ backgroundColor: theme.colors.primaryColor }}
          sliderLength={320}
        />
      </View>
      <View style={styled.minMaxWrapper}>
        <TextInput
          style={styled.textInput}
          onChangeText={(text) => setMaxPrice(Number(text))}
          value={String(displayMinPrice)}
          keyboardType="numeric"
          editable={false}
        />
        <TextInput
          style={styled.textInput}
          onChangeText={(text) => setMaxPrice(Number(text))}
          value={String(displayMaxPrice)}
          keyboardType="numeric"
          editable={false}
        />
      </View>
    </View>
  );
};

const styled = ScaledSheet.create({
  sliderContainer: {
    paddingLeft: "20@s",
    marginTop: "10@s",
    alignItems: "flex-start",
    gap: 10,
  },
  textInput: {
    borderColor: theme.colors.grey0,
    borderWidth: 1.5,
    borderRadius: 10,
    width: "45%",
    height: 40,
    fontFamily: theme.fonts.fontPoppinsMedium,
    textAlign: "center",
    color: theme.colors.black,
  },
  minMaxWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: "20@s",
  },
});
