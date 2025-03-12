import { useState } from "react";
import { Image, Text } from "react-native";
import { TouchableOpacity, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

export const StoryListItem = ({
	handleClick,
	img,
	title,
}) => {
	const [isImageLoaded, setIsImageLoaded] = useState(false);

	const handleImageLoad = () => setIsImageLoaded(true);

	return (
        <TouchableOpacity
            onPress={handleClick}
            style={styled.container}
            activeOpacity={0.7}
        >
            <View style={styled.imageContainer}>
                {!isImageLoaded && (
                    <View style={styled.skeleton} />
                )}

                <Image
                    key={`storie-${title}`}
                    source={{ uri: img }}
                    style={[
                        styled.image,
                        !isImageLoaded && styled.invisible
                    ]}
                    onLoadEnd={handleImageLoad}
                />
            </View>

            <Text style={styled.title} numberOfLines={1} ellipsizeMode="tail">
                {title}
            </Text>
        </TouchableOpacity>
	);
};

const styled = ScaledSheet.create({
    container: {
        width: 'auto',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: '4@s',
    },
    imageContainer: {
        position: 'relative',
        borderRadius: '32@s',
        borderWidth: 2,
        borderColor: '#primarycolor', // Replace with your actual primary color
        padding: '4@s',
        marginBottom: '8@s',
    },
    skeleton: {
        height: '64@s',
        width: '64@s',
        borderRadius: '32@s',
        backgroundColor: '#333', // Dark skeleton color
    },
    image: {
        height: '64@s',
        width: '64@s',
        borderRadius: '32@s',
        resizeMode: 'cover',
    },
    invisible: {
        opacity: 0,
    },
    title: {
        width: '92@s',
        textAlign: 'center',
        fontSize: '14@s',
        fontWeight: '400',
    },
});
