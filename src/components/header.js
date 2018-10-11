import React, {Component} from 'react'
import HamToggleButton from './hamburger'


class Header extends Component {
  render() {
    return(
      <header>
        <nav id="navbar" className="navbar navbar-dark bg-dark" role="application" >
          <div id='hamburger' tabIndex="0">
            <HamToggleButton click={this.props.click} ariaExpand={this.props.ariaExpand}/>
          </div>
          <div id="title" tabIndex="-1">
            <h1><a href="/" tabIndex="-1">My Neighborhood map</a></h1>
          </div>
          <div id="nav-list" tabIndex="0" role="list">
          </div>
      </nav>
    </header>
    )
  }
}

export default Header
