import './GridColor.css';

function GridColor(props) {
  return (
    <div className="gridColor" style={{backgroundColor: props.background}}></div>
  )
}

export default GridColor;