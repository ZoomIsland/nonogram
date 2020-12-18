import GridBox from './GridBox';

function GridActual(props) {
  const getBoxes = props.gridAnswer.map((row, rowIndex) => {
    return (
      <div className="gridRow" key={`row${rowIndex}`}>
        {row.map((column, columnIndex) => <GridBox 
                                          key={`r${rowIndex}c${columnIndex}`} 
                                          position={`r${rowIndex}c${columnIndex}`} 
                                          onBoxClick={props.onBoxClick}
                                          gridColors={props.gridColors}
                                          colorData={column} />)}
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