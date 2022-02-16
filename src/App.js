import React from 'react';
import UpdateComponent from './main/UpdateComponent';
import './App.css';
import ShowComponent from './main/ShowComponent';

function App() {
  return (
    <div className="app">
      <UpdateComponent className="component"/>
      <ShowComponent className="component"/>
    </div>
  )
}

export default App;
