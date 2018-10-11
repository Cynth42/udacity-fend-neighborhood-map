# React Neighborhood Map: A single Page App - Project 7


### Udacity Front-End Web Developer Nanodegree program - Project's Overview:

This is a single page app created from scratch with `create-react-app`: a React framework. It uses Google Maps API and FourSquare API with ReactJS to display a specific list of locations in New York City.  Six art centers of New York City are featured. It allows you to search and select each venue and get information on its location.  It is accessible - people with disability can easily use this app. Functionality is presented in a usable and responsive manner. It can be used on any screen size device.  The App gives clarity on Reactjs, Service Workers, Responsive design and Accessibility.

![screen-shot-2018](https://user-images.githubusercontent.com/14208716/46741159-6e14e000-cc72-11e8-8db4-267ccb4a40f9.jpg) 
 


## Table of Contents

- [Installation](#installation)
- [Dependencies](#dependencies)
- [Feature](#feature)
- [Usage](#usage)
- [How To Run App In Production](#how-to-run-app-in-production)
- [Attribution](#attribution)
- [Resources](#resources)
- [Credits](#credits)
- [License](#license)
  


  ## Installation
  
* Clone or download the repository from Github or get the 
  [starter code here](https://github.com/Cynth42/udacity-fend-neighborhood-map)
* Open terminal and cd into project's folder.
* Run `npm install`  or `yarn install` to install all of the project's dependencies.
* Then run `npm start` to launch the app if you have downloaded Node.js. 
* A new browser window should automatically open displaying the app if not, 
* Open browser to `http://localhost:3000`.
* If Node.js is not installed, download it [here](https://nodejs.org/en/download/)
* Then follow the above steps 1-4 to install its dependencies and launch the App.
* To use service worker, run `npm build`. Run it only in production mode.


## Dependencies

* Reactjs
* ES6 JavaScript
* HTML
* CSS
* axios API
* Google Maps API
* FourSquare API
* Bootstrap
* Internet Connection to use data from FourSquare API and Google Maps API


## Feature

* Single Page App
* Responsive
* Accessible
* Mobile First
* Offline First(PWA )


## Usage

* The app loads up New York City's map.
* You'll see a search box that has a list of six art centers.
* You can filter the list in the search box to select a location and get information about the location
* Or just click on the markers to learn more about the location.


## How To Run App In Production Mode

* Please note that the service worker will only cache the site 
  when it's in production mode. Therefore go:
* In your terminal, `run npm build`
* Next, npm install -g serve
* Then Serve -s build
* Then navigate to localhost:5000



  
## Resources

These resources were very useful in understanding how to build this project:
1. [React Docs](https://reactjs.org/)
2. [create React documentation](https://github.com/facebookincubator/create-react-app)
3. [Google Maps API Docs](https://developers.google.com/maps/documentation/javascript/adding-a-google-map)
4. [w3schools](https://www.w3schools.com)


## Attribution
 Details about the featured location in this app was provided by FourSquare API


## Credits

 Special thanks and appreciation to the Grow with Google and Udacity Front End Scholarship Program!


## License

 This project is licensed under the terms of the MIT license


