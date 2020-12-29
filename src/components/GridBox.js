function GridBox(props) {
  const boxStyle = {};
  if (props.colorData !== "X") {
    const color = props.gridColors[props.colorData];
    boxStyle.backgroundColor = color;
  } else {
    boxStyle.backgroundColor = "white";
  }

  return (
    <div 
      className="gridBox" 
      id={props.position}
      onMouseDown={props.onMouseDownOnBox}
      onMouseEnter={props.onMouseEnterBox}
      onMouseUp={props.onMouseUpOnBox}
      style={boxStyle}>
    </div>
  )
}

export default GridBox;