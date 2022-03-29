import axios from "axios";
import { Component } from "react";
import Dropzone from 'react-dropzone'
import './UploadComponent.css';

class UploadComponent extends Component {

  onDrop = (acceptedFiles) => {
    if(this.articleWasCreated())
      this.postImage(acceptedFiles[0])
    else
      alert('Create an article first!')
  }

  articleWasCreated() {
    if(this.props.header.articleId > 0)
      return true
    else 
      return false
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
        alert('Bad file: ' + error.response.data.message);
      } else if (error.request) {
        alert('No response: ' + error.request);
      } else {
        alert('Error during setup: ', error.message);
      }
    })
  }

  render() {
    const isCreated = this.articleWasCreated
    return (
      <>
        {isCreated 
          ? <h1>Article not yet saved</h1>
          : <Dropzone onDrop={this.onDrop}>
            {({getRootProps, getInputProps, isDragActive}) => (
              <div {...getRootProps()} className="dropbox"
                  role="region" name="dropbox">
                <input {...getInputProps()} />
                { isDragActive ?
                  <p>Drop the image here ...</p> :
                  <p>Drag 'n' drop image here, or click to select image</p>
                }
              </div>
            )}
          </Dropzone>
        }
      </>
    )
  }
}

export default UploadComponent