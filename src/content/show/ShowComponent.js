import { Component } from "react";
import TextComponent from "./text/TextComponent";
import ImageComponent from "./image/ImageComponent";
import '../../App.css';

class ShowComponent extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      images: []
    }
  }

  async componentDidUpdate() {
    if(this.props.state.header.articleId > 0 && this.state.images.length === 0) {
      const {header} = this.props.state.header
      console.log(header)
      fetch(this.props.environment.IMAGES)
      .then(response => response.json())
      .then(images => this.setState({images}))
      .catch(error => console.log(error))
    }
  }

  render() {
    return (
      <div className="column">
        <ImageComponent images={this.state.images} />
        <TextComponent article={this.props.state.article} />
      </div>
    )
  }
}

export default ShowComponent