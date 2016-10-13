var express = require('express');
var router = express.Router();

var GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');

var doc = new GoogleSpreadsheet('15lIZjkAwgvjxTo01hWJIs87Pc8_HwmTwdC_hZ3hDm_M');
var sheet;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/bookroom', function(req, res, next) {
	async.waterfall([
		function setAuth(step) {
			var creds = require('../Music Room Booking-ec46df38383a.json');

			doc.useServiceAccountAuth(creds, step);
		},
		function getInfoAndWorksheets(step) {
			doc.getInfo(function(err, info) {
				sheet = info.worksheets[req.body.room];
				step();
			});
		},
		function getRow(step) {
			sheet.getRows({
				offset: 1,
				limit: 200
			}, function(err, rows) {
				var targetRowIndex;
				rows.forEach(function(row, index) {
					if (req.body.date == Date.parse(row['dates'])) {
						targetRowIndex = index;
					}
				});
				if (!targetRowIndex) {
					throw 'Specified date not found';
				}
				step(null, targetRowIndex);
			});
		},
		function getCell(targetRowIndex, step) {
			sheet.getCells({
				'min-row': targetRowIndex + 2,
				'max-row': targetRowIndex + 2
			}, function(err, cells) {
				console.log(cells);
				step(null, cells[parseInt(req.body.time) + 1]);
			});
		}
	], function(err, result) {
		res.send(result);
	});
});

module.exports = router;
