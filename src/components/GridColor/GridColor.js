import './GridColor.css';

function GridColor(props) {
  if (props.selectedColorIndex === props.colorIndex) {
    return <div 
            className="gridColor selectedColor" 
            style={{backgroundColor: props.color}}
            onClick={() => props.onColorClick(props.colorIndex)}
            >
              <div className={"editBtn"}>
                <p>Click to Edit</p>
              </div>
          </div>
  } else {
    return (
      <div 
        className="gridColor" 
        style={{backgroundColor: props.color}}
        onClick={() => props.onColorClick(props.colorIndex)}>
      </div>
    )
  }
}

export default GridColor;