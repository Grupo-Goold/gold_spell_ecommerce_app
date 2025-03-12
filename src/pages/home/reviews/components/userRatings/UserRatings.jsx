import { Text, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

import { StarRatings } from '../../../../productView/components/StarRatings/StarRatings';

import { SVGClock } from '../../../../../images/svg/mocks/reviews/SVGClock';
import User from '../../../../../images/svg/SVGUser';

import { theme } from '../../../../../global/styles/theme';

export const UserRatings = ({ name, date, rating, comment }) => {
	const formatarData = (data) => {
		const dataObj = new Date(data);
		const day = String(dataObj.getDate()).padStart(2, '0');
		const abbreviatedMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		const month = abbreviatedMonths[dataObj.getMonth()];
		const year = dataObj.getFullYear();

		return `${day} ${month}, ${year}`;
	};

	const newRating = rating.toFixed(1);

	return (
		<View style={styled.pageWrapper}>
			<View style={styled.upperWrapper}>
				<View style={styled.nameDatePhotoWrapper}>
					<User />
					<View>
						{/* <Text style={styled.fonts["poppinsSemiBold"]}>{name}</Text> */}
						<Text style={styled.fonts['poppinsSemiBold']}>{name}</Text>
						<View style={styled.dateWrapper}>
							<View style={{ height: '80%' }}>
								<SVGClock />
							</View>
							<Text style={styled.fonts['poppins']}>{formatarData(date)}</Text>
						</View>
					</View>
				</View>
				<View style={styled.ratingStarsWrapper}>
					<View style={styled.ratingNumberWrapper}>
						<Text style={styled.fonts['poppinsSemiBold']}>{newRating}</Text>
						<Text style={styled.fonts['poppins']}>Nota</Text>
					</View>
					<View style={styled.starsWrapper}>
						<StarRatings height={13} width={13} rating={rating} gap={1} onRating={null} />
					</View>
				</View>
			</View>
			<View>
				<Text style={[styled.fonts['poppins'], styled.ratingText]}>{comment}</Text>
			</View>
		</View>
	);
};

const styled = ScaledSheet.create({
	pageWrapper: {
		paddingHorizontal: '15@s',
		marginTop: 10,
		gap: 10,
	},
	upperWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		// backgroundColor: "grey",
		justifyContent: 'space-between',
	},
	nameDatePhotoWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
	},
	useContainer: {
		flexDirection: 'row',
	},
	dateWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 5,
	},
	ratingStarsWrapper: {},
	starsWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	ratingNumberWrapper: {
		flexDirection: 'row',
		gap: 7,
	},
	ratingTextWrapper: {},
	ratingText: {
		textAlign: 'justify',
		marginTop: -10,
	},
	fonts: {
		poppins: {
			fontFamily: theme.fonts.fontPoppinsRegular,
			color: theme.colors.grey3,
		},
		poppinsSemiBold: {
			fontFamily: theme.fonts.fontPoppinsSemiBold,
		},
	},
});
