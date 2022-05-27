import { PureComponent } from "react";
import TextComponent from "./text/TextComponent";
import ImageComponent from "./image/ImageComponent";
import VignetteComponent from "./vignette/VignetteComponent";

class ShowComponent extends PureComponent {

  render() {
    return (
      <>
        <VignetteComponent vignette={this.props.vignette} formatted={this.props.formatted} />
        <ImageComponent images={this.props.images} formatted={this.props.formatted}/>
        <TextComponent formatted={this.props.formatted} />
      </>
    )
  }
}

export default ShowComponent