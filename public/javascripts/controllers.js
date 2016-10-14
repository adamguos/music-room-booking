angular.module('musicRoomBooking')

	.controller('BookingFormCtrl', ['$scope', 'bookingFormFactory', function($scope, bookingFormFactory) {

		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth() + 1;
		var yyyy = today.getFullYear();
		if (dd < 10) {
			dd = '0' + dd;
		}
		if(mm < 10) {
			mm = '0' + mm;
    }
		$scope.today = yyyy + '-' + mm + '-' + dd;

		$scope.submit = function() {
			$scope.message = '';

			var form = {
				name: $scope.form.name,
				date: $scope.form.date.valueOf(),
				time: $scope.form.time,
				room: $scope.form.room
			};

			if (!form.name || !form.date || !form.time || !form.room) {
				$scope.message = 'Please fill in all the fields!';
				return;
			};

			bookingFormFactory.post(form, function(data, err) {
				if (err) {
					console.log(err);
					if (err.status == 403) {
						$scope.message = 'Your chosen time slot has already been taken, please choose another one!';
					} else if (err.status == 404) {
						$scope.message = 'Your chosen date is not a school day, please choose another day!';
					}
				} else {
					$scope.message = 'Your time slot has been successfully booked!';
				}
			});
		};
	}])
;
