import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

import { theme } from '../../global/styles/theme';

import { SVGcheboxIcon } from '../../images/svg/SVGcheboxIcon';
import { SVGchetoBoxIcon } from '../../images/svg/SVGchecktoBoxIcon';

export const Checkbox = ({ text, isChecked, handleCheckboxToggle }) => {
	return (
		<TouchableOpacity onPress={handleCheckboxToggle}>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				{isChecked ? (
					<>
						<View style={styled.box}>
							<SVGcheboxIcon />
						</View>
						<View style={styled.check}>
							<SVGchetoBoxIcon />
						</View>
					</>
				) : (
					<View style={styled.box}>
						<SVGcheboxIcon />
					</View>
				)}
				<Text style={styled.text}>{text}</Text>
			</View>
		</TouchableOpacity>
	);
};

const styled = ScaledSheet.create({
	box: {
		position: 'relative',
	},
	check: {
		position: 'absolute',
		left: '5@s',
	},
	text: {
		maxWidth: '90%',
		marginLeft: '10@s',
		fontFamily: theme.fonts.fontPoppinsMedium,
		fontSize: '13@s',
	},
});
