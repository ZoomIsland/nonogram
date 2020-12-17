import GridBox from './GridBox';

function GridRow(props) {
  const getRows = () => {
    let boxes = [];
    for (let i = 0; i < props.columns; i++) {
      boxes.push(<GridBox />)
    }
    return boxes;
  }

  return (
    <div className="gridRow">
      {getRows()}
    </div>
  )
}

export default GridRow;