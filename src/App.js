import React, { Component } from 'react'
import Header from './components/header'
import SideBar from './components/sideBar'
import MapDiv from './components/mapDiv'
import Footer from './components/footer'
import axios from 'axios'
import './App.css'

class App extends Component {
  state = {
    venues: [],
    //photos: [],
    markers: [],
    sideBarOpen: false,
    ariaExpand: false
  }

  componentDidMount() {
    this.requestVenues()
  }

  setMap = () => {
   loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyByxHn5EYEBHNx0XmfvEpl7AkuOlPpgM0w&callback=initMap")
   window.initMap = this.initMap
  }
  //Fetch data for locations from FourSquare API
  requestVenues = () => {
   const endPoint = "https://api.foursquare.com/v2/venues/explore?"
   const parameters = {
     client_id: 'MLHQA2SE1RITW4QS0QK3NQU10Y5NFJEJPIG3ABPGM430TSL2',
     client_secret: 'XXJF0ARODKSXK2RSXUJJSPHQCV14AINHFSWAN4RTG0KNAQAJ',
     query: 'arts',
     near: 'New York City',
     limit: 6,
     venuePhotos: 1,
     v: '20182609' //YYYYDDMM
  }

  axios.get(endPoint + new URLSearchParams(parameters))
  .then(response => {
     this.setState({
      venues: response.data.response.groups[0].items.slice(0, 12)
     }, this.setMap())

     let requests = []
     for (let i = 0; i < this.state.venues.length; i++) {
       const venueId = this.state.venues[i].venue.id;
       console.log(venueId);
       requests.push(axios.get(`https://api.foursquare.com/v2/venues/${venueId}/photos?`))
       let photosEndpoint = `https://api.foursquare.com/v2/venues/${venueId}/photos?`
        let photosParameters = {
         client_id: 'MLHQA2SE1RITW4QS0QK3NQU10Y5NFJEJPIG3ABPGM430TSL2',
         client_secret: 'XXJF0ARODKSXK2RSXUJJSPHQCV14AINHFSWAN4RTG0KNAQAJ',
         v: '20182609' //YYYYDDMM
        }
       requests.push(axios.get(photosEndpoint + new URLSearchParams(photosParameters)))
       }
      return Promise.all(requests)
      })
     .then((response) => {
      console.log('id reponses:', response.data.response.photos.items[1])
      console.log('id responses:', response.data.response.photos.items[1].prefix.concat(response.data.response.photos.items[1].suffix))
      console.log('id reponses:', response[0].data.response.photos.items)
      console.log('id responses:', response[0].data.response.photos.items[1].prefix.concat(response[0].data.response.photos.items[1].suffix))
    })
   .catch(err => {
    console.log("Error: " + err)
    alert("Error occurred while fetching data from four square API!")
   })
 }

 // Initialize and add the map, venues, markers and set their positions and info windows
 initMap = () => {
  let myLatLng = {lat: 40.7128, lng: -74.0060}
  // Create a map object and specify the DOM element for display.
  let myMap = new window.google.maps.Map(document.getElementById("map"), {
      center: myLatLng,
      Zoom: 16
    })

  let bounds = new window.google.maps.LatLngBounds()
  //create InfoWindow
  let infoWindow = new window.google.maps.InfoWindow()
    this.state.venues.forEach(myVenue => {
      console.log(myVenue)
      let name = `${myVenue.venue.name}`
      let addressOne = `${myVenue.venue.location.formattedAddress[0]}`
      let addressTwo = `${myVenue.venue.location.formattedAddress[1]}`
      let addressThree = `${myVenue.venue.location.formattedAddress[2]}`
      //let imageUrl = "https://igx.4sqi.net/img/30x45/4a6cbb32f964a52076d11fe3.png"
      let category = `${myVenue.venue.categories[0].name}`
      //Creates content for InfoWindow
      let contentString = `<div className="content" tabIndex="0">
                              <h3 id="venue">${name}</h3>
                              <p id="adress"><b>${addressOne}<br>
                                 ${addressTwo}<br>
                                 ${addressThree}</b>
                              </p>
                             <div id="body">
                              <p>Type: ${category} </p>
                             </div>
                           </div>`

     //Create a marker and set its position for each venue.
     let myMarker = new window.google.maps.Marker({
       map: myMap,
       position: {lat: myVenue.venue.location.lat, lng: myVenue.venue.location.lng},
       title: myVenue.venue.name,
       id: myVenue.venue.id,
       name: myVenue.venue.name,
       venue: myVenue.venue,
       draggable: false,
      animation: window.google.maps.Animation.drop,
    })

    let venue = new window.google.maps.LatLng(myMarker.position.lat(), myMarker.position.lng())
    bounds.extend(venue)

    function toggleBounce(marker) {
      marker.setAnimation(window.google.maps.Animation.BOUNCE)
      setTimeout(() => {
        marker.setAnimation(null)
      }, 1500)
    }

    //Click on a marker
    myMarker.addListener('click', () => {
      myMap.setCenter(myMarker.getPosition())
      console.log(myMarker)
      toggleBounce(myMarker)

      //Change the content
      infoWindow.setContent(contentString)

      //Open an InfoWindow
      infoWindow.open(myMap, myMarker)

    })
    this.setState({
      markers: [...this.state.markers, myMarker]
    })
    myMap.fitBounds(bounds)
    myMap.panToBounds(bounds)
   })
 }

 //Opens and closes side bar when hamburger menu is clicked
 hamToggleClickHandler = () => {
  this.setState((prevState) => {
    return {
      sideBarOpen: !prevState.sideBarOpen,
      ariaExpand: !prevState.ariaExpand
    }
  })
 }

 //Closes sidebar when menu icon is clicked
 sideCloseClickHandler =() => {
  this.setState({sideBarOpen: false, ariaExpand: false})
 }

 handleMarkerClickEvent = (name) => {
   const newMarker = this.props.markers.find(marker => marker.title === name.venue.name)
   window.google.maps.event.trigger(newMarker, 'click')
 }

 render() {
  let sideBar

  if (this.state.sideBarOpen) {

    sideBar = <SideBar venues={this.state.venues}
    map={this.state.myMap}
    markers={this.state.markers}
    newState={this.filterMarkers}/>
  }

  return (
    <div style={{height: '100%'}}>
      <Header click={this.hamToggleClickHandler} ariaExpand="this.state.ariaExpand"/>
       {sideBar}
      <MapDiv />
      <Footer />
    </div>
  )
 }
}

export default App

/**
 * Asynchronously loads JavaScript <script> tags on a page.
 *Creating script tag for HTML
 *
 */
function loadScript(url) {
  const index = window.document.getElementsByTagName('script')[0]
  const gm_authFailure = window.gm_authFailure = function() {
    alert('Google maps failed to load! Please try again later.')
  }
  const script = window.document.createElement('script')
  script.setAttribute('id', 'map-script')
  script.setAttribute('onerror', 'gm_authFailure')
  script.defer = true
  script.async = true
  script.src = url
  document.body.appendChild(script, index, gm_authFailure)
}
