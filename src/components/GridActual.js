import GridBox from './GridBox';

function GridActual(props) {
  const getBoxes = props.gridAnswer.map((row, rowIndex) => {
    return (
      <div className="gridRow" key={`row${rowIndex}`}>
        {row.map((column, columnIndex) => <GridBox 
                                          key={`r${rowIndex}c${columnIndex}`} 
                                          position={`r${rowIndex}c${columnIndex}`}
                                          gridColors={props.gridColors}
                                          colorData={column}
                                          onMouseDownOnBox={props.onMouseDownOnBox}
                                          onMouseEnterBox={props.onMouseEnterBox}
                                          onMouseUpOnBox={props.onMouseUpOnBox} />)}
      </div>
    )
  })

  return (
    <div className="gridActual">
      {getBoxes}
    </div>
  )
}

export default GridActual;