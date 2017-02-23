//node_modules
//var moment = require('moment'); 
var _  = require('cloneextend');

//local modules
var model = require('./modules/model.js');
var spots = require('./spots.js'); 
var crawler = require('./modules/crawler.js')

var astex = "****************************************";

//single spot operation
var spot = spots.getByCode("60250"); //Porto de Imbituba

if (!spot) {
	console.log("Solicited Marinha Code is utterly invalid. Get ahold of this"); 
	throw new Error("Bad Marinha Code"); 
}

printABunchOfStarsAndText(spot.name); 

getAllDataFromSpot(spot); 

function getAllDataFromSpot(spot) {

	var startYear = 2005; 
	var endYear = 2015; 

	var months = require('./months.js'); 

	var countDown = ((endYear - startYear + 1) * months.length); 

	for (var year = startYear; year <= endYear; year++) {
		console.log('processing year : ' + year);

		for (var i = 0; i < months.length; i++) {

			var month = months[i];

			console.log('processing month : ' + month);

			crawler.getRoughData(spot, month, year, function(tds) {
				var tides = loadTides(tds);

				model.saveTides(spot, tides, function () {
					if (0===--countDown) {
						//finnishes program execution 
						getOff(); 
					}
				}); 
			});
		};
	};
}

function formatDate(dateToFormat) {

	// expects DD/MM/YY 
	// returns MM-DD-YYYY

	var dateBits = dateToFormat.split('/'); 

	return (dateBits[1] + '-' + dateBits[0] + '-' + ((dateBits[2].indexOf('20') < 0) ? '20' : '') + dateBits[2]); 
}

function loadTides (tds) {

	var curDate; 
	var on; 

	var day;
	var hour;
	var momentDateTime;

	var tides = []; 

	var endStrongTag = "</strong>";

	for (var i = 0; i <= tds.length; i++) {

		var td = tds[i];

		//last td throws an undefined object breaking down all the code
		if (typeof td !== 'undefined') {

			var indexOfEndStrongTag = td.indexOf(endStrongTag); 

			if (indexOfEndStrongTag >= 0) {

				day = td.substring(indexOfEndStrongTag + endStrongTag.length, td.length);
				day = day.trim(); 

			} else if (td.indexOf(':') >= 0) {

				hour = td.trim(); 

			} else {


				//momentDateTime = moment(day  + ' ' + hour, "DD/MM/YYYY HH:mm");

				var date = formatDate(day) + ' ' + hour; 

				var tide = {
					dt 	: new Date(date), 
					vl 	: parseFloat(td.trim()) 
				};

				tides.push(tide); 
			}
		}
	}

	console.log ('tides size is ' + tides.length);

	return tides; 
}

function printABunchOfStarsAndText(text) {


	for (var i = 5; i >= 0; i--) {
		console.log(astex); 
	};


	console.log(text + '\n'); 

	console.log(astex); 
}

function getOff() {
	console.log(astex);
	console.log("Bye bye crawler"); 
	console.log(astex); 

	process.exit(); 
}

