import axios from "axios";
import { Component } from "react";
import { Header } from "../model/Header";
import './ShowComponent.css';

class ShowComponent extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      header: Header,
      headline: '',
      lead: '',
      support: ''
    }
  }

  componentDidMount() {
    /*if(typeof this.state.header !== "undefined") {

    }*/
    axios.get('http://localhost:8181/v1/articles/inrikes/2022/ekonomi/8268')
    .then(response => {
      this.setState({
        header: response.data.header,
        headline: response.data.headline,
        lead: response.data.lead,
        support: response.data.support
      })
    })
  }

  render() {
    console.log(this.state)
    return (
      <div className="display-linebreaks">
        <h1 className="headline">{this.state.headline}</h1>
        <strong>{this.state.lead}</strong>
        <pre>{this.state.support}</pre>
      </div>
    )
  }
}

export default ShowComponent