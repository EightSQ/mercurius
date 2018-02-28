import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

export default class StepList extends Component {
	render() {
		if (this.props.parcelData !== undefined) {

		let steps = this.props.parcelData.steps;
		steps.forEach((e,i) => {
			e.key = this.props.parcelData.hupid + i.toString();
		});

		return (
			<table id="steplist">
				<tbody>
					<tr>
						<th>Zeit</th>
						<th>Transportschritt</th>
					</tr>
					{steps.map((step) => {
						let timestamp = step.time;
						return (
							<tr key={step.key}>
								<td>{timestamp.toLocaleDateString() + " " + timestamp.toLocaleTimeString().slice(0,5)}</td>
								<td><strong>{step.text}</strong><br/><small>{step.longtext}</small></td>
							</tr>
						);
					})}
				</tbody>
			</table>
		);

		}

		return <p></p>; // empty fallback;
	}
}
