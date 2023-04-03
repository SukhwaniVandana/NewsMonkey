import './App.css';

import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
export default class App extends Component {
  pageSize = 15;
  language = "en";
  apiKey = process.env.REACT_APP_NEWS_API_KEY;

  state = {
    progress: 0
  }
  setProgress = (progress) => {
    this.setState({progress:progress})
  }
  render() {
    return (
      <>
        <Router>
          <Navbar />
          <LoadingBar
            height={3}
            color='#f11946'
            progress={this.state.progress}
          />
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} key="home" country="in" apiKey={this.apiKey} pageSize={this.pageSize} language={this.language} category="general" />}></Route>
            <Route exact path="/business" element={<News setProgress={this.setProgress} key="business" country="in" apiKey={this.apiKey} pageSize={this.pageSize} language={this.language} category="business" />}></Route>
            <Route exact path="/sports" element={<News setProgress={this.setProgress} key="sports" country="in" apiKey={this.apiKey} pageSize={this.pageSize} language={this.language} category="sports" />}></Route>
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" country="in" apiKey={this.apiKey} pageSize={this.pageSize} language={this.language} category="entertainment" />}></Route>
            <Route exact path="/general" element={<News setProgress={this.setProgress} key="general" country="in" apiKey={this.apiKey} pageSize={this.pageSize} language={this.language} category="general" />}></Route>
            <Route exact path="/health" element={<News setProgress={this.setProgress} key="health" country="in" apiKey={this.apiKey} pageSize={this.pageSize} language={this.language} category="health" />}></Route>
            <Route exact path="/science" element={<News setProgress={this.setProgress} key="science" country="in" apiKey={this.apiKey} pageSize={this.pageSize} language={this.language} category="science" />}></Route>
            <Route exact path="/technology" element={<News setProgress={this.setProgress} key="technology" country="in" apiKey={this.apiKey} pageSize={this.pageSize} language={this.language} category="technology" />}></Route>
          </Routes>
        </Router>
      </>
    )
  }
}
