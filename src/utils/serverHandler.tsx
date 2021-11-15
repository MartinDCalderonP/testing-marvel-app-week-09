import { rest } from 'msw';
import mockResponse from './mockResponse';

const { REACT_APP_API_BASE_URL: baseUrl } = process.env;

const handlers = [
	rest.get(`${baseUrl}/pokemon/`, (req, res, ctx) => {
		mockResponse(req, res, ctx);
	}),
];

export default handlers;
