import axios from "axios";
import { Component } from "react";
import { Article } from "../model/Article";
import { Header } from "../model/Header";
import './ShowComponent.css';
import Environment from '../environment/Environment'

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
      const response = await axios.get(
        Environment.BASE_URL + Environment.ARTICLE
        );
      this.setState({
        header: response.data.header,
        article: new Article(
            response.data.headline,
            response.data.leader,
            response.data.support
          )
      });
    } catch (error) {
      //during rendering
    }
  }

  render() {
    return (
      <div className="article">
        <h1 className="headline">{this.state.article.headline}</h1>
        <strong>{this.state.article.leader}</strong>
        <pre>{this.state.article.support}</pre>
      </div>
    )
  }
}

export default ShowComponent