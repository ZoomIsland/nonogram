import GridBox from './GridBox';

function GridActual(props) {
  const getBoxes = props.gridAnswer.map((row, rowIndex) => {
    return (
      <div className="gridRow">
        {row.map((column, columnIndex) => <GridBox position={`r${rowIndex}c${columnIndex}`} />)}
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