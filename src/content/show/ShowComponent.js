import { Component } from "react";
import TextComponent from "./text/TextComponent";
import ImageComponent from "./image/ImageComponent";
import VignetteComponent from "./vignette/VignetteComponent";

class ShowComponent extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      images: []
    }
  }

  async componentDidUpdate() {
    if(this.props.articleId > 0 && this.state.images.length === 0) {
      fetch(this.props.environment.IMAGES)
      .then(response => response.json())
      .then(images => this.setState({images}))
      .catch(error => console.log(error))
    }
  }

  render() {
    return (
      <>
        <VignetteComponent vignette={this.props.vignette} formatted={this.props.formatted} />
        <ImageComponent images={this.state.images} formatted={this.props.formatted}/>
        <TextComponent formatted={this.props.formatted} />
      </>
    )
  }
}

export default ShowComponent