import getClueTextColor from '../util/getClueTextColor';

function ClueBox(props) {
  return (
    <div className={props.solved ? "clueBox solvedClue" : "clueBox"} style={{backgroundColor: props.color}}>
      {props.solved && 
        <div className="clueX" style={getClueTextColor("background", props.color)}></div>
      }
      <p style={getClueTextColor("text", props.color)}>{props.count}</p>
    </div>
  )
}

export default ClueBox;