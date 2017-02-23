var request = require("request"); 
var cheerio = require("cheerio"); 
var mongodb = require('./modules/mongoops.js'); 
var _  = require('cloneextend');

var month = "Ago"; 
var year = "2014"; 
var spotMarineCode = "60250";
var htmlExt = ".htm"; 

var pageName = spotMarineCode + month + year + htmlExt; 

var trs = [];
var tds = []; 

var tidesCollName = "tides"; 
var spotsCollName = "spots"; 

var tidesArray = []; // array of day{} 

var day = {
	date : '',
	tides : [] //array of tide{} 
};

var tide = {
	_id : 0,
	hour : '',
	value : 0
};

var endStrongTag = "</strong>";

var tideUrl = "http://www.mar.mil.br/dhn/chm/box-previsao-mare/tabuas/" + pageName; 

var astex = "****************************************";

for (var i = 10; i >= 0; i--) {
	console.log(astex); 
};


request(tideUrl, function (err, resp, body) {

	if (!err && resp.statusCode == 200) {
		var $ = cheerio.load(body);

		var i = 0; 

		$('td').each(function() {

			// eliminates empty tds (width == 50) and the table header
			if (($(this).attr("width") != 50) && i > 4) {
				var txt = $(this).html(); 
				//eliminates td's with no value and valued with only empty spaces
				if (txt != "" &&  txt != "&nbsp;" && txt != "&#xA0;") {
					tds.push(txt);
				}
			}

			i++; 

		}) ;

		loadTides(mongodb.getDb(), tds); 
	}

});

function loadTides (dbx, tds) {

	var curDate; 
	var on; 

	for (var i = 0; i <= tds.length; i++) {

		var td = tds[i];

		console.log(td);

		//TODO
		// check kind of line (if date or value)
		// parse date
		// load value data to the date obj
		//   until next date
		// repeat until last date
		// persist it on mongo collection

		if (td.substring(endStrongTag)) {

		}


	}

}

