import './App.css';

import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
export default class App extends Component {
  pageSize=5;
  language="en";
  apiKey="884d0bee182c4c1bb6ead4fbcd538a89";
  render() {
    return (
      <>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<News key="home" country="in" apiKey={this.apiKey} pageSize={this.pageSize} language={this.language} category="general" />}></Route>
            <Route exact path="/business" element={<News key="business" country="in" apiKey={this.apiKey} pageSize={this.pageSize} language={this.language} category="business" />}></Route>
            <Route exact path="/sports" element={<News key="sports" country="in" apiKey={this.apiKey} pageSize={this.pageSize} language={this.language} category="sports" />}></Route>
            <Route exact path="/entertainment" element={<News key="entertainment" country="in" apiKey={this.apiKey} pageSize={this.pageSize} language={this.language} category="entertainment" />}></Route>
            <Route exact path="/general" element={<News key="general" country="in" apiKey={this.apiKey} pageSize={this.pageSize} language={this.language} category="general" />}></Route>
            <Route exact path="/health" element={<News key="health" country="in" apiKey={this.apiKey} pageSize={this.pageSize} language={this.language} category="health" />}></Route>
            <Route exact path="/science" element={<News key="science" country="in" apiKey={this.apiKey} pageSize={this.pageSize} language={this.language} category="science" />}></Route>
            <Route exact path="/technology" element={<News key="technology" country="in" apiKey={this.apiKey} pageSize={this.pageSize} language={this.language} category="technology" />}></Route>
          </Routes>
        </Router>
      </>
    )
  }
}
