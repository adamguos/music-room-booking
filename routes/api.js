var express = require('express');
var router = express.Router();

var GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');

var doc = new GoogleSpreadsheet('15lIZjkAwgvjxTo01hWJIs87Pc8_HwmTwdC_hZ3hDm_M');
var sheets = [];

/* GET users listing. */
router.get('/events', function(req, res, next) {
	async.waterfall([
		function setAuth(step) {
			var creds;

			if (process.env.NODE_ENV == 'production') {
				creds = {
					client_email: process.env.GS_CLIENT_EMAIL,
					private_key: process.env.GS_PRK
				};
			} else {
				creds = require('../.credentials.json');
			}

			doc.useServiceAccountAuth(creds, step);
		},
		function getInfoAndWorksheets(step) {
			doc.getInfo(function(err, info) {

			})
		}
	])
});

module.exports = router;
