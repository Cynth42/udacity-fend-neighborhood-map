import React, { Component } from 'react'
import Header from './components/header'
import SideBar from './components/sideBar'
import MapDiv from './components/mapDiv'
import axios from 'axios'
import './App.css'


class App extends Component {
  state = {
    venues: [],
    markers: [],
    sideBarOpen: false,
    ariaExpand: false
  }

/**
 * Invoked immediately all map's info
 * once it's mounted
 */
  componentDidMount() {
    this.requestVenues()
  }

  setMap = () => {
   loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyARlSeNYJ-pH2neoykbm1cmA8o_6bpdUhY&callback=initMap")
   window.initMap = this.initMap
  }

 /**
  * Set up endPoints and Fetch data for locations
  * from FourSquare API-
  * as a third party API
  */
  requestVenues = () => {
   const endPoint = 'https://api.foursquare.com/v2/venues/explore?'
   const parameters = {
     client_id: 'LJL4MUAIUYY1I0YAXEVGQNZU2XNHPIGVQAJYY4K34OUOXGB5',
     client_secret: 'XOJJ5KK5CHZDX5AD1KK2NWS4IRX2JPCHZH31XBR0U4ASDTKO',
     query: 'arts',
     near: 'New York City',
     limit: 6,
     v: '20180910' //YYYYDDMM
  }

  axios.get(endPoint + new URLSearchParams(parameters))
  .then(response => {
     this.setState({
      venues: response.data.response.groups[0].items.slice(0, 12)
     }, this.setMap())
   })
   .catch(err => {
    console.log("Error: " + err)
    alert("Error occurred while fetching data from four square API!")
   })
 }

/**
 * Initialize and add the map, venues markers,
 * info windows and set their positions
 */
 initMap = () => {
  let myLatLng = {lat: 40.7128, lng: -74.0060}
  // Create a map object and specify the DOM element
  // for display.
  let myMap = new window.google.maps.Map(document.getElementById("map"),
  {
    center: myLatLng,
    Zoom: 16
  })

  let bounds = new window.google.maps.LatLngBounds()
  //Create InfoWindow
  let infoWindow = new window.google.maps.InfoWindow()
    this.state.venues.forEach(myVenue => {
      console.log(myVenue)
      let name = `${myVenue.venue.name}`
      let addressOne = `${myVenue.venue.location.formattedAddress[0]}`
      let addressTwo = `${myVenue.venue.location.formattedAddress[1]}`
      let addressThree = `${myVenue.venue.location.formattedAddress[2]}`
      let imageUrl = "https://igx.4sqi.net/img/general/300x200/116412_6WxtqojjksBSE1QM0tWA5uBd7przqWQxfdKSuHfjX9Y.jpg"
      let category = `${myVenue.venue.categories[0].name}`

      //Creates content for InfoWindow: added in a test image
      let contentString = `<div className="content" tabIndex="0">
                              <h3 id="venue" tabIndex="0">${name}</h3>
                              <img tabIndex='0' src=${imageUrl} alt='${name}'/>
                              <p id="adress" tabIndex="0"><b>${addressOne}<br>
                                 ${addressTwo}<br>
                                 ${addressThree}</b>
                              </p>
                             <div id="body" tabIndex="0">
                              <p tabIndex="0">Type: ${category} </p>
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

    //Adds animation to markers
    function toggleBounce(marker) {
      marker.setAnimation(window.google.maps.Animation.BOUNCE)
      setTimeout(() => {
        marker.setAnimation(null)
      }, 1500)
    }

 /**
  * Listens for a click on a marker
  * to open infoWindow
  */
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
 sideCloseClickHandler = () => {
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
    </div>
  )
 }
}

export default App


/**
 * Asynchronously loads JavaScript
 * <script> tags on the page.
 * Creating script tag for HTML
<<<<<<< HEAD
 * Elharony walkthrough helped me understand how to code
=======
 * Elharony walkthrough helped understand how to code
>>>>>>> 92bb5b72ddecd992fd01e6375d147f389a7239e3
 * the loadScript
 * https://www.youtube.com/channel/UCcWSbBe_s-T_gZRnqFbtyIA
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
