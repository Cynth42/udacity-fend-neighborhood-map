import React, {Component} from 'react'
import HamToggleButton from './hamburger'


class Header extends Component {
  render() {
    return(
      <header>
        <nav id="navbar" className="navbar navbar-dark bg-dark" role="application" >
          <div id='hamburger'>
            <HamToggleButton click={this.props.click} ariaExpand={this.props.ariaExpand}/>
          </div>
          <div id="logo" tabIndex="-1">
            <a href="/" tabIndex="-1">My Neighborhood map</a>
          </div>
          <div id="nav-list">
          </div>
      </nav>
    </header>
    )
  }
}

export default Header
