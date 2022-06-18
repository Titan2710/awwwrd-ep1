import React,{useEffect, useState} from "react";
import {Routes, Route} from 'react-router-dom';
import "./styles/App.scss";
import Header from "./components/header";
import gsap from "gsap";

import Home from "./pages/home";
import CaseStudies from './pages/caseStudies'
import Approach from './pages/approach'
import Services from './pages/services'
import About from './pages/about'

import Navigation from './components/navigation'


const routes = [
  {
    id: 1,
    path: '/',
    name: 'Home',
    Component: Home
  },
  {
    id: 2,
    path: '/case-studies',
    name: 'Case Studies',
    Component: CaseStudies
  },
  {
    id: 3,
    path: '/approach',
    name: 'Approach',
    Component: Approach
  },
  {
    id: 4,
    path: '/services',
    name: 'Services',
    Component: Services
  },
  {
    id: 5,
    path: '/about-us',
    name: 'About Us',
    Component: About
  }
];

function debounce(fn, ms) {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, arguments);
    }, ms)
  }
}

function App() {
  

  const [menuState, setMenuState] = useState({ menuOpened: false });
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth
  })

  useEffect(() => {
    gsap.to('body', 0, { css: { visibility: 'visible' }});

    const debounceHandleResize = debounce(function HandleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      })
    }, 1000)

    window.addEventListener("resize", debounceHandleResize);
    return () => {
      window.removeEventListener("resize", debounceHandleResize);
    }
  })

  return (
    <>
      <Header dimensions={dimensions} menuState={menuState} setMenuState={setMenuState} />
      <div className="App">
              <Routes>
              {routes.map(({path, Component}) => (
                <Route exact path={path} element={<Component dimensions={dimensions} />}/>
              ))}
            </Routes>
      </div>
      <Navigation  setMenuState={setMenuState}/>
    </>
  );
}

export default App;

