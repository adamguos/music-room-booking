angular.module('musicRoomBooking')

	.controller('BookingFormCtrl', ['$scope', 'bookingFormFactory', function($scope, bookingFormFactory) {

		$scope.submit = function() {
			var form = {
				name: $scope.form.name,
				date: $scope.form.date.valueOf(),
				time: $scope.form.time,
				room: $scope.form.room
			};

			bookingFormFactory.post(form, function(data, err) {
				if (err) {
					console.log(err);
					return;
				}
				console.log(data);
			});
		};
	}])
;
