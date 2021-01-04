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

  const getColumnClues = props.columnClues.map(column => {
    return (
      <div className="clueColumn">
        {column.map(clues => {
          if (clues.solved) {
            return (
              <div className="clueBox solvedClue" style={{backgroundColor: props.colors[clues.colorIndex]}}>
                <div className="clueX"></div>
                <p>{clues.count}</p>
              </div>
            )
          } else {
            return (
              <div className="clueBox" style={{backgroundColor: props.colors[clues.colorIndex]}}>
                <p>{clues.count}</p>
              </div>
            )}
        })}
      </div>
    )
  })

  const getRowClues = props.rowClues.map(row => {
    return (
      <div className="clueRow">
        {row.map(clues => {
          if (clues.solved) {
            return (
              <div className="clueBox solvedClue" style={{backgroundColor: props.colors[clues.colorIndex]}}>
                <div className="clueX"></div>
                <p>{clues.count}</p>
              </div>
            )
          } else {
            return (
              <div className="clueBox" style={{backgroundColor: props.colors[clues.colorIndex]}}>
                <p>{clues.count}</p>
              </div>
            )}
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