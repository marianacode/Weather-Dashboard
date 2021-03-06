var startDate = moment().format("MM/DD/YYYY");
var day1 = moment().add(1, "days").format("MM/DD/YYYY");
var day2 = moment().add(2, "days").format("MM/DD/YYYY");
var day3 = moment().add(3, "days").format("MM/DD/YYYY");
var day4 = moment().add(4, "days").format("MM/DD/YYYY");
var day5 = moment().add(5, "days").format("MM/DD/YYYY");

$(document).ready(function () {
    console.log("ready!");

    $("#basic-text1").on("click", function (event) {
        event.preventDefault();
        var cityInput = $("#input").val();
        var allCities = [];

        allCities = JSON.parse(localStorage.getItem("allCities")) || [];
        allCities.push(cityInput);
        localStorage.setItem("allCities", JSON.stringify(allCities));

        showWeather(cityInput);
    })
});

function showWeather(cityInput) {

    $("#dailyWeather").empty();
    $("#fiveday").empty();
    $("#day1").empty();
    $("#day2").empty();
    $("#day3").empty();
    $("#day4").empty();
    $("#day5").empty();

    var oneDay = "https://api.openweathermap.org/data/2.5/weather?q="
        + cityInput + "&units=imperial" + "&appid=453878fdfe982b0a2fb17c12c02d111b";
    console.log("oneDay", oneDay);

    $.ajax({
        url: oneDay,
        method: "GET",
    }).then(function (response) {

        var iconUrl = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
        var lat = response.coord.lat;
        var lon = response.coord.lon;

        $("#dailyWeather").append(
            "<div class='col s12 m6'>"
            + "<h2 class='daily'>" + response.name + " (" + startDate + ")" + "&nbsp" + "<img src='" + iconUrl + "'>" + "</h2>"
            + "<ul class='daily'>" + "Temperature: " + response.main.temp + " °F" + "</ul>"
            + "<ul class='daily'>" + "Humidity: " + response.main.humidity + "%" + "</ul>"
            + "<ul class='daily'>" + "Wind Speed: " + response.wind.speed + " MPH" + "</ul>"
            + "</div>"
        );

        var fiveDay = "https://api.openweathermap.org/data/2.5/onecall?"
            + "lat=" + lat + "&lon=" + lon + "&units=imperial" + "&appid=453878fdfe982b0a2fb17c12c02d111b";
        console.log("fiveDay", fiveDay);

        $.ajax({
            url: fiveDay,
            method: "GET",
        }).then(function (response) {

            var iconUrl1 = "http://openweathermap.org/img/w/" + response.daily[0].weather[0].icon + ".png";
            var iconUrl2 = "http://openweathermap.org/img/w/" + response.daily[1].weather[0].icon + ".png";
            var iconUrl3 = "http://openweathermap.org/img/w/" + response.daily[2].weather[0].icon + ".png";
            var iconUrl4 = "http://openweathermap.org/img/w/" + response.daily[3].weather[0].icon + ".png";
            var iconUrl5 = "http://openweathermap.org/img/w/" + response.daily[4].weather[0].icon + ".png";

            $("#dailyWeather").append(
                "<div class='col s12 m6'>"
                + "<button class='w3-button' id='uvIndex' class='daily'>" + "UV Index: " + response.current.uvi + "</button>"
                + "</div>"
            );

            if (response.current.uvi <= 2) {
                $("#uvIndex").addClass("green");
            } else if (response.current.uvi <= 5) {
                $("#uvIndex").addClass("yellow");
            } else if (response.current.uvi <= 7) {
                $("#uvIndex").addClass("orange");
            } else if (response.current.uvi <= 10) {
                $("#uvIndex").addClass("red");
            } else if (response.current.uvi <= 40) {
                $("#uvIndex").addClass("purple");

            };

            $("#fiveDay").append(
                "<div class='col-md-12'>"
                + "<h2 id='fiveDay'>" + "5-Day Forecast:" + "</h2>"
            );

            $("#day1").append(
                "<div class='fiveDayCard card col s12 m6'>"
                + "<div class='card-body'>"
                + "<div class='card-header'>" + day1 + "</div>"
                + "<div class='card-text'>" + "<img src='" + iconUrl1 + "'>" + "</div>"
                + "<div class='card-text'>" + "Temp: " + response.daily[0].temp.day + " °F" + "</div>"
                + "<div class='card-text'>" + "Humidity: " + response.daily[0].humidity + "%" + "</div>"
                + "</div>"
            );

            $("#day2").append(
                "<div class='fiveDayCard card col s12 m6'>"
                + "<div class='card-body'>"
                + "<div class='card-header'>" + day2 + "</div>"
                + "<div class='card-text'>" + "<img src='" + iconUrl2 + "'>" + "</div>"
                + "<div class='card-text'>" + "Temp: " + response.daily[0].temp.day + " °F" + "</div>"
                + "<div class='card-text'>" + "Humidity: " + response.daily[0].humidity + "%" + "</div>"
                + "</div>"
            );

            $("#day3").append(
                "<div class='fiveDayCard card col s12 m6'>"
                + "<div class='card-body'>"
                + "<div class='card-header'>" + day3 + "</div>"
                + "<div class='card-text'>" + "<img src='" + iconUrl3 + "'>" + "</div>"
                + "<div class='card-text'>" + "Temp: " + response.daily[0].temp.day + " °F" + "</div>"
                + "<div class='card-text'>" + "Humidity: " + response.daily[0].humidity + "%" + "</div>"
                + "</div>"
            );

            $("#day4").append(
                "<div class='fiveDayCard card col s12 m6'>"
                + "<div class='card-body'>"
                + "<div class='card-header'>" + day4 + "</div>"
                + "<div class='card-text'>" + "<img src='" + iconUrl4
                + "'>" + "</div>"
                + "<div class='card-text'>" + "Temp: " + response.daily[0].temp.day + " °F" + "</div>"
                + "<div class='card-text'>" + "Humidity: " + response.daily[0].humidity + "%" + "</div>"
                + "</div>"
            );

            $("#day5").append(
                "<div class='fiveDayCard card col s12 m6'>"
                + "<div class='card-body'>"
                + "<div class='card-header'>" + day5 + "</div>"
                + "<div class='card-text'>" + "<img src='" + iconUrl5 + "'>" + "</div>"
                + "<div class='card-text'>" + "Temp: " + response.daily[0].temp.day + " °F" + "</div>"
                + "<div class='card-text'>" + "Humidity: " + response.daily[0].humidity + "%" + "</div>"
                + "</div>"
            );

            showCities();
        })
    })
}




function showCities() {
    $("#cityButtons").empty(); 
    var arrayFromStorage = JSON.parse(localStorage.getItem("allCities")) || []; 
    var arrayLength = arrayFromStorage.length; 
  
    for (var i = 0; i < arrayLength; i++) { 
      var cityNameFromArray = arrayFromStorage[i]; 
  
      $("#cityButtons").append (
        
        "<div class='list-group'>"
    
      
      + "<button class='list-group-item'>" + cityNameFromArray 
      + "</button>")
    } 
  } 
  
  showCities (); 
  
  
  $("#cityButtons").on("click", ".list-group-item", function(event) {
    event.preventDefault();
    var cityInput = ($(this).text());
    showWeather(cityInput); 
  }) 
  
   







