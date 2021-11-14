import React from 'react';
import { Route } from 'react-router-dom';
import { ICustomRoute } from '../common/interfaces';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children, footer, ...rest }: ICustomRoute) {
	return (
		<Route {...rest}>
			<Navbar />
			{children}
			{footer !== false && <Footer />}
		</Route>
	);
}
