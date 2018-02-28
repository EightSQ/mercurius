import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

/*
 * Implementiert Header der TrackingView
 */
export default class TrackingViewHeader extends Component {
	render() {
		// Zeige h2 mit betrachteter HUPID und einem Link zurück zur LandingPage an
		return (
			<div className="header">
				<h2><a href="/"><i className="fas fa-chevron-circle-left"></i></a> Tracking: {this.props.hupid}</h2>
			</div>
		);
	}
}
