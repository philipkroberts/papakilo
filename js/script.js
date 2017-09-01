$(function() {

	  function calculateDistance(origin, destination) {
	    var service = new google.maps.DistanceMatrixService();
	    service.getDistanceMatrix(
	    {
	      origins: [origin],
	      destinations: [destination],
	      travelMode: google.maps.TravelMode.DRIVING,
	      unitSystem: google.maps.UnitSystem.IMPERIAL,
	      avoidHighways: false,
	      avoidTolls: false
	    }, callback);
	  }

	  function callback(response, status) {
	    if (status != google.maps.DistanceMatrixStatus.OK) {
	      $('#result').html(err);
	    } else {
	      var origin = response.originAddresses[0];
	      var destination = response.destinationAddresses[0];
	      if (response.rows[0].elements[0].status === "ZERO_RESULTS") {
	        $('#result').html("Better get on a plane. There are no roads between " + origin + " and " + destination);
	      } else if (response.rows[0].elements[0].distance && response.rows[0].elements[0].duration){
	        var distance = response.rows[0].elements[0].distance;
	        var distance_value = distance.value;
	        var distance_text = distance.text;
	        var miles = distance_text.substring(0, distance_text.length - 3);
	        var duration = response.rows[0].elements[0].duration;
	        var duration_text = duration.text;
	        $('#result').html("It is " + miles + " miles from " + origin + " to " + destination + ". It will take " + duration_text + " to drive there.");
	      } else {
	      	return;
	      }
	    }
	  }

	  function populateInputWithSelectValue(selectedLocation, id){
	  	// If first dropdown selected, populate origin
	  	if (id === "locationDropDown") {
	  	 	$('#origin').val(selectedLocation);
	  	// If 2nd dropdown selected, populate destination
	  	} else if (id ==="locationDropDown2") {
	  		$('#destination').val(selectedLocation);
	  	}
	  }

	  /** When first dropdown changes. Get its value and pass it to populateInputWithSelectValue function */
	  $('#locationDropDown').change(function(){
	  	var selectedLocation = this.value;
	  	populateInputWithSelectValue(selectedLocation, $('#locationDropDown')[0].id);
	  })
	  /** When second dropdown changes. Get its value and pass it to populateInputWithSelectValue function */
	  $('#locationDropDown2').change(function(){
	  	var selectedLocation = this.value;
	  	populateInputWithSelectValue(selectedLocation, $('#locationDropDown2')[0].id);
	  })
	  
	  /** When calculate is clicked, get value from origin and destination input, pass to calculate distance function.*/  
	  $('#distance_form').submit(function(e){
	      event.preventDefault();
	      var origin = $('#origin').val();
	      var destination = $('#destination').val();
	      var distance_text = calculateDistance(origin, destination);
	  });

	  /** Refresh page when refresh button is clicked */
	  $("#refresh").click(function(){
	  	location.reload();
	  });
	 
	});