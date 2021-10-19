var mymap = L.map("mapid").setView([51.505, -0.09], 13);
var mymarker = null;
var ip = document.querySelector(".tracker__details__ip");
var loc = document.querySelector(".tracker__details__loc");
var time = document.querySelector(".tracker__details__time");
var isp = document.querySelector(".tracker__details__isp");
var zoom = 13;
var currentzoom = mymap.zoom;

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1Ijoic29udGl4IiwiYSI6ImNrdXZmcHdsMzA5N24zMGtmMGQ2eWt0YXgifQ.Op3afRBUA8Bn5IesOXp1xg",
  }
).addTo(mymap);
console.log(mymap);

document.querySelector("#searchloc").addEventListener("submit", geoLoc, false);
function geoLoc(e) {
  if (mymarker !== null) {
    mymarker.remove();
  }
  if (currentzoom !== zoom) {
    zoom = currentzoom;
  }
  fetch(
    "https://geo.ipify.org/api/v2/country,city?apiKey=at_TRYMAjH9JwMubJRZRqs5tUyqGqPeq&domain=" +
      document.querySelector("#address").value
  )
    .then((response) => response.json())
    .then((data) => {
      mymap.flyTo([data.location.lat, data.location.lng], currentzoom);
      mymarker = L.marker([data.location.lat, data.location.lng]).addTo(mymap);
      currentzoom = zoom;
      ip.innerHTML = data.ip;
      loc.innerHTML =
        data.location.city +
        ", " +
        data.location.country +
        ", " +
        data.location.postalCode;
      time.innerHTML = "UTC " + data.location.timezone;
      isp.innerHTML = data.isp;
      console.log(data);
    });

  console.log(e);
  e.preventDefault();
  return false;
}
