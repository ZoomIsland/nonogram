import Grid from '../Grid';
import GridColor from '../GridColor/GridColor';

import './SolverGrid.css'

function SolverGrid(props) {

  const getColors = props.colors.map((color, index) => {
    return (
      <GridColor
        gridType="solver" 
        color={color}
        colorIndex={index}
        selectedColorIndex={props.selectedColorIndex}
        onColorClick={props.onColorClick} />
    )
  })

  return (
    <div className="solverActual">
      <h2>{props.data.title}</h2>
      <h3>By some author</h3>
      <div className="solverColorContainer">
        {getColors}
      </div>
      <Grid 
          gridAnswer={props.currentAttempt}
          gridColors={props.colors}
          onMouseDownOnBox={props.onMouseDownOnBox}
          onMouseEnterBox={props.onMouseEnterBox}
          onMouseUpOnBox={props.onMouseUpOnBox} 
        />
    </div>
  )
}

export default SolverGrid;