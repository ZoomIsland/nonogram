function NonogramIndexShow(props) {
  function createImage() {
    // iterate through string
    let count = 0;
    for (let i = 0; i < props.data.nonogramString.length; i++) {
      // run charAt i
      // add element to final array?
      //
    }
    // make new row at width
    // render small image based on that...
  }

  return (
    <div className="indexShowContainer">
      <h2>{props.data.title}</h2>
      <h3>By Author</h3>
      <h4>Size: {props.data.width} x {props.data.height}</h4>
    </div>
  )
}

export default NonogramIndexShow;