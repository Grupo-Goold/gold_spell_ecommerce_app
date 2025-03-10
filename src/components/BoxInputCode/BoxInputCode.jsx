import { TextInput, TouchableOpacity } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

import { theme } from '../../global/styles/theme';

export const BoxInputCode = ({ onChangeText, inputRef }) => {
	return (
		<TouchableOpacity style={styled.boxInputValidation} onPress={() => inputRef.current.focus()}>
			<TextInput keyboardType="number-pad" ref={inputRef} onChangeText={onChangeText} maxLength={1} style={{ transform: [{ translateX: 5 }] }} />
		</TouchableOpacity>
	);
};

const styled = ScaledSheet.create({
	boxInputValidation: {
		borderWidth: 1,
		width: '50@s',
		height: '50@s',
		borderRadius: '6@s',
		alignItems: 'center',
		justifyContent: 'center',
		borderColor: theme.colors.primaryColor,
	},
});
