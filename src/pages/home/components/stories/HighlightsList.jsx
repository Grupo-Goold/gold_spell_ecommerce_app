import { useCallback } from "react";
import { api } from "../../../../services/api";
import { StoryListItem } from "./StoryListItem";

export const HighlightsList = ({
	highlights,
	handleShowModal,
	setShowHighlightsModal,
	setHighlightsMedia,
}) => {
	const handleClick = useCallback(
		async (highlightId) => {
			handleShowModal(setShowHighlightsModal);
			try {
				const response = await api.get(
					`/highlights/${highlightId}`,
				);
				const sortedMedia = response.data.sort(
					(a, b) =>
						new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
				);

				setHighlightsMedia(sortedMedia);
			} catch (error) {
				console.error('Erro ao obter mídias de highlight:', error);
			}
		},
		[handleShowModal, setShowHighlightsModal],
	);

	if (highlights.length === 0) return null;

	return (
		<>
			{highlights?.map((highlight) => (
				<StoryListItem
					key={highlight.instagram_highlight_id}
					handleClick={() => handleClick(highlight.instagram_highlight_id)}
					img={highlight.cover_url}
					title={highlight.title}
				/>
			))}
		</>
	);
};
