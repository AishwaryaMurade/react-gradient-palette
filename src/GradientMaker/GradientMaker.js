import React, { useEffect, useState } from 'react'
import { ColorPicker } from '../ColorPicker';
import { CgArrowTopRight, CgArrowRight, CgArrowBottomRight, CgArrowDown, CgArrowBottomLeft, CgArrowLeft, CgArrowTopLeft, CgArrowUp } from "react-icons/cg";
import { GoDotFill } from "react-icons/go";
import { GrPowerReset } from "react-icons/gr";
import { HiPlusCircle } from "react-icons/hi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

export const GradientMaker = ({ setGradient, defaultGradient, showRadial,showConic,onCloseClick, showCloseBtn }) => {
  const [activeTab, setActiveTab] = useState(1);
  var radialVal = showRadial ? showRadial : false
  var conicVal = showConic ? showConic : false
  var grad = defaultGradient ? defaultGradient.constructor === Array ?  defaultGradient : ['#4ec7d9','#135fca']: ['#4ec7d9','#135fca']
  const [colorOne, setColorOne] = useState(grad)
  // const [colorSecond, setColorSecond] = useState('#135fca')

  const [selected, setSelected] = useState(colorOne[0])
  const [selectedInput, setSelectedInput] = useState(1)
  const [direction, setDirection] = useState('')
  const [output,setOutput] = useState()
  const [hovered, setHovered] = useState(false);

  const styles = {
    tabscontainer: {
      display: 'flex',
      position:'relative',
      flexDirection: 'column',
      width: '245px',
      margin: '20px auto',
      background: '#ffffff',
      borderRadius: '4px',
      padding: '0px 5px 5px 5px',
      boxShadow: '0 16px 32px -2px rgba(0, 0, 0, 0.3)',
      boxSizing: 'content-box'
    },
    tabs: {
      display: 'flex',
      width: '255px',
      marginLeft: '-5px'
    },
    tab: {
      flex: '1',
      textAlign: 'center',
      padding: '8px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      fontWeight: '500',
      color:'#000'
    },
    tabHover: {
      backgroundColor: '#f0f0f0',
    },
    tabActive: {
      backgroundColor: '#366495',
      color: '#fff',
    },
    tabcontent: {
      marginTop: '10px',
    },
    tabcontentP: {
      fontSize: '13px',
      wordBreak: 'break-word',
      color: '#366495',
      fontWeight: '600',
      borderTop: '2px solid',
      textAlign: 'center',
      margin: '10px'
    },

    inputSectionDiv: {
      marginBottom: '-4px'
    },
    gradientSectionInputDiv: {
      display: 'flex',
      gap: '8px',

      alignItems: 'end',
    },
    inputSection: {
      display: 'flex',
      justifyContent: 'space-between',
    marginBottom: '5px',
    height: '32px',
    boxSizing: 'content-box'
    },
    inputSectionSpanSvg: {
      fontSize: '28px',
      display: 'flex',
      color: 'darkslategray',
      cursor: 'pointer',
    },
    deleteIcon: {
      color: '#8B0000',
      cursor: 'pointer',
      fontSize: '25px',
      paddingTop: '2px'
    },
    gradientSectionSvg: {
      fontSize: '25px',
      color: 'darkslategray',
      cursor: 'pointer',
    },

    pickerSetting: {
      display: 'flex',
      flexDirection: 'row',
      gap: '6px',
    },
    direction: {
      display: 'flex',
      flexDirection: 'column',
      gap: '5px',
    },
    selectedSvg: {
       fontSize: '25px',
      background: '#366495',
      color: '#fff',
      cursor: 'pointer',
      borderRadius: '15px',
    },
    closeContainer:{
    position:'absolute',
    width:'30px',
    height:'30px',
    background:'#000000',
    color: '#fff',
    borderRadius: '14px',
    right: '-10px',
    top: '-10px',
    cursor:'pointer'
    },
    closeContainericon:{
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      fontSize: '20px',
      marginTop: '4px'

    }
  };

  const handleTabClick = (tabNumber) => {

      setDirection('')

    setActiveTab(tabNumber);
  };

  const selectedColor = (color) => {
     setSelected('#'+color.hex)
  }

useEffect(()=>{

   const newIds = colorOne.slice() //copy the array
   newIds[selectedInput-1] =selected //execute the manipulations
   setColorOne(newIds) //set the new state
},[selectedInput,selected])

const deleteColor = ()=> {

     colorOne.splice(selectedInput-1,1)

    setColorOne([...colorOne]);
    setTimeout(() => {
      setSelectedInput(1)
      setSelected(colorOne[0])
    }, 50);
}

useEffect(()=>{
  const directionString = direction ? `${direction}, ` : '';
   if(activeTab===1){
      setGradient(`linear-gradient(${directionString}${colorOne.join(', ')})`)
      setOutput(`linear-gradient(${directionString}${colorOne.join(', ')})`)
   }
   if(activeTab===2){
    setGradient(`radial-gradient(${directionString}${colorOne.join(', ')})`)
    setOutput(`radial-gradient(${directionString}${colorOne.join(', ')})`)
   }
   if(activeTab===3){
    setGradient(`conic-gradient(${directionString}${colorOne.join(', ')})`)
      setOutput(`conic-gradient(${directionString}${colorOne.join(', ')})`)
  }
},[colorOne,direction,activeTab])


  return (
    <div style={styles.tabscontainer}>
     {showCloseBtn && <div style={styles.closeContainer} onClick={onCloseClick}><span style={styles.closeContainericon}><RxCross2/></span></div>}
      <div style={styles.tabs}>
       {radialVal || conicVal && <div
        onMouseEnter={() => setHovered(1)}
        onMouseDown={() => setHovered(false)}
        onMouseLeave={() => setHovered(false)}
          style={activeTab === 1 ?{...styles.tab,...styles.tabActive,...(hovered==1 && styles.tabHover)} : {...styles.tab,...(hovered==1 && styles.tabHover)}}
          onClick={() => handleTabClick(1)}
        >
          Linear
        </div>}
     {radialVal &&  <div
        onMouseEnter={() => setHovered(2)}
        onMouseDown={() => setHovered(false)}
        onMouseLeave={() => setHovered(false)}
        style={activeTab === 2 ?{...styles.tab,...styles.tabActive,...(hovered==2 && styles.tabHover)} : {...styles.tab,...(hovered==2 && styles.tabHover)}}
          onClick={() => handleTabClick(2)}
        >
          Radial
        </div>}
     {conicVal &&   <div
        onMouseEnter={() => setHovered(3)}
        onMouseDown={() => setHovered(false)}
        onMouseLeave={() => setHovered(false)}
        style={activeTab === 3 ?{...styles.tab,...styles.tabActive,...(hovered==3 && styles.tabHover)} : {...styles.tab,...(hovered==3 && styles.tabHover)}}
          onClick={() => handleTabClick(3)}
        >
          Conic
        </div>}
      </div>

      <div style={styles.tabcontent}>
        {/* Content for Tab 1 */}
          <div style={styles.gradientSection}>

            <div style={styles.inputSection} >
              <div style={{...styles.gradientSectionInputDiv,height: '25px',
      width: '25px',
      borderRadius: '6px',
      cursor: 'pointer'}}>
              {colorOne.map((e,i)=>{
                return (<div style={selectedInput===i+1 ? {height: '25px',
                width: '25px',
                borderRadius: '6px',
                cursor: 'pointer',border:'2px solid '+e}:{}} key={i} >
                <div  style={selectedInput!==i+1 ? {height: '25px',
                width: '25px',
                borderRadius: '6px',
                cursor: 'pointer',border:'2px solid '+e,background: e,...styles.inputSectionDiv}:{height: '25px',
                width: '25px',
                borderRadius: '6px',
                cursor: 'pointer',border:'2px solid '+e,background: e, margin:'3px'}} onClick={()=>{setSelected(e);setSelectedInput(i+1)}}></div></div>)
              })}
              {colorOne.length < 4 &&<span><HiPlusCircle  style={{...styles.inputSectionSpanSvg,...styles.inputSectionDiv}} onClick={()=> {setColorOne((current => [... current, '#000000'])); setTimeout(() => {
                setSelectedInput(colorOne.length+1)
                setSelected('#000000')
              }, 50)
              }}/></span>}
              </div>
              {colorOne.length > 2 && <RiDeleteBin5Fill style={styles.deleteIcon} onClick={deleteColor}/>}

            </div>

            <div style={styles.pickerSetting}>
                <ColorPicker setColor={selected} selectedColor={selectedColor} style={styles.gradientSectionSvg}/>

            {activeTab===1 && <div style={styles.direction}>
            <GrPowerReset onClick={()=>setDirection('')} style={direction==='' ? styles.selectedSvg : styles.gradientSectionSvg} />
            <CgArrowTopRight onClick={()=>setDirection('to right top')} style={direction==='to right top' ? styles.selectedSvg : styles.gradientSectionSvg}/>
            <CgArrowRight onClick={()=>setDirection('to right')} style={direction==='to right' ? styles.selectedSvg : styles.gradientSectionSvg}/>
            <CgArrowBottomRight onClick={()=>setDirection('to right bottom')} style={direction==='to right bottom' ? styles.selectedSvg : styles.gradientSectionSvg}/>
            <CgArrowDown onClick={()=>setDirection('to bottom')} style={direction==='to bottom' ? styles.selectedSvg : styles.gradientSectionSvg}/>
            <CgArrowBottomLeft onClick={()=>setDirection('to left bottom')} style={direction==='to left bottom' ? styles.selectedSvg : styles.gradientSectionSvg}/>
            <CgArrowLeft onClick={()=>setDirection('to left')} style={direction==='to left' ? styles.selectedSvg : styles.gradientSectionSvg}/>
            <CgArrowTopLeft onClick={()=>setDirection('to left top')} style={direction==='to left top' ? styles.selectedSvg : styles.gradientSectionSvg}/>
            <CgArrowUp onClick={()=>setDirection('to top')} style={direction==='to top' ? styles.selectedSvg : styles.gradientSectionSvg}/>
            </div>}
            {activeTab===2 && <div style={styles.direction}>

              <GrPowerReset onClick={()=>setDirection('')} style={direction==='' ? styles.selectedSvg : styles.gradientSectionSvg}/>
              <GoDotFill onClick={()=>setDirection('circle')} style={direction==='circle' ? styles.selectedSvg : styles.gradientSectionSvg}/>
              </div>}
              {activeTab===3 && <div style={styles.direction}>

<GrPowerReset onClick={()=>setDirection('')} style={direction==='' ? styles.selectedSvg : styles.gradientSectionSvg}/>
<CgArrowTopRight onClick={()=>setDirection('from 45deg')} style={direction==='from 45deg' ? styles.selectedSvg : styles.gradientSectionSvg}/>
            <CgArrowRight onClick={()=>setDirection('from 90deg')} style={direction==='from 90deg' ? styles.selectedSvg : styles.gradientSectionSvg}/>
            <CgArrowBottomRight onClick={()=>setDirection('from 135deg')} style={direction==='from 135deg' ? styles.selectedSvg : styles.gradientSectionSvg}/>
            <CgArrowDown onClick={()=>setDirection('from 180deg')} style={direction==='from 180deg' ? styles.selectedSvg : styles.gradientSectionSvg}/>
            <CgArrowBottomLeft onClick={()=>setDirection('from 225deg')} style={direction==='from 225deg' ? styles.selectedSvg : styles.gradientSectionSvg}/>
            <CgArrowLeft onClick={()=>setDirection('from 270deg')} style={direction==='from 270deg' ? styles.selectedSvg : styles.gradientSectionSvg}/>
            <CgArrowTopLeft onClick={()=>setDirection('from 315deg')} style={direction==='from 315deg' ? styles.selectedSvg : styles.gradientSectionSvg}/>
            <CgArrowUp onClick={()=>setDirection('from 360deg')} style={direction==='from 360deg' ? styles.selectedSvg : styles.gradientSectionSvg}/>
</div>}
            </div>
            <p style={styles.tabcontentP}>{output}</p>

          </div>
      </div>
    </div>
  );
}
