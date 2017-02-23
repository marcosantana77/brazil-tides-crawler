var request = require("request"); 
var cheerio = require("cheerio"); 

exports.getRoughData = getData; 


function getData (spot, month, year, callback) {

	var tds = [];
	
	var htmlExt = ".htm"; 

	var pageName = spot.code + month + year + htmlExt; 

	var tideUrl = "http://www.mar.mil.br/dhn/chm/box-previsao-mare/tabuas/" + pageName; 

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
		}
		if (callback) callback(tds); 
	});

}

