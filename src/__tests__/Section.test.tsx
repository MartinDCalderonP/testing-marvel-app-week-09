import RenderWithRouter from '../utils/Wrapper';
import Section from '../pages/Section';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';

test('should charge Characters page', async () => {
	const { findByText } = RenderWithRouter(<Section type="characters" />);
	const bomb = await findByText(/Bomb/i);
	expect(bomb).toBeInTheDocument();
});

test('should use Select in Characters page', async () => {
	const { findByTestId, findByText } = RenderWithRouter(
		<Section type="characters" />
	);
	const select = await findByTestId('select');
	userEvent.selectOptions(select, '183');
	expect(select).toHaveValue('183');
});

test('should charge Comics page', async () => {
	const { findByText } = RenderWithRouter(<Section type="comics" />);
	const element = await findByText(/Gun Theory/i);
	expect(element).toBeInTheDocument();
});

test('should use Select in Comics page', async () => {
	const { findByTestId } = RenderWithRouter(<Section type="comics" />);
	const select = await findByTestId('select');
	userEvent.selectOptions(select, 'hardcover');
	expect(select).toHaveValue('hardcover');
});

test('should charge Stories page', async () => {
	const { findByText } = RenderWithRouter(<Section type="stories" />);
	const element = await findByText(/Interior/i);
	expect(element).toBeInTheDocument();
});
