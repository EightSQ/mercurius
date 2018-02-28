import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Redirect } from 'react-router';

import TrackingForm from './TrackingForm';

const INVALID_TRACKINGNUMBER_MSG = "Eingegebene Trackingnummer ist ungültig.";

/*
 * Implementiert die LandingPage
 */
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
	// Routine wird aufgerufen, wenn sich Eingabe in Trackingnummer-Eingabefeld
	// ändert.
	handleChange(event) {
		if (event.target.value.length > 19)
			event.target.value = this.enteredHupid; // too long -> set back
		else
			this.enteredHupid = event.target.value; // update memorized input

		// scaffold for new state
		let newState = {
			validity: {
				enableSubmit: false
			}
		};

		// sind unerlaubte (nicht-numerische) Zeichen eingegeben worden?
		if (isNaN(this.enteredHupid)) {
			newState.validity.errormsg = INVALID_TRACKINGNUMBER_MSG;
			newState.validity.enableSubmit = false;
			this.setState(newState);
		}

		else if (this.enteredHupid.length == 19) { // Numerische HUPID mit Länge 19?
			// rufe das Backend zum Überprüfen der HUPID
			Meteor.call("checkHupid", this.enteredHupid, (err, res) => {
				if (res === "showData" || res === "unknown") {
					newState.validity.errormsg = '';
					newState.validity.enableSubmit = true;
				}
				else {
					newState.validity.errormsg = INVALID_TRACKINGNUMBER_MSG;
					newState.validity.enableSubmit = false;
				}
				this.setState(newState);
			});
		}

		else {
			newState.validity.enableSubmit = false;
			newState.validity.errormsg = '';
			this.setState(newState);
		}

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
						submitHandler={this.handleSubmit}
						errtxt={validity.errormsg}/>
				<a className="lp-link" href="/new">Neue Sendung erstellen</a>
			</div>
		);
	}
}
