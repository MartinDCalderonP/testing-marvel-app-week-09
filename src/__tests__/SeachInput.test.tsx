import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('user should navigate to Search page', () => {
	const { getByRole } = render(<App />);
	const anchor = getByRole('link', { name: 'Characters' });
	expect(anchor).toHaveAttribute('href', '/characters&page=1');
	fireEvent.click(anchor, { click: 0 });
	userEvent.type(screen.getByPlaceholderText('Search'), 'Spider');
	userEvent.click(screen.getByRole('button'));
	expect(screen.getByText(/Spider/i)).toBeTruthy();
});
