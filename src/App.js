import React, { Component } from 'react'
import './App.css'
import axios from 'axios'

window.gm_authFailure = () => {
  alert('Google maps failed to load! Please try again later.')
}

class App extends Component {
  state = {
    venues: [],
    markers: []
  }

  componentDidMount() {
    this.getVenues()
  }

  callMap = () => {
   loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyByxHn5EYEBHNx0XmfvEpl7AkuOlPpgM0w&callback=initMap")
   window.initMap = this.initMap
  }

  getVenues = () => {
   let endPoint = "https://api.foursquare.com/v2/venues/explore?"
   let parameters = {
     client_id: 'HBPBAWFIW5MVPI5FEZ1AFVQPEQ4U1LIRYHM44GAKSAUT334F',
     client_secret: 'D5ZWFILS2RF0SJCA0BZNYKVBCKOYXQO1YJANXFQC3XJG03NZ',
     query: 'food',
     near: 'New York City',
     //limit: 10,
     v: '20182609' //YYYYDDMM
     }

     axios.get(endPoint + new URLSearchParams(parameters))
    .then(response => {
      this.setState({
        venues: response.data.response.groups[0].items
      }, this.callMap())

    })
    .catch(err => {
      console.log("Error: " + err)
      alert("Error occurred while fetching data from four square API!")
    })
  }

//  updateMarkers(){
//    let listItems = document.getElementsByTagName('li')
//    let listItemsArray = Array.from(listItems)
//    let visibleListItems = listItemsArray.filter(li => li.offsetParent!=null)
//    let listIds = visibleListItems.map(item => item.getAttribute('id'))
//  }

  initMap = () => {

    let myLatLng = {lat: 40.7128, lng: -74.0060}
      // Create a map object and specify the DOM element
      // for display.
    let myMap = new window.google.maps.Map(document.getElementById("map"), {
      center: myLatLng,
      zoom: 16

    })

    //create InfoWindow
    let infoWindow = new window.google.maps.InfoWindow()
    //Looping thru venues array to generate markers
    this.state.venues.map(myVenue => {
      console.log(myVenue)
      let name = `${myVenue.venue.name}`
      let address = `${myVenue.venue.location.formattedAddress}`

      let contentString = `<div>
                              <h3>${name}</h3>
                              <p>${address}</p>
                             </div>`


     //Create a marker and set its position for each venue.
      let myMarker = new window.google.maps.Marker({
        map: myMap,
        position: {lat: myVenue.venue.location.lat, lng: myVenue.venue.location.lng},
        title: myVenue.venue.name,
        //draggable = true
        animation: window.google.maps.Animation.DROP
      })

      function toggleBounce(marker) {
        marker.setAnimation(window.google.maps.Animation.BOUNCE)
        //if (marker.getAnimation() !== null) {
        //  marker.setAnimation(null);
        //} else {
      //  marker.setAnimation(window.google.maps.Animation.BOUNCE)
        //}
        setTimeout(() => {
          marker.setAnimation(null)
        }, 1500)
      }

      //Click on a marker
      myMarker.addListener('click', () => {
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
    })

  }

  render() {
    return (
      <main>
        <div id="map"></div>
      </main>
      <div className="container-fluid app-wrap">
        <footer className="app-footer">
          <p className="footer-title">
            copyright (c) 2018{" "}
            <a href="/">
            <strong>Neighborhood Maps</strong>
            </a>{" "}
            All Rights Reserved.
          </p>
        </footer>
      </div>
    )
  }
}

/**
 * Asynchronously loads JavaScript <script> tags on a page.
 * Creating script tag for HTML
 *
 */
 function loadScript(url) {
   const index = window.document.getElementsByTagName('script')[0]
   const script = window.document.createElement('script')
   script.defer = true
   script.async = true
   script.src = url
   script.onerror = window.gm_authFailure
   document.body.appendChild(script, index)
   //index.parentNode.insertBefore(script, index)
 }


 export default App
