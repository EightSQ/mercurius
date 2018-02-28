import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

/*
 * Implementiert die blauen Boxen, die den Sendungsverlauf einfach sichtbar machen
 */
export default class StepView extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		if (this.props.parcelData) {

		// überführe Kurztexte aller Steps in ein Array (zur einfacheren Verwendung unten)
		let s = Array(6);
		this.props.parcelData.steps.forEach((e, i) => {
			if (s[e.stage] === undefined)
				s[e.stage] = e.text;
		});
		return (
			<>
				<div className={"step"+ ((s[1] !== undefined) ? ' step_taken' : '')} id="step1">
					<i className="fas fa-desktop"></i><br/>
					<p className="steptext">{s[1]}</p>
				</div>
				<div className={"step"+ ((s[2] !== undefined) ? ' step_taken' : '')} id="step2">
					<i className="fas fa-play"></i><br/>
					<p className="steptext">{s[2]}</p>
				</div>
				<div className={"step"+ ((s[3] !== undefined) ? ' step_taken' : '')} id="step3">
					<i className="fas fa-forward"></i><br/>
					<p className="steptext">{s[3]}</p>
				</div>
				<div className={"step"+ ((s[4] !== undefined) ? ' step_taken' : '')} id="step4">
					<i className="fas fa-truck"></i><br/>
					<p className="steptext">{s[4]}</p>
				</div>
				<div className={"step"+ ((s[5] !== undefined) ? ' step_taken' : '')} id="step5">
					<i className="fas fa-check"></i><br/>
					<p className="steptext">{s[5]}</p>
				</div>
			</>
		);
		}

		else { // empty fallback, to prevent bugs due to multi rendering
			return <div></div>;
		}
	}
}
