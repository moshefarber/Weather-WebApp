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
          console.log(response);

  				var location = response['location']['city']+','+response['location']['state']+','+response['location']['zip'];
  				var temp_f = response['current_observation']['temp_f'];
          var temp_c = response['current_observation']['temp_c'];
          var feels_like=response['current_observation']['feelslike_f'];
          var description=response['current_observation']['weather'];
          var gif_url=response['current_observation']['icon_url'];

          $("#Location").html(location);
          $("#Temperature_F").html("farenheit: "+temp_f);
          $("#Temperature_C").html("celcius: "+temp_c);
          $("#Feels_like").html("Feels Like: "+feels_like);
          $("#img_description").html(description);
          document.getElementById('gif_img').innerHTML="<img src= "+gif_url+">";   
 			 }
		});
    });
});
