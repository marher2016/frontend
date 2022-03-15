import { PureComponent } from "react";
import './ImageComponent.css';

class TextComponent extends PureComponent {

  render() {
    return this.props.images.map((image) => {
      return (
        <div key={image.time}>
          <img src={`http://localhost:8282/v1/images/${image.filePath}`} alt={image.filePath}/>
          {/*<p>{image.filePath}</p>*/}
        </div>
      )
    })
  }
}

export default TextComponent