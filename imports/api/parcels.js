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
		'generateNewHupid': () => {
			return { hupid: helpers.generateRandomHUPID() };
		}
	});
}

