// Save search results to page. Need to be saved properly as they are gone on refresh
function searchCity() {
	event.preventDefault();
	var searchInput = document.querySelector("#search-city").value;
	var searchTerm = localStorage.setItem("searchInput", searchInput);
	var historicalSearch = localStorage.getItem("searchInput");
	$(".list-group").append("<li class='list-group-item'>" + historicalSearch);
}

// get the uv index for the current day
function uvIndex() {
	var uvi = "";
	var apiKey = "9fae1d1929b65e250b1be6b3767b24e9";
	var lat = -34.93;
	var lon = 138.6;
	$.ajax({
		url: "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon,
		method: "GET"
	}).then(function(response) {
		uvi = response.value;
		$("#current-uvi").text("UV Index: " + uvi);
	});
}

function weatherForecast() {
	// get all other weather information for the current day
	var weatherImage = "";
	var id = "";
	var apiKey = "9fae1d1929b65e250b1be6b3767b24e9";
	$.ajax({
		url: "http://api.openweathermap.org/data/2.5/weather?q=adelaide&appid=" + apiKey + "&units=metric",
		method: "GET"
	}).then(function(response) {
		var kmph = (response.wind.speed * 3.6);
		$("#current-city").text(response.name + " (" + moment().format("DD/MM/YY") + ") ");
		$("#current-temp").text("Temperature: " + response.main.temp + " ℃");
		$("#current-humidity").text("Humidity: " + response.main.humidity + "%");
		$("#current-wind").text("Wind Speed: " + kmph + " kmph");
		weatherImage = $("<img width='50px' height='50px' style='margin-bottom:10px'>");
		$(weatherImage).attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + ".png");
		$("#current-city").append(weatherImage);
		cityid = response.id;
		console.log(cityid);
		console.log(response);
	});
}

function fiveDayForecast() {
	var apiKey = "9fae1d1929b65e250b1be6b3767b24e9";
	$.ajax({
		url: "http://api.openweathermap.org/data/2.5/forecast?id=" + "2078025" + "&units=metric" + "&appid=" + apiKey,
		method: "GET"
	}).then(function(response) {

		console.log(response); //return whole response
		var firstResponse = response.list[3].dt_txt; //assigns the first listed response value from array.
		var now = moment().format("YYYY-MM-DD HH:mm:00");

		console.log(firstResponse); //returns the var firstResponse
		console.log(now); // the time right now in the same format as currentTime

		// trying to get a valid time as my match
		for (i=0;i<response.length;i++) {
			if (response.list[i].dt_txt.indexOf("2020-01-13 14:45:00")) {
				console.log("woo!");
			}
		}
	});
}

// Run functions
uvIndex();
weatherForecast();
fiveDayForecast();

