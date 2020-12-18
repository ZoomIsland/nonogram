import './GridColor.css';

function GridColor(props) {
  function displayOnHover() {
    if (props.hover === true) {
      return "";
    } else {
      return "hidden";
    }
  }

  if (props.selected === "true") {
    return <div 
            className="gridColor selectedColor" 
            style={{backgroundColor: props.color}}
            onClick={() => props.onColorClick(props.colorIndex)}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}>
              <div className={"editBtn " + displayOnHover()} onClick={props.onEditClick}>Edit</div>
          </div>
  }
  return (
    <div 
      className="gridColor" 
      style={{backgroundColor: props.color}}
      onClick={() => props.onColorClick(props.colorIndex)}>
    </div>
  )
}

export default GridColor;