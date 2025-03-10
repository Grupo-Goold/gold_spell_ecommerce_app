import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

import { theme } from '../../global/styles/theme';

export const Button = ({
	title,
	type,
	loading,
	disabled,
	marginTop,
	marginBottom,
	aditionalStyle,
	height = 40,
	width,
	onPress,
	backgroundColor = theme.colors.primaryColor,
	borderColor,
	textColor = theme.colors.white,
	...props
}) => {
	const handleOnPress = () => {
		if (!loading && !disabled && onPress) {
			onPress();
		}
	};

	const renderText = () => (
		<>{loading ? <ActivityIndicator color={theme.colors.white} size={22} /> : <Text style={[styled.text, { color: textColor }]}>{title}</Text>}</>
	);

	return (
		<TouchableOpacity
			style={[
				styled.button,
				{
					width: width,
					height: height,
					marginTop: marginTop,
					marginBottom: marginBottom,
				},
				aditionalStyle,
				{
					backgroundColor: loading || disabled ? theme.colors.disabled : backgroundColor,
					borderColor: loading || disabled ? theme.colors.disabled : backgroundColor,
				},
			]}
			{...props}
			marginTop={marginTop}
			width={width}
			height={height}
			type={type}
			onPress={handleOnPress}
			disabled={loading || disabled}
		>
			{renderText()}
		</TouchableOpacity>
	);
};

const styled = ScaledSheet.create({
	button: {
		borderRadius: 60,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
	},
	text: {
		fontFamily: theme.fonts.fontPoppinsMedium,
		fontSize: '14@s',
	},
});
