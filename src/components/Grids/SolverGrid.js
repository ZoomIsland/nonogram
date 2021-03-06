import Grid from '../Grid';
import GridColor from '../GridColor/GridColor';
import ClueBox from '../ClueBox';

import './SolverGrid.css'

function SolverGrid(props) {
  const getColors = props.colors.map((color, index) => {
    return (
      <GridColor
        key={`color${index}`}
        gridType="solver" 
        color={color}
        colorIndex={index}
        selectedColorIndex={props.selectedColorIndex}
        onColorClick={props.onColorClick} />
    )
  })

  const getColumnClues = props.columnClues.map((column, cIndex) => {
    return (
      <div className="clueColumn" key={`column${cIndex}`}>
        {column.map((clues, rIndex) => {
            return (
              <ClueBox
                key={`c${cIndex}r${rIndex}`}
                solved={clues.solved}
                color={props.colors[clues.colorIndex]}
                count={clues.count} />
            )
          })}
      </div>
    )
  })

  const getRowClues = props.rowClues.map((row, rIndex) => {
    return (
      <div className="clueRow" key={`row${rIndex}`}>
        {row.map((clues, cIndex) => {
            return (
              <ClueBox
                key={`r${rIndex}c${cIndex}`}
                solved={clues.solved}
                color={props.colors[clues.colorIndex]}
                count={clues.count} />
            )
          })}
      </div>
    )
  })

  return (
    <div className="solverActual">
      <h2>{props.data.title}</h2>
      <h3>By some author</h3>
      <div className="solverColorContainer">
        {getColors}
      </div>
      <div className="cluesAndGrid">
        <div className="rowClues">
          {getRowClues}
        </div>
        <div className="columnsAndGrid">
          <div className="columnClues">
            {getColumnClues}
          </div>
          <Grid 
              gridAnswer={props.currentAttempt}
              gridColors={props.colors}
              onMouseDownOnBox={props.onMouseDownOnBox}
              onMouseEnterBox={props.onMouseEnterBox}
              onMouseUpOnBox={props.onMouseUpOnBox} 
            />
        </div>
      </div>
      
    </div>
  )
}

export default SolverGrid;