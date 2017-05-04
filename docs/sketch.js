
var mapimg;
var access_token = '?access_token=pk.eyJ1IjoieWFua2VlNTk5NiIsImEiOiJjajBwZmIycW4wMGxnMnFyMmNvcnZuOTd0In0.b2IXC5Q5A23t5pyKUAhuBw';
var clat = 0;
var clon = 0;

var ww = 1024;
var hh = 512;

var zoom = 1;
var earthquakes;

function preload() {
  mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/streets-v9/static/' +
    clat + ',' + clon + ',' + zoom + '/' + ww + 'x' + hh + access_token);
  // earthquakes = loadStrings('http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.csv');
  earthquakes = loadStrings('http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv');
}

function mercX(lon) {
  lon = radians(lon);
  var a = (256 / PI) * pow(2, zoom);
  var b = lon + PI;
  return a * b;
}

function mercY(lat) {
  lat = radians(lat);
  var a = (256 / PI) * pow(2, zoom);
  var b = tan(PI / 4 + lat / 2);
  var c = PI - log(b);
  return a * c;
}

function setup() {
  createCanvas(ww, hh);
  translate(width / 2, height / 2);
  imageMode(CENTER);
  image(mapimg, 0, 0);

  var cx = mercX(clon);
  var cy = mercY(clat);

  for (var i = 1; i < earthquakes.length; i++) {
    var data = earthquakes[i].split(/,/);
    //console.log(data);
    var lat = data[1];
    var lon = data[2];
    var mag = data[4];
    var x = mercX(lon) - cx;
    var y = mercY(lat) - cy;
    mag = pow(10, mag);
    mag = sqrt(mag) * 3;
    var magmax = sqrt(pow(10, 10));
    var d = map(mag, 0, magmax, 0, 180);
    stroke(255, 30, 40);
    fill(255, 30, 40, 170);
    ellipse(x, y, d, d);
  }

// Paste data from output into these next three line
  var lat1 = 58.851465;
  var lon1 = -154.285810;
  var mag1 = 6.8;
// Paste output data above
  var x1 = mercX(lon1) - cx;
  var y1 = mercY(lat1) - cy;
  mag1 = pow(10, mag1);
  mag1 = sqrt(mag1) * 3;
  var magmax1 = sqrt(pow(10, 10));
  var d1 = map(mag1, 0, magmax1, 0, 180);
  stroke(0, 0, 255);
  fill(0, 0, 255, 200);
  ellipse(x1, y1, d1, d1)

// Data to represent a magnitude 9 earthquake in California
//   var lat2 = 34.883962;
//   var lon2 = -119.462865;
//   var mag2 = 9;
//   var x2 = mercX(lon2) - cx;
//   var y2 = mercY(lat2) - cy;
//   mag2 = pow(10, mag2);
//   mag2 = sqrt(mag2) * 3;
//   var magmax2 = sqrt(pow(10, 10));
//   var d2 = map(mag2, 0, magmax2, 0, 180);
//   stroke(0, 0, 255);
//   fill(0, 0, 255, 200);
//   ellipse(x2, y2, d2, d2)
}