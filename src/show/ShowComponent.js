import axios from "axios";
import { Component } from "react";
import { Article } from "../model/Article";
import { Header } from "../model/Header";
import './ShowComponent.css';

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
      const response = await axios.get('http://localhost:8181/v1/articles/inrikes/2022/ekonomi/5122');
      this.setState({
        header: response.data.header,
        article: new Article(response.data.headline, response.data.lead, response.data.support)
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