import { Component } from "react";
import Axios from "axios";
import { Header } from "../../../model/Header";
import Environment from '../../../environment/Environment'

class PostComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      header: new Header('EKONOMI', 2022, 'INRIKES', ''),
      headline: '',
      leader: '',
      support: '',
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    Axios.post(Environment.BASE_URL, this.state)
    .then(r => {
      this.setState({header: r.data.header})
    })
  }

  render() {
    const {headline, leader, support} = this.state
    return (
      <form onSubmit={this.handleSubmit} className="form">
        <div>
          <label>Article Headline </label>
          <input 
            className="input"
            type="text" 
            name="headline"
            placeholder="Enter headline here" 
            onChange= {this.handleChange}
            value={headline}>
          </input>
        </div>
        <div>
          <label>-Lead paragraph </label>
          <input 
            className="input"
            type="text" 
            name="leader"
            aria-label="leader"
            placeholder="Enter lead here"
            onChange= {this.handleChange}
            value={leader}>
          </input>
        </div>
        <div>
          <label>Supporting paragraphs </label>
          <textarea 
            className="input"
            name="support"
            placeholder="Enter supporting paragraphs here"
            onChange= {this.handleChange}
            value={support}>
          </textarea>
        </div>
        <div>
          <button
            type="submit"
            name="submit"
            className="input button"
          >Submit</button>
        </div>
      </form>
    )
  }
}

export default PostComponent