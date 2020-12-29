import './IndexShow.css';

import { NavLink } from 'react-router-dom';

function NonogramIndexShow(props) {
  function getImageStyle() {
    const width = (props.data.width * 5) + "px";
    const height = (props.data.height * 5) + "px";
    return {
      width: width,
      height: height
    }
  }

  function getBoxStyle(background) {
    if (background === "X") {
      background = "white";
    }

    return {
      background: background,
      width: "5px",
      height: "5px",
    }
  }

  // this is pretty close to how the creator renders...
  // could I use a similar component?
  const drawNonogram = props.data.nonogramArray.map((row, index) => {
    return (
    <div className="nonoRowSmall" key={index}>
      {row.map((box, index) => {
        return (
          <div className="nonoBoxSmall" style={getBoxStyle(props.data.colorArray[box])}></div>
        )
      })}
    </div>
    )
  })

  return (
    <NavLink to={`/nonograms/${props.data._id}`}>
      <div className="indexShowContainer">
        <div className="nonogramVisual" style={getImageStyle()}>
          {drawNonogram}
        </div>
        <div className="indexDetails">
          <h2>{props.data.title}</h2>
          <h3>By Author</h3>
          <h4>Size: {props.data.width} x {props.data.height}</h4>
        </div>
      </div>
    </NavLink>
  )
}

export default NonogramIndexShow;