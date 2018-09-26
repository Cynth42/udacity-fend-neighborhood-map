import React, { Component } from 'react'
import './App.css'
import axios from 'axios'

class App extends Component {
  state = {
    venues: []
    //markers: []
  }

  componentDidMount() {
    this.getVenues()
    //this.callMap()

  }

  callMap = () => {
    loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo&callback=initMap')
    window.initMap = this.initMap
  }

  getVenues = () => {
    let endPoint = 'https://api.foursquare.com/v2/venues/explore?'
    let parameters = {
      client_id: 'HBPBAWFIW5MVPI5FEZ1AFVQPEQ4U1LIRYHM44GAKSAUT334F',
      client_secret: 'D5ZWFILS2RF0SJCA0BZNYKVBCKOYXQO1YJANXFQC3XJG03NZ',
      query: 'food',
      near: 'New York, New York',
      v: '20182509' //YYYYDDMM
      }

    axios.get(endPoint + new URLSearchParams(parameters))
    .then(response => {
      this.setState({//setting the state with the data we got from the ajax call
      venues: response.data.response.groups[0].items
     }, this.callMap()) //calling this.loadMap() as a callback - which gets invoked after our ajax call is successful
     })
    .catch(err => {
      console.log('error ' + err)
    //  alert(`${fourSquareFailMsg} ${err}`)
    })
  }

  initMap = () => {

    let myLatLng = {lat: 40.7128, lng: -74.0060}
      // Create a map object and specify the DOM element
      // for display.
    let myMap = new window.google.maps.Map(document.getElementById('map'), {
      center: myLatLng,
      zoom: 16
    })

    //Looping thru venues array to generate markers
    this.sate.venues.map(myVenue => {
      // Create a marker and set its position for each venue.
      let marker = new window.google.maps.Marker({
        map: myMap,
        position: {lat: myVenue.venue.location.lat, lng: myVenue.venue.location.lng},
        title: myVenue.venue.name

      })

    }

  render() {
    return (
      <main>
        <div id="map"></div>
      </main>
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
  script.defer = true;
  script.async = true;
  script.src = url;
  //script.onerror = window.gm_authFailure
  index.parentNode.insertBefore(script, index)
}

export default App
