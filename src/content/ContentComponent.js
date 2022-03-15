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
    const a = Environment.ARTICLE;
    const existing = {
      headline: this.state.headline,
      leader: this.state.leader,
      support: this.state.support,
    }
    if(a.length > 0){
      axios.put(Environment.ARTICLES + a, existing)
    } else {
      const h = this.state.header
      if (h.articleId.length > 0)
        axios.put(Environment.ARTICLES + '/' + h.vignette + '/' + h.pubYear +
          '/' + h.subject + '/' + h.articleId, existing)
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
        <UploadComponent environment={Environment}/>
        <SubmitComponent state={state} onChange={handleChange} 
          onSubmit={handleSubmit}/>
      </div>
      <ShowComponent onSubmit={handleSubmit} environment={Environment}/>
    </div>
    )
  }
}

export default ContentComponent;
