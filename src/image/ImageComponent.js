import axios from "axios";
import { Component } from "react";
import Dropzone from 'react-dropzone'
import './ImageComponent.css';

class ImageComponent extends Component {

  onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]
    const formData = new FormData()
    formData.append("file", file)
    axios.post('http://localhost:8282/v1/images/inrikes/2022/ekonomi/1617', formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then(() => {
      console.log("file uploaded successfully!")
    }).catch(function (error) {
      if (error.response) {
        console.log(error.response)
        //alert('Bad file: ' + error.response.data.message);
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
            <div {...getRootProps()} className="dropbox">
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

export default ImageComponent