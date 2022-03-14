import axios from "axios";
import { Component } from "react";
import { Article } from "../../model/Article";
import { Header } from "../../model/Header";
import './ShowComponent.css';
import Environment from '../../environment/Environment'

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
    const {headline, leader, support} = this.state.article
    return (
      <div className="article">
        <h1 className="headline">{headline}</h1>
        <strong>{leader}</strong>
        <pre>{support}</pre>
      </div>
    )
  }
}

export default ShowComponent