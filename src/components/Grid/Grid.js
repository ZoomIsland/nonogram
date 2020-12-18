// import GridColor from '../GridColor/GridColor';
import ColorChooser from '../../containers/ColorChooser';
// import GridRow from '../GridRow';
import GridActual from '../GridActual';

import './Grid.css';

function Grid(props) {
  // this will get a grid size, grid colors, and grid data from state (during playtime)
  // it can also update the GridCreator component details, which will update its size, colors, and data

  const gridColors = props.gridColors.map((color, index) => {
    if (props.selectedColorIndex === index) {
      return <ColorChooser 
            background={color} 
            key={index}
            colorIndex={index}
            selected={"true"} 
            onColorClick={props.onColorClick}
          />
    } else {
      return <ColorChooser 
              background={color} 
              key={index}
              colorIndex={index}
              selected={"false"}
              onColorClick={props.onColorClick} 
            />
    }
  })


  return (
    <div className="fullGrid">
      <div className="gridColors">
        {gridColors}
      </div>
      <GridActual 
        gridAnswer={props.gridAnswer} 
        onBoxClick={props.onBoxClick}
        gridColors={props.gridColors} />
    </div>
  )
}

export default Grid;