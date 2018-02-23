import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

export default class TrackingForm extends Component {
	render() {
		let buttonclass = "trackbutton trackbutton_gray";
		if (this.props.validity.enableSubmit)
			buttonclass = "trackbutton trackbutton_green";
		return (
			<form onSubmit={this.props.submitHandler} id="enter_hupid">
				<h1>mercurius - track your parcel</h1>
				<input className="hupidtextfield" onChange={this.props.changeHandler} type="text" name="hupid_input" size="19"/>
				<button type="submit" className={buttonclass}>
					<i className="fas fa-location-arrow"></i>
				</button>
			</form>
		);
	}
}
