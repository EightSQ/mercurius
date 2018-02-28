import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

export default class TrackingViewHeader extends Component {
	render() {
		return (
			<div className="header">
				<h2><a href="/"><i className="fas fa-chevron-circle-left"></i></a> Tracking: {this.props.hupid}</h2>
			</div>
		);
	}
}
