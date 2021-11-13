export const isCorrectData = (data: any) => {
	return data?.data && data?.data?.results;
};

export const isCharacter = (data: any) => {
	return data[0]?.name && data;
};

export const isComic = (data: any) => {
	return data[0]?.title && data;
};

export const isStory = (data: any) => {
	return data[0]?.title && data;
};

export const isCorrect = (data: any) => {
	return data[0] && data;
};
