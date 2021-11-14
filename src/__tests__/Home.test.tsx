import { render } from '@testing-library/react';
import Home from '../pages/Home';

test('should be rendered', () => {
	const { getByText } = render(<Home />);
	const textElement = getByText(/Marvel Entertainment/i);
	expect(textElement).toBeInTheDocument();
});
