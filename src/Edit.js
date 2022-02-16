import axios from "axios";
import { Component } from "react";

class Edit extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      headline: ""
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8181/v1/articles/inrikes/2022/ekonomi/6146')
    .then(response => {
      this.setState({
        headline: response.data.main.headline
      })
      console.log(response.data.main.headline)
    })
  }

  render() {
    return (
      <>
        <h1>{this.state.headline}</h1>
      </>
    )
  }
}

export default Edit