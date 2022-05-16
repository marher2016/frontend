import { PureComponent } from "react";

class VignetteComponent extends PureComponent {

  render() {
    const {vignette, formatted} = this.props
    return (
      <h2 className="vignette">{formatted ? vignette.toUpperCase() : ''}</h2>
    )
  }
}

export default VignetteComponent