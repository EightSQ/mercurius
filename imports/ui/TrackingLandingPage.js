import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Redirect } from 'react-router';

import TrackingForm from './TrackingForm';

export default class TrackingLandingPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			validity: {}
		};
		this.enteredHupid = '';

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	handleSubmit(event) {
		event.preventDefault();
		this.setState({
			redirect: {
				hupid: this.enteredHupid
			}
		});
	}
	handleChange(event) {
		if (event.target.value.length > 19)
			event.target.value = this.enteredHupid; // too long -> set back
		else
			this.enteredHupid = event.target.value;

		let newState = {
			validity: {
				enableSubmit: false
			}
		};

		if (isNaN(this.enteredHupid)) {
			newState.validity.errormsg = 'Invalid tracking number.';
			newState.validity.enableSubmit = false;
		}

		else if (this.enteredHupid.length == 19) {
			// check for Validity
			//
			// if positive:
			//
			newState.validity.enableSubmit = true;
			// if negative
			//	newState.validity.errormsg = 'Invalid tracking number.';
			// newState.validity.enableSubmit = false;
		}
		this.setState(newState);
	}
	render() {
		const { redirect, validity } = this.state;

		if (redirect) {
			return <Redirect to={"/track/" + redirect.hupid}/>;
		}
		return (
			<div id="lp-container">
				<TrackingForm
						validity={validity}
						changeHandler={this.handleChange}
						submitHandler={this.handleSubmit}/>
			</div>
		);
	}
}
