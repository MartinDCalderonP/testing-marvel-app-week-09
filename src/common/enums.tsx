export enum paths {
	home = '/home',
	characters = '/characters',
	comics = '/comics',
	stories = '/stories',
	bookmarks = '/bookmarks',
	search = '/search_query=',
	page = '&page=',
	comic = '&comic=',
	story = '&story=',
	format = '&format=',
}

export enum API {
	baseUrl = 'https://gateway.marvel.com:443/v1/public/',
	characters = 'https://gateway.marvel.com/v1/public/characters',
	comics = 'https://gateway.marvel.com/v1/public/comics',
	stories = 'https://gateway.marvel.com/v1/public/stories',
	limit = 'limit=',
	offset = 'offset=',
	charactersSearch = 'nameStartsWith=',
	comicsSearch = 'titleStartsWith=',
	storiesSearch = 'titleStartsWith=',
	comic = 'comic=',
	story = 'story=',
	format = 'format=',
}
