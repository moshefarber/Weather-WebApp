$(document).ready(function(){
    //City and Weather description are needed to generated images
  
  //When the submit button is clicked, execute this function
	$("#submit").click("Submit",function(e){
  
    e.preventDefault()

    var inputData='';

    //address reads the data in the search box
    var address= $('#search-box').val();

  

    //contents in the address is split and stored in an array
    address=address.split(',');

    //concatanate input data to the url
    var url="http://api.wunderground.com/api/0f6bac9149f85ed4/forecast10day/geolookup/conditions/q";
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
          var city;
          var weather_desc;
          var state;

         console.log(response);

          //variables extracted from JSON response for current conditions
  				var location = response['location']['city']+', '+response['location']['state']+', '+response['location']['zip'];
  				var temp_f = response['current_observation']['temp_f'];
          var temp_c = response['current_observation']['temp_c'];
          var feels_like=response['current_observation']['feelslike_f'];
          var description=response['current_observation']['weather'];
          var gif_url=response['current_observation']['icon_url'];
          city=response['location']['city'];
          weather_desc=response['current_observation']['weather'];
          state =response['location']['state'];

          //Variables are set to the html page for current Conditions
          $("#Location").html(location);
          $("#Temperature_F").html(temp_f+" °F");
          $("#Temperature_C").html(temp_c+" °C");
          $("#Feels_like").html("Feels Like "+feels_like + " °F");
          $("#img_description").html(description );
          document.getElementById('gif_img').innerHTML="<img src= "+gif_url+">";

          //7 Day forecast
          var object= (response.forecast.simpleforecast.forecastday);
          var daily_gif;

          //Sunday
          object=object["9"];
          daily_gif = object.icon_url;
          $("#Sun_data").html("Sunday"+"<br>" +"High: "+object.high.fahrenheit+" °F"+ "<br>"+"Low: "+object.low.fahrenheit+" °F");
          document.getElementById('Sun_img').innerHTML="<img src="+daily_gif+">";
          
          //Monday
          var object= (response.forecast.simpleforecast.forecastday);
          object=object["3"];
          //console.log(object);
          daily_gif = object.icon_url;
          $("#Mon_data").html("Monday"+"<br>" +"High: "+object.high.fahrenheit+" °F"+ "<br>"+"Low: "+object.low.fahrenheit+" °F");
          document.getElementById('Mon_img').innerHTML="<img src="+daily_gif+">";

          //Tuesday
          var object= (response.forecast.simpleforecast.forecastday);
          object=object["4"];
          //console.log(object);
          daily_gif = object.icon_url;
          $("#Tue_data").html("Tuesday"+"<br>" +"High: "+object.high.fahrenheit+" °F"+ "<br>"+"Low: "+object.low.fahrenheit+" °F");
          document.getElementById('Tue_img').innerHTML="<img src="+daily_gif+">";

          //Wednesday
          var object= (response.forecast.simpleforecast.forecastday);
          object=object["5"];
          //console.log(object);
          daily_gif = object.icon_url;
          $("#Wed_data").html("Wednesday"+"<br>" +"High: "+object.high.fahrenheit+" °F"+ "<br>"+"Low: "+object.low.fahrenheit+" °F");
          document.getElementById('Wed_img').innerHTML="<img src="+daily_gif+">";


          //Thursday
          var object= (response.forecast.simpleforecast.forecastday);
          object=object["6"];
          //console.log(object);
          daily_gif = object.icon_url;
          $("#Thu_data").html("Thursday"+"<br>" +"High: "+object.high.fahrenheit+" °F"+ "<br>"+"Low: "+object.low.fahrenheit+" °F");
          document.getElementById('Thu_img').innerHTML="<img src="+daily_gif+">";


          //Friday
          var object= (response.forecast.simpleforecast.forecastday);
          object=object["7"];
          //console.log(object);
          daily_gif = object.icon_url;
          $("#Fri_data").html("Friday"+"<br>" +"High: "+object.high.fahrenheit+" °F"+ "<br>"+"Low: "+object.low.fahrenheit+" °F");
          document.getElementById('Fri_img').innerHTML="<img src="+daily_gif+">";


          //Saturday
          var object= (response.forecast.simpleforecast.forecastday);
          object=object["8"];
          //console.log(object);
          daily_gif = object.icon_url;
          $("#Sat_data").html("Saturday"+"<br>" +"High: "+object.high.fahrenheit+" °F"+ "<br>"+"Low: "+object.low.fahrenheit+" °F");
          document.getElementById('Sat_img').innerHTML="<img src="+daily_gif+">";
          console.log('city'+city);
          console.log('weather'+weather_desc);

          gettyImages(state,weather_desc);
 			 }
		});
    
    function gettyImages(state,weather_desc){
    var apiKey = '9upx676y8p8ufzwbjsu6q5fd';
    var keyWord =weather_desc+" sky";
    console.log('weather_desc = '+keyWord);
    $.ajax({
        type:'GET',
        url:"https://api.gettyimages.com:443/v3/search/images?phrase="+keyWord,
         beforeSend: function (request)
            {
                request.setRequestHeader("Api-Key", apiKey);
            }})
        .done(function(data){
        console.log("Success with data")
        console.log(data);
        var imgURL =data.images[0];
        imgURL=imgURL.display_sizes[0];
        imgURL=imgURL.uri;
        console.log('url'+imgURL);
        document.getElementById('tester').innerHTML="<img src="+imgURL+">";
        document.getElementById('current_result').backgroundImage = "url('img1.jpeg')";

      })
     .fail(function(data){
          alert(JSON.stringify(data,2))
     });
   }

    });
  
});
