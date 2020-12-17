import GridColor from '../GridColor/GridColor';
import GridRow from '../GridRow';

import './Grid.css';

function Grid(props) {
  // this will get a grid size, grid colors, and grid data from state (during playtime)
  // it can also update the GridCreator component details, which will update its size, colors, and data

  const gridColors = props.gridColors.map((color, index) => {
    return <GridColor background={color} key={index} />
  })

  // create a row, then fill with box divs based on columns
  const gridActual = () => {
    let gridActual =[];
    for (let i = 0; i < props.gridHeight; i++) {
      gridActual.push(<GridRow columns={props.gridWidth} />)
    }
    return gridActual;
  }

  return (
    <div className="fullGrid">
      <div className="gridColors">
        {gridColors}
      </div>
      <div className="gridActual">
        {gridActual()}
      </div>
    </div>
  )
}

export default Grid;