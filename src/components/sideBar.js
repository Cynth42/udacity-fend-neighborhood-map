import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SideBar extends Component {
  static propTypes = {
  markers: PropTypes.array.isRequired,
  venues: PropTypes.array.isRequired
  }

  state = {
    venues: [],
    markers: []
  }

  handleMarkerClickEvent = (name) => {
    const newMarker = this.props.markers.find(marker => marker.title === name.venue.name)
    window.google.maps.event.trigger(newMarker, 'click')
  }

  filterMarkers(event) {
   this.props.markers.forEach(marker => {
     marker.name.toLowerCase().includes(event) ?
     marker.setVisible(true) :
     marker.setVisible(false)
   })
  }

  filterList = (event) => {
    let input, filter, ul, li, a
    input = document.getElementById("input")
    filter = input.value.toLowerCase()
    ul = document.getElementById("ul")
    li = ul.getElementsByTagName("li")

    for ( let i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0]
      if (a.innerHTML.toLowerCase().indexOf(filter) > -1) {
        li[i].style.display = ""
      } else {
        li[i].style.display = "none"
      }
    }
    this.filterMarkers(event.target.value)
  }

  closeNav = () => {
    document.getElementById("side-nav").style.width = "0"
  }

  render() {
    return(
      <div className="side-bar" role='application'>
        <label className="input">
          <input type="text"
          id="input"
          placeholder="Filter Art Centers..."
          onChange={this.filterList}
          aria-label="Filter Art Centers"
          tabIndex="2"
          className="search"/>
        </label>
        <div id="nav-list">
          <nav id="side-nav">
            <a href="/" className="closebtn" onClick={this.closeNav}>&times;</a>
            <ul id="ul">
              {
              this.props.venues.map(myVenue=> {
                return (
                <li role="button" key={myVenue.venue.id}
                  onClick={() => this.handleMarkerClickEvent(myVenue)}
                  onKeyPress={() => this.handleMarkerClickEvent(myVenue)}
                  id={myVenue.venue.name}>
                  <a href="#document-fragment" role="button" tabIndex="0" id={myVenue.venue.name}>
                  {myVenue.venue.name}
                  </a>
                </li>
                )
              })
             }
           </ul>
         </nav>
       </div>
      {this.state.venues.length === 0 && console.log ('Please fetch a new venue')}
   </div>
  )
 }
}

export default SideBar
