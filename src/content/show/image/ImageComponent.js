import { Component } from "react";
import './ImageComponent.css';

class ImageComponent extends Component {

  render() {
    const {image, formatted} = this.props
    return (
      formatted ? image ?
      <div key={image.time}>
          <img src={`http://localhost:8282/v1/images/${image.filePath}`} alt={image.filePath}/>
        </div>
        : null : null
    )
  }
}

export default ImageComponent