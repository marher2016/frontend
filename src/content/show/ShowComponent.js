import axios from "axios";
import { Component } from "react";
import { Article } from "../../model/Article";
import { Header } from "../../model/Header";
import TextComponent from "./text/TextComponent";
import ImageComponent from "./image/ImageComponent";

class ShowComponent extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      header: Header,
      article: Article,
      images: []
    }
  }

  async componentDidMount() {
    const {header} = this.state
    if({header}.articleId > 0) {
      try {
        const endpoint = this.props.environment.ARTICLES + '/' + 
          {header}.vignette + '/' + {header}.pubYear + '/' + 
          {header}.subject + '/' + {header}.articleId
        const response = await axios.get(endpoint);
        this.setState({
          header: response.data.header,
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
    if(this.state.images.length === 0) {
      fetch("http://localhost:8282/v1/images")
      .then(response => response.json())
      .then(images => this.setState({images}))
      .catch(error => console.log(error))
    } else
      console.log(this.state.images)
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