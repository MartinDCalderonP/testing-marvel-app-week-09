import RenderWithRouter from '../utils/Wrapper';
import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Section from '../pages/Section';

test('should charge Detail page', async () => {
	const { findByText, getByRole } = RenderWithRouter(
		<Section type="characters" />
	);
	const anchor = await findByText('3-D Man');
	expect(anchor).toHaveAttribute('href', '/characters/1011334');
	fireEvent.click(anchor, { click: 0 });
});
