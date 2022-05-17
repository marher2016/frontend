import { PureComponent } from "react";
import './ImageComponent.css';

class ImageComponent extends PureComponent {

  render() {
    return this.props.images.map((image) => {
      return (
        this.props.formatted ? 
        <div key={image.time}>
          <img src={`http://localhost:8282/v1/images/${image.filePath}`} alt={image.filePath}/>
        </div>
        : null
      )
    })
  }
}

export default ImageComponent