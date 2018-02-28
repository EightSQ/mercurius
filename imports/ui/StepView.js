import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { find } from 'lodash.find';

export default class StepView extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		if (this.props.parcelData) {
//		let s1 = _.find(this.props.parcelData.steps, {"step": 1});
//		let s1t = s1 !== undefined ? s1.text : '';
//		let s2 = _.find(this.props.parcelData.steps, {"step": 2});
//		let s2t = s2 !== undefined ? s2.text : '';
//		let s3 = _.find(this.props.parcelData.steps, {"step": 3});
//		let s3t = s3 !== undefined ? s3.text : '';
//		let s4 = _.find(this.props.parcelData.steps, {"step": 4});
//		let s4t = s4 !== undefined ? s4.text : '';
//		let s5 = _.find(this.props.parcelData.steps, {"step": 5});
//		let s5t = s5 !== undefined ? s5.text : '';
		
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
