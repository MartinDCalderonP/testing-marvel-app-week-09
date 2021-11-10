import React from 'react';
import { Route } from 'react-router-dom';
import { ICustomRoute } from '../common/interfaces';
import Navbar from './Navbar';

export default function RouteWithoutFooter({
	children,
	...rest
}: ICustomRoute) {
	return (
		<Route {...rest}>
			<Navbar />
			{children}
		</Route>
	);
}
