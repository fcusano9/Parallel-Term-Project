# Parallel-Term-Project

### Description

This program takes earthquake data from the United States Geological Survey (USGS) and uses
it to predict when a future earthquake will occur.

### Technologies Used

- OpenMP
- C++
- Mapbox
- Javascript
- HTML
- p5.js 

### How to use it

1. Clone this repository
2. Run "predict.cpp"
  - You must use the OpenMP command line argument ("-fopenmp") when compiling
  - You also must use the C++ 11 command line argument ("-std=c++11") when compiling
3. After running the program copy the output data
  - This should include Latitude, Longitude, and Magnitude (this is the predicted earthquake)
4. Paste the output data into the bottom of /docs/sketch.js
5. Open /docs/map.html in your web browser to view the map with the predicted earthquake (in blue)
  - All of the red circles are the earthquakes that have occurred in the month of April

### Blog

My blog about this project can be found [here](https://fcusano9.github.io/Parallel-Term-Project/)