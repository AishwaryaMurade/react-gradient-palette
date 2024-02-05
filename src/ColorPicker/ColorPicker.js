import React, { useEffect, useRef, useState } from 'react'
// import styles from './ColorPicker.module.css'
import tinycolor from 'tinycolor2';

export const ColorPicker = ({ setColor,selectedColor }) => {

    const ref = useRef(null)
    const [changeRgb, setChangeRgb] = useState(false)
    const styles = {
      colorpicker: {
        position: 'relative',
        background: '#fff',
        width: '195px',
        paddingLeft: '20px',
        boxSizing: 'content-box'

      },
      hue: {
        width: '20px',
        position: 'absolute',
        top: '0',
        bottom: '0',
        overflow: 'hidden',
        transform: 'translate(-100%, 0)',
        background: 'linear-gradient(to bottom, red 0, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, red)',
      },
      hueDrag: {
        '--y': '0',
        width: '20px',
        height: '2px',
        top: '-2px',
        right: '0',
        position: 'absolute',
        background: '#000',
        transform: 'translate(0, var(--y))',
      },
      field: {
        '--backgroundHue': '150',
        width: '100%',
        paddingBottom: '80%',
        position: 'relative',
        background: 'hsl(var(--backgroundHue), 100%, 50%)',
      },
      fieldOverlay: {
        position: 'absolute',
        left: '0',
        top: '0',
        right: '0',
        bottom: '0',
        background: 'linear-gradient(to bottom, transparent, #000), linear-gradient(to right, #fff, transparent)',
      },
      fieldOverlayDrag: {
        '--x': '0',
        '--y': '0',
        position: 'absolute',
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        left: '-10px',
        top: '-10px',
        border: '2px solid #fff',
        boxShadow: '0 0 1px rgba(0, 0, 0, 0.8)',
        transform: 'translate(var(--x), var(--y))',
      },
      label: {
        textAlign: 'center',
        color: '#000',
        fontSize: '14px',
        display: 'block',
        fontWeight: '700',
        margin: '2px 0 0 0',
        justifyContent: 'space-around',
        display: 'flex'
      },
      input: {
        outline: 'none',
        border: 'none',
        fontFamily: 'inherit',
        padding: '5px',
        display: 'block',
        textAlign: 'center',
        color: '#333',
        fontSize: '16px',
        background: '#eee',
        width: '135px',
        marginBottom: '10px',
        height: '25px',
        borderRadius: '6px',
        boxShadow: 'inset rgb(2 2 2 / 20%) 0 0 0 1px',
      },

      strong: {
        display: 'block',
        color: '#333',
        fontSize: '14px',
        padding: '5px 10px',
        minWidth: '60px',
        margin: '0 0 6px',
        background: '#eee',
      },
      rgbSection: {
        display: 'flex',
        flexDirection: 'row',
        gridGap: '5px',
        gap: '5px',
        width: '100%',
        justifyContent: 'space-around',
      },
      rgbInput:{
        width: '45px',
    margin: '0'
      },
      hexDiv:{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '5px',
        marginTop:'10px'
      }
    };

    useEffect(() => {
        const colorpicker = ref.current;
          minimalColorpicker(colorpicker, {
            color: setColor,

            onUpdateColor: function (color) {
              selectedColor(color);
            }
          });
      }, []); // Empty dependency array to run the effect only once on mount

      useEffect(()=>{
        var self = ref.current;
        if ( tinycolor(setColor).isValid()) {
            var c = tinycolor(setColor);
            self.color = c.toHsl();
            self.setColorHue();
            self.setOutput(changeRgb);
          }
      },[setColor,changeRgb])

      function componentToHex(c) {
        var hex = Number(c).toString(16);
        return hex.length == 1 ? "0" + hex : hex;
      }
      function minimalColorpicker(element, options) {
        var defaults = {
          color: "#000000"
        };

        var settings = Object.assign({}, defaults, options);
        var self = element;
        var hue = document.createElement("div");
        Object.assign(hue.style, styles.hue);
        // hue.classList.add(styles.hue);
        var hueDrag = document.createElement("div");
        Object.assign(hueDrag.style, styles.hueDrag);
        // hueDrag.classList.add(styles.hueDrag);
        hue.appendChild(hueDrag);

        self.appendChild(hue);

        var field = document.createElement("div");
        Object.assign(field.style, styles.field);
        // field.classList.add(styles.field);
        var fieldOverlay = document.createElement("div");
        Object.assign(fieldOverlay.style, styles.fieldOverlay);

        // fieldOverlay.classList.add(styles.fieldOverlay);
        var fieldDrag = document.createElement("div");
        // fieldDrag.classList.add(styles.drag);
        Object.assign(fieldDrag.style, styles.fieldOverlayDrag);

        fieldOverlay.appendChild(fieldDrag);
        field.appendChild(fieldOverlay);

        self.appendChild(field);
        var hexDiv = document.createElement("div");
        Object.assign(hexDiv.style, styles.hexDiv);
        var label = document.createElement("label");
        Object.assign(label.style, styles.label);
        label.textContent = "HEX";
        hexDiv.appendChild(label);

        var input = document.createElement("input");
        Object.assign(input.style, styles.input);

        input.value = "#ffffff";
        hexDiv.appendChild(input);
        self.appendChild(hexDiv);


        var div = document.createElement("div");
        // div.classList.add(styles.rgbSection)
        Object.assign(div.style, styles.rgbSection);

        self.appendChild(div);
        var rinput = document.createElement("input");
        Object.assign(rinput.style, {...styles.input,...styles.rgbInput});

        rinput.value = tinycolor(self.color).toRgb().r;
        // self.appendChild(rinput);
        div.appendChild(rinput)

        var ginput = document.createElement("input");
        Object.assign(ginput.style, {...styles.input,...styles.rgbInput});

        ginput.value = tinycolor(self.color).toRgb().g;
        div.appendChild(ginput)


        var binput = document.createElement("input");
        Object.assign(binput.style, {...styles.input,...styles.rgbInput});

        binput.value = tinycolor(self.color).toRgb().b;
        div.appendChild(binput)

        var rgbLabel = document.createElement("div");
        // rgbLabel.classList.add(styles.rgbLabel)
        Object.assign(rgbLabel.style, styles.label);

        rgbLabel.innerHTML=`<strong style="${styles.strong}">R</strong><strong>G</strong><strong>B</strong>`
        self.appendChild(rgbLabel);

        self.hue = hue;
        self.hue.drag = hueDrag;

        self.fieldBase = field;
        self.field = fieldOverlay;
        self.field.drag = fieldDrag;

        self.color = tinycolor(settings.color).toHsl();

        if (tinycolor(self.dataset.color).isValid()) {
          self.color = tinycolor(self.dataset.color).toHsl();
        }

        self.updateHue = function (e) {
          self.setHue((e.offsetY / hue.offsetHeight) * 360);
          if (!self.hue.onmousemove) {
            self.hue.onmousemove = function (e) {
              if (e.target === self.hue) {
                self.setHue((e.offsetY / hue.offsetHeight) * 360);
                e.stopPropagation();
              }
            };
          }
          self.clearMousemove("hue");
        };

        self.updateColor = function (e) {
          self.setColorPos(e.offsetX, e.offsetY);
          if (!self.field.onmousemove) {
            self.field.onmousemove = function (e) {
              if (e.target === self.field) {
                self.setColorPos(e.offsetX, e.offsetY);
                e.stopPropagation();
              }
            };
          }
          self.clearMousemove("field");
        };

        self.setColorPos = function (x, y) {
          self.field.drag.style.setProperty("--x", x + "px");
          self.field.drag.style.setProperty("--y", y + "px");
          self.color = tinycolor({
            h: self.color.h,
            s: (x / (field.offsetWidth - 1)) * 100,
            v: (1 - y / (field.offsetHeight - 1)) * 100
          }).toHsl();
          self.setColorHue();
        };

        self.setHue = function (a) {
          self.color.h = a;
          self.setColorHue();
        };

        self.setColorHue = function () {
          var c = tinycolor(self.color);
          var chsv = c.toHsv();
          c = c.toHslString();
          self.field.drag.style.setProperty(
            "--x",
            Math.round(chsv.s * (field.offsetWidth - 1)) + "px"
          );
          self.field.drag.style.setProperty(
            "--y",
            Math.round((1 - chsv.v) * field.offsetHeight) + "px"
          );
          self.hue.drag.style.setProperty(
            "--y",
            (self.color.h / 360) * hue.offsetHeight + "px"
          );
          self.fieldBase.style.setProperty("--backgroundHue", self.color.h);
          if (options.onUpdateColor !== undefined) {
            options.onUpdateColor({
              hex: tinycolor(self.color).toHex(),
              rgb: tinycolor(self.color).toRgb(),
              rgbString: tinycolor(self.color).toRgbString()
            });
          }

        };

        self.setOutput = function (val) {
        //   body.style.backgroundColor = "#" + tinycolor(self.color).toHex();

          input.value = "#" + tinycolor(self.color).toHex();
          if(!val){
            rinput.value = tinycolor(self.color).toRgb().r;
            ginput.value = tinycolor(self.color).toRgb().g;
            binput.value = tinycolor(self.color).toRgb().b;
          }



        };

        self.combineFunc = function () {

          if (input.value.length == 7 && tinycolor(input.value).isValid()) {
            var c = tinycolor(input.value);
            self.color = c.toHsl();
            self.setColorPos(
              Math.round(c.toHsv().s * (field.offsetWidth - 1)),
              Math.round((1 - c.toHsv().v) * field.offsetHeight)
            );
            self.setColorHue();
            // self.setOutput();

          }
        }
        self.updateOutput = function () {
          setChangeRgb(false)
          self.combineFunc()
        };

        self.updateRGB = function (e) {
          setChangeRgb(true)
          if(rinput.value==='' || ginput.value==='' || binput.value===''){

            return
          }
          if (rinput.value >= 0 && rinput.value <= 255 && ginput.value >= 0 && ginput.value <= 255 && binput.value >= 0 && binput.value <= 255 ) {

            var hex =  "#" + componentToHex(rinput.value) + componentToHex(ginput.value) + componentToHex(binput.value);
            if(tinycolor(hex).isValid()){
               input.value = hex
               self.combineFunc()
            }

          }
        };

        self.clearMousemove = function (m) {
          if (!document.onmouseup) {
            document.onmouseup = function () {
              self[m].onmousemove = null;
              document.onmouseup = null;
            };
          }
        };

        input.addEventListener("change", self.updateOutput);
        input.addEventListener("keyup", self.updateOutput);
        input.addEventListener("click", ()=>setChangeRgb(false));
        rinput.addEventListener("change", self.updateRGB);
        ginput.addEventListener("change", self.updateRGB);
        binput.addEventListener("change", self.updateRGB);
        rinput.addEventListener("keyup", self.updateRGB);
        ginput.addEventListener("keyup", self.updateRGB);
        binput.addEventListener("keyup", self.updateRGB);
        field.addEventListener("mousedown", self.updateColor);
        hue.addEventListener("mousedown", self.updateHue);

        self.setColorHue();
        self.setHue(self.color.h);
      }

  return (<div>
<div style={styles.colorpicker} ref={ref}></div>
  </div>)
}
