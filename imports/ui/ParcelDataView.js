import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Redirect } from 'react-router';

import { Parcels } from '../api/parcels.js';

import TrackingViewHeader from './TrackingViewHeader';
import StepView from './StepView';
import StepList from './StepList';

/*
 * abstrakte Komponente zur Komplexitätsbewältigung der Datenanzeige
 * in der TrackingView
 */
class ParcelDataView extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		let action = this.action;
		return (
			<div className="grid">
				<TrackingViewHeader hupid={this.props.hupid}/>
				<StepView parcelData={this.props.parcelData}/>
				<StepList parcelData={this.props.parcelData}/>
			</div>
		);
	}
}

/*
 * eigentlich wird dies zunächst eingehangen. Dies kommt vom Paket
 * 'meteor/react-meteor-data' und sorgt dafür, dass neue Daten in
 * der Datenbank, die uns betreffen, einen Re-Rendering verursachen
 */
export default withTracker(props => {
	const handle = Meteor.subscribe('parcelData', props.hupid);

	return {
		parcelData: Parcels.findOne({hupid: props.hupid.toString()}),
		action: props.action,
		hupid: props.hupid
	};

})(ParcelDataView);
