import { Component } from "react";
import TextComponent from "./text/TextComponent";
import ImageComponent from "./image/ImageComponent";
import VignetteComponent from "./vignette/VignetteComponent";

class ShowComponent extends Component {

  render() {
    const {vignette, formatted, image, isOld} = this.props
    return (
      isOld ?
        <>
          <VignetteComponent vignette={vignette} formatted={formatted} />
          <ImageComponent image={image} formatted={formatted}/>
          <TextComponent formatted={formatted} />
        </>
        : null
    )
  }
}

export default ShowComponent