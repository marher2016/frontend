import React from 'react';
import EditComponent from './edit/EditComponent';
import './App.css';
import ShowComponent from './show/ShowComponent';
import ImageComponent from './image/ImageComponent'

function App() {
  return (
    <div className="app">
      <div className="left">
        <ImageComponent/>
        <EditComponent/>
      </div>
      <ShowComponent/>
    </div>
  )
}

export default App;
