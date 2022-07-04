import React from "react";
import './App.css';
import Header from "./Header";
import DatingCards from './DatingCards';
import SwipeButtons from './SwipeButtons';

function App() {
  return (
    <div className="App">
        <Header />
        <DatingCards/>
        <SwipeButtons/>
    </div>
  );
}

export default App;
