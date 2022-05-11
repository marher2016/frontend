import { PureComponent } from "react";
import './TextComponent.css';

class TextComponent extends PureComponent {

  render() {
    const {headline, leader, support} = this.props.article
    return (
      <div className="article">
        <h1 className="headline">{headline}</h1>
        <strong className="lead">{leader}</strong>
        <pre>{support}</pre>
      </div>
    )
  }
}

export default TextComponent