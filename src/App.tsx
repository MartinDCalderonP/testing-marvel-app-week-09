import React from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { paths } from './common/enums';
import RouteWithoutFooter from './components/RouteWithoutFooter';
import RouteWithFooter from './components/RouteWithFooter';
import Home from './pages/Home';
import Characters from './pages/Characters';
import Comics from './pages/Comics';
import Stories from './pages/Stories';
import Detail from './pages/Detail';
import Bookmarks from './pages/Bookmarks';

export default function App() {
	return (
		<Router>
			<Switch>
				<RouteWithoutFooter exact path={paths.home}>
					<Home />
				</RouteWithoutFooter>

				<RouteWithFooter path={`${paths.characters}${paths.page}:page`}>
					<Characters />
				</RouteWithFooter>

				<RouteWithFooter
					path={`${paths.characters}${paths.comic}:comic${paths.page}:page`}
				>
					<Characters />
				</RouteWithFooter>

				<RouteWithFooter
					path={`${paths.characters}${paths.story}:story${paths.page}:page`}
				>
					<Characters />
				</RouteWithFooter>

				<RouteWithFooter path={`${paths.comics}${paths.page}:page`}>
					<Comics />
				</RouteWithFooter>

				<RouteWithFooter
					path={`${paths.comics}${paths.format}:format${paths.page}:page`}
				>
					<Comics />
				</RouteWithFooter>

				<RouteWithFooter path={`${paths.stories}${paths.page}:page`}>
					<Stories />
				</RouteWithFooter>

				<RouteWithFooter
					path={`${paths.characters}${paths.search}:searchedTerm${paths.page}:page`}
				>
					<Characters />
				</RouteWithFooter>

				<RouteWithFooter
					path={`${paths.comics}${paths.search}:searchedTerm${paths.page}:page`}
				>
					<Comics />
				</RouteWithFooter>

				<RouteWithFooter
					path={`${paths.stories}${paths.search}:searchedTerm${paths.page}:page`}
				>
					<Stories />
				</RouteWithFooter>

				<RouteWithFooter path={`${paths.characters}/:id`}>
					<Detail type="characters" />
				</RouteWithFooter>

				<RouteWithFooter path={`${paths.comics}/:id`}>
					<Detail type="comics" />
				</RouteWithFooter>

				<RouteWithFooter path={`${paths.stories}/:id`}>
					<Detail type="stories" />
				</RouteWithFooter>

				<RouteWithFooter path={paths.bookmarks}>
					<Bookmarks />
				</RouteWithFooter>

				<Redirect to={{ pathname: `${paths.home}` }} />
			</Switch>
		</Router>
	);
}
