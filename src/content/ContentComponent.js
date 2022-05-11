import React from 'react';
import SubmitComponent from './submit/SubmitComponent';
import './ContentComponent.css';
import ShowComponent from './show/ShowComponent';
import UploadComponent from './upload/UploadComponent'
import { Component } from 'react';
import axios from "axios";
import Environment from '../environment/Environment'
import { Header } from "../model/Header";
import { Article } from '../model/Article';

class ContentComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      header: new Header('ekonomi', 2022, 'inrikes', -1),
      formatted: Article,
      headline: '',
      leader: '',
      support: ''
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.header.articleId.length > 0)
      this.handleOld()
    else
      this.handleNew()
  }

  handleOld() {
    console.log(this.state)
    const {header, headline, leader, support} = this.state
    const endpoint = Environment.ARTICLES + '/' + {header}.vignette + '/' +
    {header}.pubYear + '/' + {header}.subject + '/' + {header}.articleId
    axios.put(endpoint, new Article(headline, leader, support))
  }

  handleNew() {
    console.log('new')
    const {header, headline, leader, support} = this.state
    const draft = {header: header, headline: headline, leader: leader, support: support}
    axios.post(Environment.ARTICLES, draft)
    .then(r => {
      console.log(r.data)
      this.setState({header: r.data.header})
      this.setState({
        formatted: new Article(
            r.data.headline,
            r.data.leader,
            r.data.support
          )
      });
    }).catch(function (error) {
      if (error.response) {
        console.log(error)
        alert('Bad article: ' + error.response.data.message);
      } else if (error.request) {
        alert('No response: ' + error.request);
      } else {
        alert('Error during setup: ', error.message);
      }
    })
  }

  render() {
    const {handleChange, handleSubmit, state} = this
    const {header, headline, leader, support, formatted} = state
    return (
    <div className="row">
      <div className="left column">
        <UploadComponent header={header} baseUrl={Environment.IMAGES}/>
        <SubmitComponent headline={headline} leader={leader} support={support} onChange={handleChange}
          onSubmit={handleSubmit}/>
      </div>
      <div className="right column">
        <ShowComponent header={header} formatted={formatted} environment={Environment}/>
      </div>
    </div>
    )
  }
}

export default ContentComponent;
