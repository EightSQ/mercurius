import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import helpers from './helpers.parcels';

export const Parcels = new Mongo.Collection('parcels');

if (Meteor.isServer) {
	Meteor.publish('parcelData', (hupid) => {
		return Parcels.findOne({_id: hupid});
	});
}

Meteor.methods({
	'checkHupid': (hupid) => {
		if (!helpers.isValidHUPID(hupid)) { // check whether entered id is invalid
			return "faulty";
		}
		if (Parcels.findOne({_id: hupid}) !== "undefined") // check whether parcel exists
			return "unknown";
		else
			return "showData"; // parcel exists
	},
	'generateNewHupid': () => {
		return { hupid: helpers.generateRandomHUPID() };
	}
});
