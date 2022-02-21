import axios from "axios";
import { Component } from "react";
import { Article } from "../model/Article";
import { Header } from "../model/Header";
import './ShowComponent.css';
import URL from '../environment/url'
import ARTICLE from '../environment/article'

class ShowComponent extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      header: Header,
      article: Article
    }
  }

  async componentDidMount() {
    try {
      const response = await axios.get(URL + ARTICLE);
      this.setState({
        header: response.data.header,
        article: new Article(
            response.data.headline, 
            response.data.lead, 
            response.data.support
          )
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="article">
        <h1 className="headline">{this.state.article.headline}</h1>
        <strong>{this.state.article.lead}</strong>
        <pre>{this.state.article.support}</pre>
      </div>
    )
  }
}

export default ShowComponent