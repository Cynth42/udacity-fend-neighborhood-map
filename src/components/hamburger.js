import React, {Component} from 'react'


class HamToggleButton extends Component {
  render() {
    return (
    <button className="ham-button" onClick={this.props.click}>
      <span className="blank-line"/>
      <span className="button-line"/>
      <span className="button-line"/>
      <span className="button-line"/>
      <span className="blank-line"/>
    </button>
   )
 }
}

export default HamToggleButton
