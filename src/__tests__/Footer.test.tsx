import { render } from '@testing-library/react';
import Footer from '../components/Footer';

test('should be rendered', () =>   {
    const { getByText } = render(<Footer />);
    const linkElement = getByText(/All rights reserved/i);
    expect(linkElement).toBeInTheDocument();
})
