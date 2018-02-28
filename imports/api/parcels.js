import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import helpers from './helpers.parcels';

export const Parcels = new Mongo.Collection('parcels');

if (Meteor.isServer) {
	// publish data for specific HUPID to subscribing clients 
	// necessary for the clients to be able to receive data
	Meteor.publish('parcelData', (hupid) => {
		return Parcels.find({hupid: hupid.toString()});
	});

	Meteor.methods({
		// checkt die Gültigkeit einer geg. HUPID und gibt das Ergebnis zurück
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

		// Erstellt eine neue Sendung mit gegebenen Typ
		'createParcel': (type) => {
			// generate new hupid
			let hupid = helpers.generateRandomHUPIDWithType(type);
			
			// insert into database
			Parcels.insert({hupid: hupid, steps: [{stage: 1, text: 'Sendung erstellt', longtext: 'Die Sendungsdaten wurden elektronisch übermittelt.', time: new Date()}]});
			return { "hupid": hupid };
		},

		// Fügt neuen Sendungsschritt in gegebene Sendung ein, falls nicht schon beendete Sendung
		'addStep': (hupid) => {
			// get current record of parcel
			let record = Parcels.findOne({hupid: hupid});
			if (record === undefined) return; // parcel unknown -> return
			let currentStage = record.steps[0].stage; // get last step (stage) of parcel
			if (currentStage === 5) return; // parcel finished -> return

			// scaffold the new step to insert to the parcel doc in the database
			let nextStep = { stage: currentStage, text: "", longtext: "", time: new Date()};

			// Insert stage-specific texts into new step
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

			// insert new step into the array "steps" of the document of the parcel, ordered by time descending
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

