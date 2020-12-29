import GridBox from './GridBox';

function Grid(props) {

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
    <div className="nonogramGrid">
      {getBoxes}
    </div>
  )
}

export default Grid;