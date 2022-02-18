import { Component } from "react";
import axios from "axios";
import { Header } from "../model/Header";
import './PostComponent.css';

class UpdateComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      header: new Header('EKONOMI', 2022, 'INRIKES', ''),
      headline: '',
      lead: '',
      support: ''
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
      console.log(response)
      this.setState({header: response.data.header})
    })
  }

  render() {
    const {headline, lead, support} = this.state
    return (
      <form onSubmit={this.handleSubmit} className="bigfont">
        <div>
          <label>Headline </label>
          <input 
            className="input"
            type="text" 
            name="headline" 
            onChange= {this.handleChange}
            value={headline}>
          </input>
        </div>
        <div>
          <label>Lead paragraph</label>
          <input 
            className="input"
            type="text" 
            name="lead"
            onChange= {this.handleChange}
            value={lead}>
          </input>
        </div>
        <div>
          <label>Supporting paragraphs</label>
          <textarea 
            className="input"
            name="support"
            onChange= {this.handleChange}
            value={support}>
          </textarea>
        </div>
        <div>
          <button type="submit" className="input">Submit</button>
        </div>
      </form>
    )
  }
}

export default UpdateComponent