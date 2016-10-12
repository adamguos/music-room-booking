var express = require('express');
var router = express.Router();

var GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');

var doc = new GoogleSpreadsheet('1E3eVhNAVVUGLci22t-1NL_baH_niIzx2EODVlVIekOw');
var sheet;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/bookroom', function(req, res, next) {
	var name = req.body.name;
	var date = req.body.date;
	var time = req.body.time;
	var room = req.body.room;

	async.series([
		function setAuth(step) {
			var creds = require('../Music Room Booking-ec46df38383a.json');

			doc.useServiceAccountAuth(creds, step);
		},
		function getInfoAndWorksheets(step) {
			doc.getInfo(function(err, info) {
				sheet = info.worksheets[room];
				step();
			});
		},
		function getRow(step) {
			sheet.getRows({
				offset: 1,
				limit: 200
			}, function(err, rows) {
				console.log(rows[1]);
				res.send(rows[1]['p31035-1105']);
			});
		}
	]);
});

module.exports = router;
