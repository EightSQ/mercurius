"use strict";

module.exports = {
	// checker function for HUPID validity, returns boolean
	isValidHUPID: (hupid) => {
		let str = hupid.toString();
		let type = parseInt(str.substring(0,1)),
			uid =  parseInt(str.substring(1,8)),
			year = parseInt(str.substring(8,10)),
			day =  parseInt(str.substring(10,13)),
			opz =  parseInt(str.substring(13,15)),
			dpz =  parseInt(str.substring(15,17)),
			chk =  parseInt(str.substring(17,19));
		return ((type + uid - year + day * Math.abs(opz - dpz)) % 100 == chk) ? true : false;
	},
	// generates and returns a random, valid HUPID
	generateRandomHUPID: () => {
		let date = new Date();
		let type = genRandomNumStringBetween(0,9,1),
			uid =  genRandomNumStringBetween(0,9999999,7),
			year = FormatNumberLength(date.getYear()-100,2),
			day =  FormatNumberLength(getDOY(date),3),
			opz =  genRandomNumStringBetween(0,99,2),
			dpz =  genRandomNumStringBetween(0,99,2),
			chk =  FormatNumberLength((parseInt(type)+parseInt(uid)-parseInt(year)+parseInt(day)*Math.abs(parseInt(opz)-parseInt(dpz))) % 100,2);
		return type+uid+year+day+opz+dpz+chk;
	},
	// generates and returns a random, valid HUPID with a specific type
	generateRandomHUPIDWithType: (reqType) => {
		let date = new Date();
		let type = reqType.toString().slice(0,1),
			uid =  genRandomNumStringBetween(0,9999999,7),
			year = FormatNumberLength(date.getYear()-100,2),
			day =  FormatNumberLength(getDOY(date),3),
			opz =  genRandomNumStringBetween(0,99,2),
			dpz =  genRandomNumStringBetween(0,99,2),
			chk =  FormatNumberLength((parseInt(type)+parseInt(uid)-parseInt(year)+parseInt(day)*Math.abs(parseInt(opz)-parseInt(dpz))) % 100,2);
		return type+uid+year+day+opz+dpz+chk;
	}
};

// helper functions for HUPID generation
const genRandomNumStringBetween = (a, b, length) => {
	let num = Math.floor(Math.random()*(b+1)) + a;
	return FormatNumberLength(num, length);
};

const FormatNumberLength = (num, length) => {
    let r = "" + num;
    while (r.length < length) {
        r = "0" + r;
    }
    return r;
}

const getDOY = (date) => {
	let start = new Date(date.getFullYear(), 0, 0);
	let diff = date - start;
	let oneDay = 1000 * 60 * 60 * 24;
	let day = Math.floor(diff / oneDay);
	return day;
};
