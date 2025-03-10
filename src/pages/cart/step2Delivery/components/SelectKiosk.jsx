import { Text, TouchableOpacity, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { FlatList, ScrollView, GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { CheckBox } from "@rneui/themed";
import { getAllKiosks } from "../../../../services/cart/getAllKiosks";
import { theme } from "../../../../global/styles/theme";

export const SelectKiosk = ({ selectedKiosk, setSelectedKiosk }) => {
    const [selectedCityKiosk, setSelectedCityKiosk] = useState('Todos os Quiosques');
    const [states, setStates] = useState(['Todos os Quiosques']);
    const [kiosks, setKiosks] = useState([]);

    useEffect(() => {
        getAllKiosks({ setKiosks });
    }, []);

    useEffect(() => {
		const newStates = new Set(kiosks?.map((kiosk) => kiosk.state));
		setStates((prevStates) =>
			Array.from(new Set([...prevStates, ...newStates])),
		);
	}, [kiosks]);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ScrollView
                horizontal
                style={styled.scrollContainer}
                contentContainerStyle={styled.contentScroll}
                >
                {states.map((state, i) => (
                    <TouchableOpacity
                        style={selectedCityKiosk == state ? styled.optionSelect : styled.option}
                        onPress={() => setSelectedCityKiosk(state)}
                        key={i}
                        >
                        <Text style={selectedCityKiosk == state ? styled.textSelect : styled.text}>
                            {state}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <FlatList
                data={kiosks}
                scrollEnabled={false}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                <View style={styled.freightWrapper}>
                <View style={styled.checkBoxWrapper}>
                    <CheckBox
                        checked={selectedKiosk?.id === item.id}
                        onPress={() => {
                            setSelectedKiosk(item);
                        }}
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        checkedColor={theme.colors.primaryColor}
                        uncheckedColor={theme.colors.primaryColor}
                    />
                    <View style={styled.checkBoxTextWrapper}>
                        <Text style={styled.fonts["poppinsMedium"]}>
                            {item.kiosk_name}
                        </Text>
                        <Text style={styled.fonts["poppins"]}>{item.state}</Text>
                    </View>
                </View>
                </View>
                )}
                numColumns={1}
                columnWrapperStyle={styled.row}
                contentContainerStyle={styled.productsList}
                removeClippedSubviews={true}
            />
        </GestureHandlerRootView>
    )
}

const styled = ScaledSheet.create({
  scrollContainer: {
    paddingBottom: "10@s",
  },
  contentScroll: {
    gap: "10@s",
  },
  option: {
    paddingHorizontal: "10@s",
    height: "30@s",
    backgroundColor: theme.colors.white,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: "1@s",
    borderColor: theme.colors.grey0,
    borderRadius: "100@s",
  },
  optionSelect: {
    paddingHorizontal: "10@s",
    height: "30@s",
    backgroundColor: theme.colors.primaryColor,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: "1@s",
    borderColor: theme.colors.primaryColor,
    borderRadius: "100@s",
  },
  text: {
    textAlign: "center",
    fontWeight: "500",
    fontSize: "12@s",
  },
  textSelect: {
    color: theme.colors.white,
    textAlign: "center",
    fontWeight: "500",
    fontSize: "12@s",
  },
  freightWrapper: {
    gap: 10,
  },
  checkBoxWrapper: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderColor: theme.colors.grey0,
    paddingVertical: "5@s",
  },
  checkBoxTextWrapper: {
    gap: 5,
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