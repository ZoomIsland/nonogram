import ColorChooser from '../../containers/ColorChooser';
import GridActual from '../GridActual';

import './Grid.css';

function Grid(props) {
  // this will get a grid size, grid colors, and grid data from state (during playtime)
  // it can also update the GridCreator component details, which will update its size, colors, and data

  const gridColors = props.gridColors.map((color, index) => {
    if (props.selectedColorIndex === index) {
      return <ColorChooser 
            color={color} 
            key={index}
            colorIndex={index}
            selected={"true"}
            onColorChange={props.onColorChange} 
            onColorClick={props.onColorClick}
          />
    } else {
      return <ColorChooser 
              color={color} 
              key={index}
              colorIndex={index}
              selected={"false"}
              onColorChange={props.onColorChange} 
              onColorClick={props.onColorClick} 
            />
    }
  })


  return (
    <div className="fullGrid">
      <div className="gridColors">
        {gridColors}
        <div className="addColor">
          <i className="fas fa-plus-circle fa-2x"></i>
        </div>
      </div>
      <GridActual 
        gridAnswer={props.gridAnswer}
        onMouseDownOnBox={props.onMouseDownOnBox}
        onMouseEnterBox={props.onMouseEnterBox}
        onMouseUpOnBox={props.onMouseUpOnBox}
        gridColors={props.gridColors} />
    </div>
  )
}

export default Grid;