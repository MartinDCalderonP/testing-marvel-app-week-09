import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { API } from './common/enums';
import characters from './jsons/characters.json';
import comics from './jsons/comics.json';
import stories from './jsons/stories.json';

const server = setupServer(
	rest.get(`${API.characters}`, (req, res, ctx) => {
		return res(ctx.status(200), ctx.json(characters));
	}),

	rest.get(`${API.comics}`, (req, res, ctx) => {
		return res(ctx.status(200), ctx.json(comics));
	}),

	rest.get(`${API.stories}`, (req, res, ctx) => {
		return res(ctx.status(200), ctx.json(stories));
	}),

	rest.get('*', (req, res, ctx) => {
		console.error('Please add request handler for', req.url.toString());
		return res(
			ctx.status(500),
			ctx.json({
				error: 'Please add request handler for ' + req.url.toString(),
			})
		);
	})
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

export { server, rest };
