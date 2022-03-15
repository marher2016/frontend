import axios from "axios";
import { Component } from "react";
import Dropzone from 'react-dropzone'
import './UploadComponent.css';

class UploadComponent extends Component {

  onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]
    const formData = new FormData()
    formData.append("file", file)
    const {environment, header} = this.props
    const endpoint = {environment}.IMAGES + '/' + {header}.vignette + '/' + 
      {header}.pubYear + '/' + {header}.subject + '/' + {header}.articleId
    axios.post(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then((response) => {
      console.log(response)
    }).catch(function (error) {
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
    return (
      <Dropzone onDrop={this.onDrop}>
        {({getRootProps, getInputProps, isDragActive}) => (
            <div {...getRootProps()} className="dropbox" role="region" name="dropbox">
              <input {...getInputProps()} />
              { isDragActive ?
                <p>Drop the image here ...</p> :
                <p>Drag 'n' drop image here, or click to select image</p>
              }
            </div>
          )}
    </Dropzone>
    )
  }
}

export default UploadComponent