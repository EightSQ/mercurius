import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import helpers from './helpers.parcels';

export const Parcels = new Mongo.Collection('parcels');

if (Meteor.isServer) {
	Meteor.publish('parcelData', (hupid) => {
		return Parcels.find({hupid: hupid.toString()});
	});

	Meteor.methods({
		'checkHupid': (hupid) => {
			if (!helpers.isValidHUPID(hupid)) { // check whether entered id is invalid
				return "faulty";
			}
			let result = Parcels.findOne({hupid: hupid});
			if (result !== undefined) { // check whether parcel exists
				return "showData";
			}
			else
				return "unknown"; // parcel not exists
		},
		// Folgende Funktionen sind nur zu Demo-Zwecken implementiert:
		'createParcel': (type) => {
			let hupid = helpers.generateRandomHUPIDWithType(type);
			Parcels.insert({hupid: hupid, steps: [{stage: 1, text: 'Sendung erstellt', longtext: 'Die Sendungsdaten wurden elektronisch übermittelt.', time: new Date()}]});
			return { "hupid": hupid };
		},
		'createHalfwayParcel': () => {
			return {};
		},
		'addStep': (hupid) => {
			let record = Parcels.findOne({hupid: hupid});
			if (record === undefined) return;
			let currentStage = record.steps[0].stage;
			if (currentStage === 5) return;
			let nextStep = { stage: currentStage, text: "", longtext: "", time: new Date()};

			switch (currentStage) {
				case 1:
					nextStep.stage++;
					nextStep.text = "Sendung eingeliefert";
					nextStep.longtext = "Sendung wurde in den Paketshop eingeliefert.";
					break;
				case 2:
					nextStep.stage++;
					nextStep.text = "Start-Paketzentrum";
					nextStep.longtext = "Die Sendung wurde im Start-Paketzentrum sortiert";
					break;
				case 3:
					if (record.steps[0].text === "Start-Paketzentrum") {
						nextStep.text = "Ziel-Paketzentrum";
						nextStep.longtext = "Die Sendung wurde im Ziel-Paketzentrum sortiert";
					} else {
						nextStep.stage++;
						nextStep.text = "In Zustellung";
						nextStep.longtext = "Die Sendung wurde vom Fahrer abgeholt und befindet sich in Zustellung.";
					}
					break;
				case 4:
					nextStep.stage++;
					nextStep.text = "Abgeliefert!";
					nextStep.longtext = "Die Sendung wurde erfolgreich zugestellt!";
					break;
				default:
					break;
			}

			
			Parcels.update(
				{hupid: hupid},
				{$push: {
					steps: {
						$each: [ nextStep ],
						$sort: { time: -1 }
					}
				}}
			);

		},
		'generateNewHupid': () => {
			return { hupid: helpers.generateRandomHUPID() };
		}
	});
}

