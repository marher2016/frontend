import React from 'react';
import SubmitComponent from './submit/SubmitComponent';
import './ContentComponent.css';
import ShowComponent from './show/ShowComponent';
import ImageComponent from './image/ImageComponent'
import { Component } from 'react';
import axios from "axios";
import Environment from '../environment/Environment'

class ContentComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      headline: '',
      leader: '',
      support: '',
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    axios.put(Environment.BASE_URL + Environment.ARTICLE, this.state)
  }

  render() {
    return (
    <div className="app">
      <div className="left">
        <ImageComponent/>
        <SubmitComponent 
          state={this.state} 
          onChange={this.handleChange} 
          onSubmit={this.handleSubmit}
        />
      </div>
      <ShowComponent/>
    </div>
    )
  }
}

export default ContentComponent;
