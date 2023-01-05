import React, { Component } from 'react'
import './App.css';
import NavBar from './components/NavBar';
import News from './components/News';


export default class App extends Component {
  c = 'John';


  render() {
    return (
      <>
        <NavBar/>
        <News/>
      </>
    )
  }
}
