import { Component } from "react";
import Dropzone from 'react-dropzone'
import './UploadComponent.css';

class UploadComponent extends Component {

  onDrop = (acceptedFiles) => {
    this.props.onUpload(acceptedFiles[0])
  }

  render() {
    const {isOld, onUpload} = this.props
    return (
      <>
        {isOld ? 
        <Dropzone onDrop={(acceptedFiles) => onUpload(acceptedFiles[0])}>
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
          : <h1 name="no_article">Skriv artikels id ovan eller skapa ny artikel nedan</h1>
        }
      </>
    )
  }
}

export default UploadComponent