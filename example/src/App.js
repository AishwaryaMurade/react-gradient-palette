import React from 'react'

import {  GradientMaker } from 'react-gradient-palette'


const App = () => {
  const setGradient =(value)=>{
document.getElementsByTagName('body')[0].style.backgroundImage = value
  }
  return (<GradientMaker showRadial={true}  showCloseBtn={true} setGradient={setGradient} defaultGradient={['#ff5733', '#d147a3']} />)
}

export default App
