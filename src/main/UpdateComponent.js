import { Component } from "react";
import axios from "axios";
import { Header } from "../model/Header";

class UpdateComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      header: new Header('EKONOMI', 2022, 'INRIKES', ''),
      headline: '',
      lead: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8181/v1/articles', this.state)
    .then(response => {
      this.setState({header: response.data.header})
      console.log(response)
    })
  }

  render() {
    const {headline, lead} = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>Headline </label>
          <input 
            type="text" 
            name="headline" 
            onChange= {this.handleChange}
            value={headline}>
          </input>
        </div>
        <div>
          <label>Lead </label>
          <input 
            type="text" 
            name="lead"
            onChange= {this.handleChange}
            value={lead}>
          </input>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    )
  }
}

export default UpdateComponent