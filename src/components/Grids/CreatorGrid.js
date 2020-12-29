import ColorChooser from '../../containers/ColorChooser';
import Grid from '../Grid';

import './CreatorGrid.css';

function CreatorGrid(props) {
  // this will get a grid size, grid colors, and grid data from state (during playtime)
  // it can also update the GridCreator component details, which will update its size, colors, and data

  const gridColors = props.gridColors.map((color, index) => {
    // if (props.selectedColorIndex === index) {
      return <ColorChooser 
            color={color} 
            key={index}
            colorIndex={index}
            // selected={"true"}
            selectedColorIndex={props.selectedColorIndex}
            onColorChange={props.onColorChange} 
            onColorClick={props.onColorClick}
            editingColor={props.editingColor}
            onColorEditorClose={props.onColorEditorClose}
          />
    // } else {
    //   return <ColorChooser 
    //           color={color} 
    //           key={index}
    //           colorIndex={index}
    //           selected={"false"}
    //           onColorChange={props.onColorChange} 
    //           onColorClick={props.onColorClick} 
    //           onColorEditorClose={props.onColorEditorClose}
    //         />
    // }
  })

  function calcGridStyle() {
    let style = {
      position: "relative"
    }
    if (props.gridAnswer.length) {
      // console.log(props.gridAnswer)
      const calcWidth = (props.gridAnswer[0].length * 25).toString() + "px";
      style.width = calcWidth;
    } else {
      style.width = "auto";
    }
    return style;
  }


  return (
    <div className="fullGrid">
      <div className="gridColors">
        {gridColors}
        {props.gridColors.length <= 8 &&
          <div className="addColor" onClick={props.onAddColorClick}>
            <i className="fas fa-plus-circle fa-2x"></i>
          </div>
        }
      </div>
      <div className="gridActual" style={calcGridStyle()}>
        <Grid 
          gridAnswer={props.gridAnswer}
          gridColors={props.gridColors}
          onMouseDownOnBox={props.onMouseDownOnBox}
          onMouseEnterBox={props.onMouseEnterBox}
          onMouseUpOnBox={props.onMouseUpOnBox} 
        />
        <i className="fas fa-arrows-alt-h fa-3x controlSlider columnControl">
          <span className="controlMinus" onClick={props.onColumnMinus}>-</span>
          <span className="controlPlus" onClick={props.onColumnPlus}>+</span>
        </i>
        <i className="fas fa-arrows-alt-h fa-3x controlSlider rowControl">
          <span className="controlMinus" onClick={props.onRowMinus}>-</span>
          <span className="controlPlus" onClick={props.onRowPlus}>+</span>
        </i>
      </div>
    </div>
  )
}

export default CreatorGrid;