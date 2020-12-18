function GridBox(props) {
  const boxStyle = {};
  if (props.colorData !== "X") {
    const color = props.gridColors[props.colorData];
    boxStyle.backgroundColor = color;
  }

  return (
    <div className="gridBox" id={props.position} onClick={props.onBoxClick} style={boxStyle}></div>
  )
}

export default GridBox;