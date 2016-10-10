angular.module('musicRoomBooking')

	.controller('BookingFormCtrl', ['$scope', 'bookingFormFactory', function($scope, bookingFormFactory) {
		$scope.submit = function() {
			bookingFormFactory.post($scope.form, function(data, err) {
				if (err) {
					console.log(err);
					return;
				}
				console.log(data);
			});
		};
	}])
;
