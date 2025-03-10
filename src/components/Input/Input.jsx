import { ScaledSheet } from 'react-native-size-matters';
import { theme } from '../../global/styles/theme';

import React, { useState } from 'react';

import { Text, TextInput, TouchableOpacity, View } from 'react-native';

import { SVGeyeClosedIcon } from '../../images/svg/SVGeyeClosedIcon';
import { SVGeyeIcon } from '../../images/svg/SVGeyeIcon';

export const Input = ({
	label,
	value,
	width,
	containerStyle,
	placeholder,
	placeholderTextColor,
	errorMessage,
	onChangeText,
	secureTextEntry,
	isError = false,
	...rest
}) => {
	const [currentSecure, setCurrentSecure] = useState(!!secureTextEntry);
	const [isFocused, setIsFocused] = useState(false);

	const handleOnPressEye = () => {
		setCurrentSecure((current) => !current);
	};

	const borderColor = isError ? theme.colors.red0 : theme.colors.grey0;
	const focusedColor = theme.colors.primaryColor;

	return (
		<View style={[styled.inputContainer, { width: width }, containerStyle]}>
			<Text style={styled.label}>{label}</Text>
			<TextInput
				style={[styled.textInput, { borderColor: isFocused ? focusedColor : borderColor }]}
				placeholderTextColor={placeholderTextColor ? placeholderTextColor : theme.colors.grey3}
				placeholder={placeholder}
				value={value}
				onChangeText={onChangeText}
				secureTextEntry={currentSecure}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				isError={!!errorMessage}
				{...rest}
			/>
			{secureTextEntry &&
				(currentSecure ? (
					<TouchableOpacity style={styled.eyeMask} onPress={handleOnPressEye}>
						<SVGeyeIcon width={19.3} height={15} color={isFocused ? focusedColor : theme.colors.grey2} />
					</TouchableOpacity>
				) : (
					<TouchableOpacity style={styled.eyeMask} onPress={handleOnPressEye}>
						<SVGeyeClosedIcon width={22} height={22} color={theme.colors.grey2} />
					</TouchableOpacity>
				))}
			{errorMessage && <Text style={styled.errorMessage}>{errorMessage}</Text>}
		</View>
	);
};

export const styled = ScaledSheet.create({
	inputContainer: {
		// width: "100%",
		position: 'relative',
	},
	label: {
		fontFamily: theme.fonts.fontPoppinsRegular,
		fontSize: '14@s',
		color: theme.colors.black,
	},
	textInput: {
		height: '45@s',
		marginTop: '8@s',
		borderWidth: 1,
		borderRadius: 12,
		borderColor: theme.colors.grey0,
		paddingHorizontal: '16@s',
	},
	errorMessage: {
		marginVertical: 5,
		fontFamily: theme.fonts.fontPoppinsRegular,
		fontSize: '12@s',
		textAlign: 'left',
		color: theme.colors.red0,
	},
	eyeMask: {
		position: 'absolute',
		right: '16@s',
		top: '48@s',
	},
});
