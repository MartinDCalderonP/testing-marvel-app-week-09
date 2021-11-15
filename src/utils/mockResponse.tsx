import {
	DefaultRequestBody,
	RequestParams,
	ResponseComposition,
	RestContext,
	RestRequest,
} from 'msw';

type Mock = (
	req: RestRequest<DefaultRequestBody, RequestParams>,
	res: ResponseComposition<any>,
	ctx: RestContext
) => any;

const mockResponse: Mock = (req, res, ctx) => {
	return res(
		ctx.status(200),
		ctx.json({
			//
		})
	);
};

export default mockResponse;
