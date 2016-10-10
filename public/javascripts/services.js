angular.module('musicRoomBooking')

	.factory('bookingFormFactory', ['$http', function($http) {
		var o = {};

		o.post = function(body, callback) {
			$http.post('/bookroom', body).then(function(res) {
				callback(res, null);
			}, function(err) {
				callback(null, err);
			});
		};

		return o;
	}])
;
