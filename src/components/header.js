import React, {Component} from 'react'
import HamToggleButton from './hamburger'


class Header extends Component {
  render() {
    return(
      <header>
        <nav id="navbar" className="navbar navbar-dark bg-dark" role="application" >
          <div id='hamburger'>
            <HamToggleButton click={this.props.click}/>
          </div>
          <div id="logo">
            <a href="/">My Neighborhood map</a>
          </div>
          <div id="nav-list">
          </div>
      </nav>
    </header>
    )
  }
}

export default Header
