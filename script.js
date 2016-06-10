$(document).ready(function(){

  //When the submit button is clicked, execute this function
	$("#submit").click("Submit",function(e){
    e.preventDefault()

    var inputData='';

    //address reads the data in the search box
    var address= $('#search-box').val();

    //contents in the address is split and stored in an array
    address=address.split(',');

    //concatanate input data to the url
    var url="http://api.wunderground.com/api/0f6bac9149f85ed4/geolookup/conditions/q";
    for(var i in address){
        inputData=inputData+'/'+address[i];
    }
    url=url+inputData+".json";
    console.log(url);
    //make the ajax call
		$.ajax({
    		url: url,
        dataType : "jsonp",
  			success : function(response) {
  				var location = response['location']['city'];
  				var temp_f = response['current_observation']['temp_f'];
  				alert("Current temperature in " + location + " is: " + temp_f);
          console.log(response);
 			 }
		});
    });
});
