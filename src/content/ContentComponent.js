import React from 'react';
import SubmitComponent from './submit/SubmitComponent';
import './ContentComponent.css';
import ShowComponent from './show/ShowComponent';
import UploadComponent from './upload/UploadComponent'
import LoadComponent from './load/LoadComponent';
import { Component } from 'react';
import axios from "axios";
import Environment from '../environment/Environment'
import { Header } from "../model/Header";
import { Article } from '../model/Article';

class ContentComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      formatted: Article,
      headline: '',
      leader: '',
      support: '',
      category: 'INRIKES',
      pubYear: 2022,
      vignette: 'ekonomi',
      articleId: -1
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleLoad = (e) => {
    e.preventDefault();
    const {category, pubYear, vignette, articleId} = this.state
    const article = Environment.ARTICLES + '/' + category + '/' + pubYear + '/' + vignette + '/' + articleId
    axios.get(article)
    .then(r => {
      console.log(r)
      this.setState({category: r.data.header.category})
      this.setState({pubYear: r.data.header.pubYear})
      this.setState({vignette: r.data.header.vignette})
      this.setState({articleId: r.data.header.articleId})
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

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.articleId.length > 0)
      this.handleOld()
    else
      this.handleNew()
  }

  handleOld() {
    console.log(this.state)
    const {headline, leader, support, category, pubYear, vignette, articleId} = this.state
    const endpoint = Environment.ARTICLES + '/' + category + '/' +
      pubYear + '/' + vignette + '/' + articleId
    axios.put(endpoint, new Article(headline, leader, support))
  }

  handleNew() {
    const {headline, leader, support, category, pubYear, vignette, articleId} = this.state
    const draft = {header: new Header(category, pubYear, vignette, articleId),
      headline: headline, leader: leader, support: support}
    axios.post(Environment.ARTICLES, draft)
    .then(r => {
      this.setState({category: r.data.header.category})
      this.setState({pubYear: r.data.header.pubYear})
      this.setState({vignette: r.data.header.vignette})
      this.setState({articleId: r.data.header.articleId})
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
    const {handleChange, handleLoad, handleSubmit, state} = this
    const {headline, leader, support, formatted, category, pubYear, vignette, articleId} = state
    return (
    <div className="row">
      <div className="left column">
        <LoadComponent
          category={category}
          pubYear={pubYear}
          vignette={vignette}
          articleId={articleId}
          onChange={handleChange}
          onLoad={handleLoad}
        />
        <UploadComponent
          category={category}
          pubYear={pubYear}
          vignette={vignette}
          articleId={articleId}
          baseUrl={Environment.IMAGES}
        />
        <SubmitComponent
          headline={headline}
          leader={leader}
          support={support}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>
      <div className="right column">
        <ShowComponent
          articleId={articleId}
          formatted={formatted}
          environment={Environment}
        />
      </div>
    </div>
    )
  }
}

export default ContentComponent;
