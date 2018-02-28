import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

export default class CreateParcelPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			parcelCreated: ''
		};
		this.type = "0";

		this.typeChangeHandler = this.handleTypeChange.bind(this);
		this.submitHandler = this.handleSubmit.bind(this);
		this.addStepHandler = this.addStep.bind(this);
	}
	handleSubmit(event) {
		event.preventDefault();
		Meteor.call("createParcel", this.type, (err, res) => {
			this.setState({
				parcelCreated: res.hupid
			});
		});
	}
	handleTypeChange(event) {
		this.type = event.target.value;
	}
	addStep() {
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
