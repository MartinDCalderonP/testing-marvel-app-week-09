import React from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { paths } from './common/enums';
import Layout from './components/Layout';
import Home from './pages/Home';
import Section from './pages/Section';
import Detail from './pages/Detail';
import Bookmarks from './pages/Bookmarks';

export default function App() {
	return (
		<Router>
			<Switch>
				<Layout exact path={paths.home} footer={false}>
					<Home />
				</Layout>

				<Layout path={`${paths.characters}${paths.page}:page`}>
					<Section type="characters" />
				</Layout>

				<Layout
					path={`${paths.characters}${paths.search}:query${paths.page}:page`}
				>
					<Section type="characters" />
				</Layout>

				<Layout
					path={`${paths.characters}${paths.comic}:comic${paths.page}:page`}
				>
					<Section type="characters" />
				</Layout>

				<Layout
					path={`${paths.characters}${paths.story}:story${paths.page}:page`}
				>
					<Section type="characters" />
				</Layout>

				<Layout path={`${paths.comics}${paths.page}:page`}>
					<Section type="comics" />
				</Layout>

				<Layout path={`${paths.comics}${paths.search}:query${paths.page}:page`}>
					<Section type="comics" />
				</Layout>

				<Layout
					path={`${paths.comics}${paths.format}:format${paths.page}:page`}
				>
					<Section type="comics" />
				</Layout>

				<Layout path={`${paths.stories}${paths.page}:page`}>
					<Section type="stories" />
				</Layout>

				<Layout
					path={`${paths.stories}${paths.search}:query${paths.page}:page`}
				>
					<Section type="stories" />
				</Layout>

				<Layout path={`${paths.characters}/:id`}>
					<Detail type="characters" />
				</Layout>

				<Layout path={`${paths.comics}/:id`}>
					<Detail type="comics" />
				</Layout>

				<Layout path={`${paths.stories}/:id`}>
					<Detail type="stories" />
				</Layout>

				<Layout path={paths.bookmarks}>
					<Bookmarks />
				</Layout>

				<Redirect to={{ pathname: `${paths.home}` }} />
			</Switch>
		</Router>
	);
}
