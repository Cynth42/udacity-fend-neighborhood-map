import React, {Component} from 'react'

class HamToggleButton extends Component {
  render() {
    return (
    <button className="ham-button" onClick={this.props.click} aria-expanded={this.props.ariaExpand}>
      <span className="blank-line"/>
      <span className="single-line"/>
      <span className="single-line"/>
      <span className="single-line"/>
      <span className="blank-line"/>
    </button>
   )
 }
}

export default HamToggleButton
