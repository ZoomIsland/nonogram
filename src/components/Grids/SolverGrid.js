import Grid from '../Grid';
import GridColor from '../GridColor/GridColor';

import './SolverGrid.css'

function SolverGrid(props) {

  const getColors = props.colors.map((color, index) => {
    return (
      <GridColor
        gridType="solver" 
        color={color}
        colorIndex={index}
        selectedColorIndex={props.selectedColorIndex}
        onColorClick={props.onColorClick} />
    )
  })

  // function getTupleArray(array) {
  //   let tupleArray = [];
  //   let count = 0;
  //   let prevColorIndex = array[0];
  //   let colorIndex, nextColorIndex;
  //   let index = 0;
  //   while (index < array.length) {
  //     colorIndex = array[index];

  //     //current is X, previous is NOT.
  //     if (colorIndex === "X" && count > 0) {
  //       tupleArray.push([prevColorIndex, count])
  //       count = 0;
  //     // current is X, previous WAS.
  //     } else if (colorIndex === "X") {
  //       count = 0;
  //     } else { // current is a digit
  //       count++;
  //       if (array[index + 1] !== -1) { // if there's a next digit to test
  //         nextColorIndex = array[index + 1];
  //         if (colorIndex !== nextColorIndex) {
  //           tupleArray.push([colorIndex, count])
  //           count = 0;
  //         }
  //       } else { // if it's the last one
  //         tupleArray.push([colorIndex, count])
  //       }
  //     }
  //     prevColorIndex = colorIndex;
  //     index++;
  //   }
  //   return tupleArray;
  // }

  const getColumnClues = props.columnClues.map(column => {
    return (
      <div className="clueColumn">
        {column.map(clues => {
          return (
            <div className="clueBox" style={{backgroundColor: props.colors[clues[0]]}}>{clues[1]}</div>
          )
        })}
      </div>
    )
  })

  // function getColumnClues() {
  //   // make array across columns to map across
  //   // let columnArray = [];
  //   // for (let i = 0; i < props.data.width; i++) {
  //   //   let column = [];
  //   //   for (let j = 0; j < props.data.height; j++) {
  //   //     column.push(props.data.nonogramArray[j][i])
  //   //   }
  //   //   let tupleColumns = getTupleArray(column)
  //   //   columnArray.push(tupleColumns)
  //   // }

  //   return columnArray.map(column => {
  //     return (
  //       <div className="clueColumn">
  //         {column.map(clues => {
  //           return (
  //             <div className="clueBox" style={{backgroundColor: props.colors[clues[0]]}}>{clues[1]}</div>
  //           )
  //         })}
  //       </div>
  //     )
  //   })
  // }

  const getRowClues = props.rowClues.map(row => {
    return (
      <div className="clueRow">
        {row.map(clues => {
          return (
            <div className="clueBox" style={{backgroundColor: props.colors[clues[0]]}}>{clues[1]}</div>
          )
        })}
      </div>
    )
  })

  // function getRowClues() {
  //   // let rowArray = [];
  //   // for (let i = 0; i < props.data.height; i++) {
  //   //   let tupleRows = getTupleArray(props.data.nonogramArray[i])
  //   //   rowArray.push(tupleRows);
  //   // }

  //   return rowArray.map(row => {
  //     return (
  //       <div className="clueRow">
  //         {row.map(clues => {
  //           return (
  //             <div className="clueBox" style={{backgroundColor: props.colors[clues[0]]}}>{clues[1]}</div>
  //           )
  //         })}
  //       </div>
  //     )
  //   })
  // }

  return (
    <div className="solverActual">
      <h2>{props.data.title}</h2>
      <h3>By some author</h3>
      <div className="solverColorContainer">
        {getColors}
      </div>
      <div className="cluesAndGrid">
        <div className="rowClues">
          {getRowClues}
        </div>
        <div className="columnsAndGrid">
          <div className="columnClues">
            {getColumnClues}
          </div>
          <Grid 
              gridAnswer={props.currentAttempt}
              gridColors={props.colors}
              onMouseDownOnBox={props.onMouseDownOnBox}
              onMouseEnterBox={props.onMouseEnterBox}
              onMouseUpOnBox={props.onMouseUpOnBox} 
            />
        </div>
      </div>
      
    </div>
  )
}

export default SolverGrid;