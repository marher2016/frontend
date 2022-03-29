import axios from "axios";
import { Component } from "react";
import { Article } from "../../model/Article";
import TextComponent from "./text/TextComponent";
import ImageComponent from "./image/ImageComponent";
import '../../App.css';

class ShowComponent extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      article: Article,
      images: []
    }
  }

  async componentDidMount() {
    const {header} = this.props.header
    if({header}.articleId > 0) {
      try {
        const endpoint = this.props.environment.ARTICLES + '/' + 
          {header}.vignette + '/' + {header}.pubYear + '/' + 
          {header}.subject + '/' + {header}.articleId
        const response = await axios.get(endpoint);
        this.setState({
          article: new Article(
              response.data.headline,
              response.data.leader,
              response.data.support
            )
        });
      } catch (error) {
        console.log(error)
      }
    }
  }

  async componentDidUpdate() {
    if(this.props.header.articleId > 0 && this.state.images.length === 0) {
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
        <TextComponent article={this.state.article} />
      </div>
    )
  }
}

export default ShowComponent