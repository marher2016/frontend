import React from 'react';
import EditComponent from './edit/EditComponent';
import PostComponent from './post/PostComponent';
import './App.css';
import ShowComponent from './show/ShowComponent';

function App() {
  return (
    <div className="app">
      <EditComponent/>
      <ShowComponent/>
    </div>
  )
}

export default App;
