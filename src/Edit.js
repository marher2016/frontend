import axios from "axios";
import { Component } from "react";
import { Main } from "./model/Main";

class Edit extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      main: Main
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8181/v1/articles/inrikes/2022/ekonomi/6146')
    .then(response => {
      const rdm = response.data.main
      this.setState({
        main: new Main(rdm.headline, rdm.lead)
      })
      console.log(rdm)
    })
  }

  render() {
    return (
      <>
        <h1>{this.state.main.headline}</h1>
        <p>{this.state.main.lead}</p>
      </>
    )
  }
}

export default Edit