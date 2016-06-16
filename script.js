$(document).ready(function(){
    //City and Weather description are needed to generated images
  
  //When the submit button is clicked, execute this function
	$("#submit").click("Submit",function(e){
  
    e.preventDefault();
    $(".search").hide();

    var inputData='';

    //address reads the data in the search box
    var address= $('#search-box').val();

  

    //contents in the address is split and stored in an array
    address=address.split(',');

    //concatanate input data to the url
    var url="http://api.wunderground.com/api/0f6bac9149f85ed4/webcams/forecast10day/geolookup/conditions/q";
    console.log('address:'+address[0]);
    inputData=inputData+'/';
    for(var i in address){
        inputData=inputData+address[i]+'%20';
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
          if(weather_desc==="Drizzle" || weather_desc==="Rain" || weather_desc==="Rain Showers" || weather_desc==="Freezing Rain" || weather_desc==="Light Rain"){
            document.body.style.backgroundImage = "url('images/rain.jpg')";
          }
          if(weather_desc==="Snow" || weather_desc==="Snow Grains" || weather_desc==="Low Drifting Snow" || weather_desc==="Blowing Snow" 
            || weather_desc==="Snow Showers"){
            document.body.style.backgroundImage = "url('images/snow.jpg')";
          }
          if(weather_desc==="Mist" || weather_desc==="Rain Mist"){
            document.body.style.backgroundImage = "url('images/mist.jpg')";
          }
          if(weather_desc==="Fog" || weather_desc==="Fog Patches" || weather_desc==="Freezing Fog" || weather_desc==="Patches of Fog" 
            || weather_desc==="Shallow Fog" || weather_desc==="Partial Fog"){
            document.body.style.backgroundImage = "url('images/fog.jpg')";
          }
          if(weather_desc==="Thunderstorm" || weather_desc==="Thunderstorms and Rain" || weather_desc==="Thunderstorms and Snow"){
            document.body.style.backgroundImage = "url('images/thunderstorm.jpg')";
          }
          if(weather_desc==="Overcast"){
            document.body.style.backgroundImage = "url('images/overcast.jpg')";
          }
          if(weather_desc==="Clear"){
            document.body.style.backgroundImage = "url('images/clear.jpg')";
          }
          if(weather_desc==="Partly Cloudy" || weather_desc==="Mostly Cloudy" || weather_desc==="Scattered Clouds"){
            document.body.style.backgroundImage = "url('images/cloudy.jpg')";
          }

          // document.body.style.backgroundImage = "url('images/snow_day.jpg')";
          // $("#results").attr("style","background: url('images/partly_cloudy.jpg') center center; background-size: cover;")
          //document.getElementById("results").style.backgroundImage = "url('images/partly_cloudy.jpg')";
          //document.getElementById("results").style.backgroundSize = "url('images/partly_cloudy.jpg')";

          document.getElementById('gif_img').innerHTML="<img id=main_symbol class=symbols src= "+gif_url+">";
          console.log(weather_desc);





          //7 Day forecast
          var object= (response.forecast.simpleforecast.forecastday);
          var daily_gif;

          //Sunday
          object=object["9"];
          daily_gif = object.icon_url;
          $("#Sun_data").html("Sunday"+"<br>" +"High: "+object.high.fahrenheit+" °F"+ "<br>"+"Low: "+object.low.fahrenheit+" °F");
          document.getElementById('Sun_img').innerHTML="<img class=symbols src="+daily_gif+">";
          
          //Monday
          var object= (response.forecast.simpleforecast.forecastday);
          object=object["3"];
          //console.log(object);
          daily_gif = object.icon_url;
          $("#Mon_data").html("Monday"+"<br>" +"High: "+object.high.fahrenheit+" °F"+ "<br>"+"Low: "+object.low.fahrenheit+" °F");
          document.getElementById('Mon_img').innerHTML="<img class=symbols src="+daily_gif+">";

          //Tuesday
          var object= (response.forecast.simpleforecast.forecastday);
          object=object["4"];
          //console.log(object);
          daily_gif = object.icon_url;
          $("#Tue_data").html("Tuesday"+"<br>" +"High: "+object.high.fahrenheit+" °F"+ "<br>"+"Low: "+object.low.fahrenheit+" °F");
          document.getElementById('Tue_img').innerHTML="<img class=symbols src="+daily_gif+">";

          //Wednesday
          var object= (response.forecast.simpleforecast.forecastday);
          object=object["5"];
          //console.log(object);
          daily_gif = object.icon_url;
          $("#Wed_data").html("Wednesday"+"<br>" +"High: "+object.high.fahrenheit+" °F"+ "<br>"+"Low: "+object.low.fahrenheit+" °F");
          document.getElementById('Wed_img').innerHTML="<img class=symbols src="+daily_gif+">";


          //Thursday
          var object= (response.forecast.simpleforecast.forecastday);
          object=object["6"];
          //console.log(object);
          daily_gif = object.icon_url;
          $("#Thu_data").html("Thursday"+"<br>" +"High: "+object.high.fahrenheit+" °F"+ "<br>"+"Low: "+object.low.fahrenheit+" °F");
          document.getElementById('Thu_img').innerHTML="<img class=symbols src="+daily_gif+">";


          //Friday
          var object= (response.forecast.simpleforecast.forecastday);
          object=object["7"];
          //console.log(object);
          daily_gif = object.icon_url;
          $("#Fri_data").html("Friday"+"<br>" +"High: "+object.high.fahrenheit+" °F"+ "<br>"+"Low: "+object.low.fahrenheit+" °F");
          document.getElementById('Fri_img').innerHTML="<img class=symbols src="+daily_gif+">";


          //Saturday
          var object= (response.forecast.simpleforecast.forecastday);
          object=object["8"];
          //console.log(object);
          daily_gif = object.icon_url;
          $("#Sat_data").html("Saturday"+"<br>" +"High: "+object.high.fahrenheit+" °F"+ "<br>"+"Low: "+object.low.fahrenheit+" °F");
          document.getElementById('Sat_img').innerHTML="<img class=symbols src="+daily_gif+">";
          console.log('city'+city);
          console.log('weather'+weather_desc);

         
   
          setInterval(function(){   
            $(".symbols").animate({height: "80px", width:"80px"})
            $(".symbols").animate({height: "60px", width:"70px"})
          }, 3000)
          //gettyImages(state,weather_desc);
      
 			 }
		});

    /*
    function gettyImages(state,weather_desc){
    var apiKey = '9upx676y8p8ufzwbjsu6q5fd';
    var keyWord =weather_desc+" sky";
    console.log('weather_desc = '+keyWord);
    $.ajax({
        type:'GET',
        url:"https://api.gettyimages.com/v3/search/images?fields=id,title,thumb,referral_destinations&sort_order=best&phrase="+keyWord,
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
  */


function background(weather_desc){
    var keyWord =weather_desc;
    console.log(weather_desc);
    if(keyWord==="Scattered Clouds"){
        document.getElementById('current_result').backgroundImage = "url('images/partly_cloudy.jpg')";
};
};

    });
  
});
