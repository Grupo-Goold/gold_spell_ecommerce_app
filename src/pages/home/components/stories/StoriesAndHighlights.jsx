import { useCallback, useEffect, useState } from "react";
import { highlightsOrder } from "./highlightsOrder";
import { ScaledSheet } from "react-native-size-matters";
import { theme } from "../../../../global/styles/theme";
import { Modal, ScrollView, Text, View } from "react-native";
import { HighlightsList } from "./HighlightsList";
import { StoryListItem } from "./StoryListItem";
import { StoriesModalCarousel } from "./StoriesModalCarousel";

export const StoriesAndHighlights = ({
	initialStories,
	initialHighlights,
}) => {
	const [imageUrl, setImageUrl] = useState(null);
	const [showStoriesModal, setShowStoriesModal] = useState(false);
	const [showHighlightsModal, setShowHighlightsModal] = useState(false);
	const [isRunning, setIsRunning] = useState(true);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [highlightsMedia, setHighlightsMedia] = useState([]);

	const handleShowModal = useCallback(
		(modalShowSetter) => {
			modalShowSetter(true);
		}, [],
	);

	const handleClose = useCallback(
		(modalCloseSetter) => {
			setIsRunning(false);
			modalCloseSetter(false);
			setCurrentIndex(0);
		}, [],
	);

	const processHighlights = useCallback((initialHighlights) => {
		const maxId = Math.max(...highlightsOrder.map((order) => order.id), 0);

		const orderHighlightsById = initialHighlights.map((highlight, idx) => {
			const highlightIndex = highlightsOrder.find(
				(order) => order.title === highlight.title,
			);

			const indexValue = highlightIndex ? highlightIndex.id : maxId + idx;

			return { ...highlight, index: indexValue };
		});

		return orderHighlightsById.sort((a, b) => a.index - b.index);
	}, []);

	const highlights = processHighlights(initialHighlights)
	
	const stories = initialStories

	useEffect(() => {
		const getStoryImage = () => {
			const story = stories?.find((story) => story.type_file === '1');
			return story ? story.url : null;
		};

		setImageUrl(getStoryImage());
	}, [stories]);

	if (stories?.length === 0 && highlights?.length === 0) return null;
	
    return (
		<View style={styled.container}>
			<Text style={styled.title}>
                Stories da Goold
            </Text>

            <ScrollView 
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styled.storiesContainer}
                contentContainerStyle={styled.contentContainer}
            >
                {stories && stories?.length > 0 && (
                    <StoryListItem
                        key="stories"
                        handleClick={() => handleShowModal(setShowStoriesModal)}
                        title="Stories"
                        img={imageUrl}
                    />
                )}

                {highlights && highlights.length > 0 && (
                    <HighlightsList
                        handleShowModal={handleShowModal}
                        setShowHighlightsModal={setShowHighlightsModal}
                        highlights={highlights}
                        setHighlightsMedia={setHighlightsMedia}
                    />
                )}
            </ScrollView>

			<Modal
				animationType="slide"
				transparent={false}
				visible={showStoriesModal}
				onRequestClose={() => handleClose(setShowStoriesModal)}
			>
				<StoriesModalCarousel hideModal={() => handleClose(setShowStoriesModal)} stories={stories} />
			</Modal>
			<Modal
				animationType="slide"
				transparent={false}
				visible={showHighlightsModal}
				onRequestClose={() => handleClose(setShowHighlightsModal)}
			>
				<StoriesModalCarousel hideModal={() => handleClose(setShowHighlightsModal)} stories={highlightsMedia} />
			</Modal>
        </View>
	);
};

const styled = ScaledSheet.create({
    container: {
        width: '100%',
		paddingVertical: '20@s',
    },
    title: {
        flex: 1,
        fontFamily: theme.fonts.fontPoppinsSemiBold,
        fontSize: '20@s',
        color: theme.colors.quaternaryColor,
    },
    storiesContainer: {
        overflowX: 'auto',
    },
    contentContainer: {
        flexDirection: 'row',
        gap: '5@s',
    },
});
