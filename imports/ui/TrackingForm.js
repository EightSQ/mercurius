import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

/*
 * Implementiert das Tracking-Eingabeformular auf der Landingpage
 */
export default class TrackingForm extends Component {
	render() {
		// decide which classes (designs) to use for the form,
		// in relation to validity of entered HUPID
		let buttonclass = "trackbutton trackbutton_gray";
		let fieldclass = "hupidtextfield hupidtextfield_gray";
		if (this.props.validity.enableSubmit) {
			buttonclass = "trackbutton trackbutton_green";
			fieldclass = "hupidtextfield hupidtextfield_green"
		}

		return (
			<form onSubmit={this.props.submitHandler} id="enter_hupid">
				<h1>mercurius - track your parcel</h1>
				<input className={fieldclass} onChange={this.props.changeHandler} type="text" name="hupid_input" size="19"/>
				<button type="submit" className={buttonclass}>
					<i className="fas fa-location-arrow"></i>
				</button>
				<p className="errortext">{this.props.errtxt}</p>
			</form>
		);
	}
}
