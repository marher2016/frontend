import React from 'react';
import SubmitComponent from './submit/SubmitComponent';
import './ContentComponent.css';
import ShowComponent from './show/ShowComponent';
import UploadComponent from './upload/UploadComponent'
import { Component } from 'react';
import axios from "axios";
import Environment from '../environment/Environment'
import { Header } from "../model/Header";

class ContentComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      header: new Header('ekonomi', 2022, 'inrikes', ''),
      headline: '',
      leader: '',
      support: '',
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    const {header, headline, leader, support} = this.state
    const existing = {
      headline: {headline},
      leader: {leader},
      support: {support},
    }
    const endpoint = Environment.ARTICLES + '/' + {header}.vignette + '/' + 
      {header}.pubYear + '/' + {header}.subject + '/' + {header}.articleId
    if({header}.header.articleId > 0){
      axios.put(endpoint, existing)
    } else {
      if ({header}.articleId.length > 0) {
        axios.put(endpoint, existing)
      }
      else 
        this.handleNew()
    }
  }

  handleNew() {
    axios.post(Environment.ARTICLES, this.state)
    .then(r => {
      this.setState({header: r.data.header})
    })
  }

  render() {
    const {handleChange, handleSubmit, state} = this
    return (
    <div className="row">
      <div className="left column">
        <UploadComponent environment={Environment} header={this.state.header}/>
        <SubmitComponent state={state} onChange={handleChange} 
          onSubmit={handleSubmit}/>
      </div>
      <ShowComponent onSubmit={handleSubmit} environment={Environment}/>
    </div>
    )
  }
}

export default ContentComponent;
