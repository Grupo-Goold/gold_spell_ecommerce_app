// Componente para personalizar os ícones do TabNavigator

import { ScaledSheet } from "react-native-size-matters";

import { View } from "react-native";

export const TabIconSVG = ({
  IconComponent,
  color,
  size,
  strokeColor,
  backgroundColor,
}) => {
  return (
    <View style={[styled.iconBackground, { backgroundColor }]}>
      <IconComponent
        color={color}
        size={size}
        strokeColor={strokeColor}
        backgroundColor={backgroundColor}
      />
    </View>
  );
};

const styled = ScaledSheet.create({
  iconBackground: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "10@s",
    width: "40@s",
    height: "40@s",
  },
});
