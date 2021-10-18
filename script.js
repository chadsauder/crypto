document.getElementById("weatherSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("weatherInput").value;
  if (value === "")
    return;

  const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=55b699a4a71e7ae5edbf2f85e2eca920";

  fetch(url)
  .then(function(response) {
    console.log(response);
    return response.json();
  }).then(function(json) {
    console.log(json);
    let results = "";
    results += '<h2> Humidity in ' + json.name + "</h2>";
    results += '<h2>' + json.main.humidity + "% </h2>"
    //results += '<h2>' + json.sys.sunrise.substring(0,2) + ":" + json.sys.sunrise.substring(2,4) + "am" + " &deg;F</h2>"
    document.getElementById("humidity").innerHTML = results;
  });

  fetch(url)
  .then(function(response) {
    console.log(response);
    return response.json();
  }).then(function(json) {
    console.log(json);
    let results = "";
    results += '<h2> Sunrise in ' + json.name + "</h2>";
    results += '<h2>' + json.sys.sunrise + "am </h2>"
    //results += '<h2>' + json.sys.sunrise.substring(0,2) + ":" + json.sys.sunrise.substring(2,4) + "am" + " &deg;F</h2>"
    document.getElementById("sunrise").innerHTML = results;
  });


  fetch(url)
  .then(function(response) {
    console.log(response);
    return response.json();
  }).then(function(json) {
    console.log(json);
    let results = "";
    results += '<h2> Weather in ' + json.name + "</h2>";
    for (let i=0; i < json.weather.length; i++) {
      results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"' + 'class="center"/ >';
    }
    results += '<h2>' + json.main.temp + " &deg;F</h2>"
    results += "<p>"
    for (let i=0; i < json.weather.length; i++) {
      results += json.weather[i].description
      if (i !== json.weather.length - 1)
        results += ", "
    }
    results += "</p>";
    document.getElementById("weatherResults").innerHTML = results;
  });

  //put next fetch here for the weather forecast
  const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=55b699a4a71e7ae5edbf2f85e2eca920";
  fetch(url2)
  .then(function(response) {
    return response.json();
  }).then(function(json) {
    console.log(json);
    let forecast = "";
    for (let i=0; i < json.list.length; i++) {
      forecast += "<h2>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY, h:mm:ss a') + "</h2>";
      forecast += "<p>Temperature: " + json.list[i].main.temp + "</p>";
      forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>'
    }
    document.getElementById("forecastResults").innerHTML = forecast;
  });

});
