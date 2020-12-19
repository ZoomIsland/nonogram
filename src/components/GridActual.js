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

  function calcGridStyle() {
    let style = {
      position: "relative"
    }
    if (props.gridAnswer.length) {
      console.log(props.gridAnswer)
      const calcWidth = (props.gridAnswer[0].length * 25).toString() + "px";
      style.width = calcWidth;
    } else {
      style.width = "auto";
    }
    return style;
  }

  return (
    <div className="gridActual" style={calcGridStyle()}>
      {getBoxes}
      <i className="fas fa-arrows-alt-h fa-3x controlSlider columnControl">
        <span className="controlMinus" onClick={props.onColumnMinus}>-</span>
        <span className="controlPlus" onClick={props.onColumnPlus}>+</span>
      </i>
      <i className="fas fa-arrows-alt-h fa-3x controlSlider rowControl">
        <span className="controlMinus" onClick={props.onRowMinus}>-</span>
        <span className="controlPlus" onClick={props.onRowPlus}>+</span>
      </i>
    </div>
  )
}

export default GridActual;