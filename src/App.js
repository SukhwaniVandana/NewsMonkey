import './App.css';

import React, { useState } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

export default function App() {
  let pageSize = 15;
  let language = "en";
  let apiKey = process.env.REACT_APP_NEWS_API_KEY;

  const [progress, setProgress] = useState(0)
  // state = {
  //   progress: 0
  // }
  // setProgress = (progress) => {
  //   setState({ progress: progress })
  // }
  return (
    <>
      <Router>
        <Navbar />
        <LoadingBar
          height={3}
          color='#f11946'
          progress={progress}
        />
        <Routes>
          <Route exact path="/" element={<News setProgress={setProgress} key="home" country="in" apiKey={apiKey} pageSize={pageSize} language={language} category="general" />}></Route>
          <Route exact path="/business" element={<News setProgress={setProgress} key="business" country="in" apiKey={apiKey} pageSize={pageSize} language={language} category="business" />}></Route>
          <Route exact path="/sports" element={<News setProgress={setProgress} key="sports" country="in" apiKey={apiKey} pageSize={pageSize} language={language} category="sports" />}></Route>
          <Route exact path="/entertainment" element={<News setProgress={setProgress} key="entertainment" country="in" apiKey={apiKey} pageSize={pageSize} language={language} category="entertainment" />}></Route>
          <Route exact path="/general" element={<News setProgress={setProgress} key="general" country="in" apiKey={apiKey} pageSize={pageSize} language={language} category="general" />}></Route>
          <Route exact path="/health" element={<News setProgress={setProgress} key="health" country="in" apiKey={apiKey} pageSize={pageSize} language={language} category="health" />}></Route>
          <Route exact path="/science" element={<News setProgress={setProgress} key="science" country="in" apiKey={apiKey} pageSize={pageSize} language={language} category="science" />}></Route>
          <Route exact path="/technology" element={<News setProgress={setProgress} key="technology" country="in" apiKey={apiKey} pageSize={pageSize} language={language} category="technology" />}></Route>
        </Routes>
      </Router>
    </>
  )
}
