import './GridColor.css';

function GridColor(props) {
  if (props.selected === "true") {
    return <div 
            className="gridColor selectedColor" 
            style={{backgroundColor: props.background}}
            onClick={() => props.onColorClick(props.colorIndex)}>
          </div>
  }
  return (
    <div 
      className="gridColor" 
      style={{backgroundColor: props.background}}
      onClick={() => props.onColorClick(props.colorIndex)}>
    </div>
  )
}

export default GridColor;