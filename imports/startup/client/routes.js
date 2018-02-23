import React from 'react';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import TrackingLandingPage from '../../ui/TrackingLandingPage.js';
import TrackingView from '../../ui/TrackingView.js';

const browserHistory = createBrowserHistory();

export const renderRoutes = () => (
	<Router history={browserHistory}>
		<div>
			<Route exact path="/" component={TrackingLandingPage}/>
			<Route path="/track/:hupid" component={TrackingView}/>
		</div>
	</Router>
);
