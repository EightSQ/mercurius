import React from 'react';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import TrackingLandingPage from '../../ui/TrackingLandingPage.js';
import TrackingView from '../../ui/TrackingView.js';
import CreateParcelPage from '../../ui/CreateParcelPage.js';

const browserHistory = createBrowserHistory();

/* Hier geschieht das Routing der Webapplikation,
 * die folgende Funktion wird später in das root-Element eingehangen
 * und bestimmt anhand der URL, was angezeigt werden soll
 * (d.h. welcher Component eingehangen werden soll)
 */
export const renderRoutes = () => (
	<Router history={browserHistory}>
		<div>
			<Route exact path="/" component={TrackingLandingPage}/>
			<Route path="/track/:hupid" component={TrackingView}/>
			<Route exact path="/new" component={CreateParcelPage}/>
		</div>
	</Router>
);
