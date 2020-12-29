import SolverGrid from './Grids/SolverGrid';

function NonogramSolver(props) {
  return (
    <div className="solverActual">
      <h2>{props.data.title}</h2>
      <h3>By some author</h3>
      <SolverGrid 
        colors={props.colors}
        selectedColorIndex={props.selectedColorIndex}
        onColorClick={props.onColorClick}
        onMouseDownOnBox={props.onMouseDownOnBox}
        onMouseEnterBox={props.onMouseEnterBox}
        onMouseUpOnBox={props.onMouseUpOnBox}
        currentAttempt={props.currentAttempt}
      />
    </div>
  )
}

export default NonogramSolver;