$(document).ready(function(){
	$("#submit").click("Submit",function(e){
		e.preventDefault()
		$.ajax({
    		url: "http://api.wunderground.com/api/0f6bac9149f85ed4/geolookup/conditions/q/NY/Queens.json",
    		dataType : "jsonp",
  			success : function(parsed_json) {
  				var location = parsed_json['location']['city'];
  				var temp_f = parsed_json['current_observation']['temp_f'];
  				alert("Current temperature in " + location + " is: " + temp_f);
 			 }
		});
    });
});
