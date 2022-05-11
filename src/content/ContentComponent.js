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
      article: Article
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
    const {header, article} = this.state
    const endpoint = Environment.ARTICLES + '/' + {header}.vignette + '/' +
    {header}.pubYear + '/' + {header}.subject + '/' + {header}.articleId
    axios.put(endpoint, article)
  }

  handleNew() {
    console.log('new')
    axios.post(Environment.ARTICLES, this.state)
    .then(r => {
      console.log(r.data)
      this.setState({header: r.data.header})
      this.setState({
        article: new Article(
            r.data.headline,
            r.data.leader,
            r.data.support
          )
      });
    })
  }

  render() {
    const {handleChange, handleSubmit, state} = this
    const {header, article} = state
    return (
    <div className="row">
      <div className="left column">
        <UploadComponent header={header} baseUrl={Environment.IMAGES}/>
        <SubmitComponent article={article} onChange={handleChange}
          onSubmit={handleSubmit}/>
      </div>
      <div className="right column">
        <ShowComponent state={state} environment={Environment}/>
      </div>
    </div>
    )
  }
}

export default ContentComponent;
