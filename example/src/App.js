import React from 'react'
import {  GradientMaker } from 'react-gradient-palette'


const App = () => {
  const setGradient =(value)=>{
document.getElementsByTagName('body')[0].style.backgroundImage = value
  }
  return (
  <div style={{display: 'flex',
    flexWrap: 'wrap',
    gap: '45px',
    alignItems: 'center',
    marginLeft: '50px',
    marginTop: '40px'}}>
    <div>
    <GradientMaker setGradient={setGradient} defaultGradient={['#ff5733', '#d147a3']} />
    </div>

 <div>
 <GradientMaker showRadial={true} showConic={true}  showCloseBtn={true} setGradient={setGradient} defaultGradient={['#ff5733', '#d147a3']} />
 </div>

  </div>
  )
}

export default App
