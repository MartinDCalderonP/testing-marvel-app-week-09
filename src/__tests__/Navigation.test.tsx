import { fireEvent, screen } from '@testing-library/dom';
import RenderWithRouter from '../utils/Wrapper';
import Home from '../pages/Home';

test('should be in Home page', () => {
	RenderWithRouter(<Home />);
	const locationDiv = screen.getByTestId('location-display');
	expect(locationDiv).toHaveTextContent('/');
});

test('should go to Characters page', () => {
	const { getByRole } = RenderWithRouter(<Home />);
	const anchor = getByRole('link', { name: 'Characters' });
	expect(anchor).toHaveAttribute('href', '/characters&page=1');
	fireEvent.click(anchor, { click: 0 });
	expect(screen.getByTestId('location-display')).toHaveTextContent(
		'/characters'
	);
});

test('should go to Comics page', () => {
	const { getByRole } = RenderWithRouter(<Home />);
	const anchor = getByRole('link', { name: 'Comics' });
	expect(anchor).toHaveAttribute('href', '/comics&page=1');
	fireEvent.click(anchor, { click: 0 });
	expect(screen.getByTestId('location-display')).toHaveTextContent('/comics');
});

test('should go to Stories page', () => {
	const { getByRole } = RenderWithRouter(<Home />);
	const anchor = getByRole('link', { name: 'Stories' });
	expect(anchor).toHaveAttribute('href', '/stories&page=1');
	fireEvent.click(anchor, { click: 0 });
	expect(screen.getByTestId('location-display')).toHaveTextContent('/stories');
});

test('should go to Bookmarks page', () => {
	const { getByRole } = RenderWithRouter(<Home />);
	const anchor = getByRole('link', { name: 'Bookmarks' });
	expect(anchor).toHaveAttribute('href', '/bookmarks');
	fireEvent.click(anchor, { click: 0 });
	expect(screen.getByTestId('location-display')).toHaveTextContent(
		'/bookmarks'
	);
});
