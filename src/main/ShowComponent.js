import axios from "axios";
import { Component } from "react";
import { Header } from "../model/Header";

class ShowComponent extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      header: Header,
      headline: '',
      lead: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8181/v1/articles/inrikes/2022/ekonomi/3593')
    .then(response => {
      this.setState({
        header: response.data.header,
        headline: response.data.headline,
        lead: response.data.lead
      })
    })
  }

  render() {
    return (
      <>
        <h1>{this.state.headline}</h1>
        <p>{this.state.lead}</p>
      </>
    )
  }
}

export default ShowComponent