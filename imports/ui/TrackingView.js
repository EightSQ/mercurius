import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Redirect } from 'react-router';

import ParcelDataView from './ParcelDataView';


const UNKNOWN_PARCEL_TEXT = "Leider ist uns bisher noch nichts über diese Sendung bekannt. Bitte versuchen sie es später noch einmal.";

export default class TrackingView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			action: "loading"
		};
		Meteor.call('checkHupid', this.props.match.params.hupid, (err, res) => {
			let newState = this.state;
			newState.action = res;
			if (err) {
				newState.action = "faulty";
			}
			this.setState(newState);
		});
	}
	render() {
		switch(this.state.action) {
			case "loading":
				return (<p>Loading...</p>);
				break;
			case "faulty":
				return <Redirect to="/"/>;
				break;
			case "unknown":
				return <p style={{margin: '10px'}}>{UNKNOWN_PARCEL_TEXT} <a href="/">Zurück</a></p>
			case "showData":
			default:
				return <ParcelDataView
							hupid={this.props.match.params.hupid}
							action={this.state.action}/>;
				break;
		}
	}
}

