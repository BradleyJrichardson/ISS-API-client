// function to reuse and round lat long to two decimals
function round(value, decimals) {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}
round(1.005, 2);
let firstTime = true;
// getting ISS data and setting the lat long in the html
const api_url = "https://api.wheretheiss.at/v1/satellites/25544";
async function getISS() {
  const response = await fetch(api_url);
  const data = await response.json();

  console.log(data);
  const lat = round(data.latitude, 2);
  const long = round(data.longitude, 2);
  const velocity = `${data.velocity.toFixed(2)} km/ps `;
  document.getElementById("lat").innerText = lat;
  document.getElementById("long").innerText = long;
  document.getElementById("velocity").innerText = velocity;
  console.log(typeof lat);

  marker.setLatLng([lat, long]);
  if (firstTime) {
    mymap.setView([lat, long], 2);
    firstTime = false;
  }
}

// initialization of map
const mymap = L.map("issMap").setView([0, 0], 1);
L.tileLayer(
  "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic3VwZXJzdHIxOSIsImEiOiJjanc5dGdjM2QwMnRuNDhtc281d2xpdmJ0In0.q0W82EHxIe8ySAYe_8trdQ",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken:
      "pk.eyJ1Ijoic3VwZXJzdHIxOSIsImEiOiJjanc5dGdjM2QwMnRuNDhtc281d2xpdmJ0In0.q0W82EHxIe8ySAYe_8trdQ"
  }
).addTo(mymap);

const issIcon = L.icon({
  iconUrl: "iss200.png",
  iconSize: [50, 32],
  iconAnchor: [25, 16]
});
const marker = L.marker([0, 0], { icon: issIcon }).addTo(mymap);
marker
  .bindPopup("<b>Hello!</b><br>I am the International Space Station")
  .openPopup();
// alternagtive syntax without await
//
// fetch("https://api.wheretheiss.at/v1/satellites/25544")
//   .then(response => {
//     console.log(response);
//     return response.json();
//   })
//   .then(json => {
//     console.log(json);
//   });

getISS();
setInterval(getISS, 1000);
