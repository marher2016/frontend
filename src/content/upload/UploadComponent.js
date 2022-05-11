import axios from "axios";
import { Component } from "react";
import Dropzone from 'react-dropzone'
import './UploadComponent.css';

class UploadComponent extends Component {

  onDrop = (acceptedFiles) => {
    this.postImage(acceptedFiles[0])
  }

  postImage(file) {
    const formData = new FormData()
    formData.append("file", file)
    const {baseUrl, header} = this.props
    const endpoint = {baseUrl} + '/' + {header}.vignette + '/' +
      {header}.pubYear + '/' + {header}.subject + '/' + {header}.articleId
    axios.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data"}
      }).then((response) => { console.log(response) }
      ).catch(function (error) {
      if (error.response) {
        console.log(error)
        alert('Bad file: ' + error.response.data.message);
      } else if (error.request) {
        alert('No response: ' + error.request);
      } else {
        alert('Error during setup: ', error.message);
      }
    })
  }

  render() {
    const isCreated = typeof this.props.header != "undefined" && this.props.header.articleId > 0
    return (
      <>
        {isCreated ? 
        <Dropzone onDrop={this.onDrop}>
          {({getRootProps, getInputProps, isDragActive}) => (
            <div {...getRootProps()} className="dropbox"
                role="region" name="dropbox">
              <input {...getInputProps()} />
              { isDragActive ?
                <p>Släpp bilden här ...</p> :
                <p>Klicka eller drag och släpp bilden här</p>
              }
              <form className="form">
                <div>
                  <label>Bildtext </label>
                  <input
                    className="input"
                    type="text"
                    name="headline"
                    placeholder="Skriv bildtext här"
                  >
                  </input>
                </div>
                <div>
                  <label>Bildcredit </label>
                  <input
                    className="input"
                    type="text"
                    name="leader"
                    aria-label="leader"
                    placeholder="Skriv bildcredit här">
                  </input>
                </div>
                <button
                  type="submit"
                  name="submit"
                  className="input button"
                  >Uppdatera bildtexten
                </button>
              </form>
            </div>
          )}
        </Dropzone>
          : <h1 name="no_article">Lägg först in en artikel nedan</h1>
        }
      </>
    )
  }
}

export default UploadComponent