import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Redirect } from 'react-router';

export default class TrackingView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			action: "loading"
		};
		Meteor.call('checkHupid', this.props.match.params.hupid, (err, res) => {
			if (err || res == "faulty") {
				this.setState({ action: "redirectHome" });
			} else if (res == "unknown") {
				this.setState({ action: "unknown" });
			} else {
				this.setState({ action: "showData" });
				Meteor.subscribe('parcelData', { hupid: this.props.match.params.hupid });
			}
		});
	}
	render() {
		switch(this.state.action) {
			case "loading":
				return (<p>I am waiting for data...</p>);
				break;
			case "faulty":
				return <Redirect to="/"/>;
				break;
			case "unknown":
				return <ParcelNotFound/>;
				break;
			case "showData":
			default:
				return <ParcelDataView/>;
				break;
		}
	}
}
