import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

class App extends Component {

    componentDidMount() {
      this.callMap()
    }

     callMap = () => {
       loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyARlSeNYJ-pH2neoykbm1cmA8o_6bpdUhY&callback=initMap')

       window.initMap = this.initMap;
     }

     initMap = () => {
        const myLatLng = {lat: 40.608494, lng: -74.142372}

        // Create a map object and specify the DOM element
        // for display.
        const map = new window.google.maps.Map(document.getElementById('map'), {
          center: myLatLng,
          zoom: 14
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

/*

</script>
    <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
    async defer></script>

*/

function loadScript(url) {

  const index = window.document.getElementsByTagName('script')[0];
  const script = window.document.createElement('script');
  script.defer = true;
  script.async = true;
  script.src = url;
  //script.onerror = window.gm_authFailure
  index.parentNode.insertBefore(script, index);
}

export default App
