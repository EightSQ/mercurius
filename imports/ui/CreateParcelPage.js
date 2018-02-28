import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

/* 
 * Dies ist der Component für das kleine CreateParcel-Tool für die
 * Injektion von Demo-Daten
 */
export default class CreateParcelPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			parcelCreated: ''
		};
		this.type = "0"; // initialize form input

		// this-bindings, necessary for React + ES6
		this.typeChangeHandler = this.handleTypeChange.bind(this);
		this.submitHandler = this.handleSubmit.bind(this);
		this.addStepHandler = this.addStep.bind(this);
	}
	// this function gets called on a submit of the create parcel form
	handleSubmit(event) {
		event.preventDefault();
		// call the "createParcel" method in the backend (via WebSockets)
		Meteor.call("createParcel", this.type, (err, res) => {
			// callback: insert hupid of created parcel into component state
			this.setState({
				parcelCreated: res.hupid
			});
			// triggers re-rendering of Component
		});
	}
	handleTypeChange(event) { // type change (select field)
		this.type = event.target.value; // change type variable of this component
	}
	// called when pressed "Sendungsstatus erneuern"
	addStep() {
		// call the "addStep" method in the backend (via WS)
		Meteor.call("addStep", this.state.parcelCreated.toString());
	}
	render() {
		return (
			<div id="createParcelFormContainer">
				<form id="createParcelForm" onSubmit={this.submitHandler}>
					<h2>Neue Sendung erstellen</h2>
					Sendungstyp:
						<select onChange={this.typeChangeHandler} name="sendungstyp">
							<option value="0">Päckchen</option>
							<option value="1">S</option>
							<option value="2">M</option>
							<option value="3">L</option>
							<option value="4">XL</option>
							<option value="5">XXL</option>
						</select>
					<button type="submit">Sendung erstellen</button>
				</form>
				Erstellte Sendung: <a href={"/track/" + this.state.parcelCreated} id="createdParcel">{this.state.parcelCreated}</a><br/>
				<button onClick={this.addStepHandler}>Sendungsstatus erneuern (Schritt einfügen)</button>
			</div>
		);
	}
}
