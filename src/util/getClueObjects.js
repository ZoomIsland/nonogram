function getClueObjects(array) {
  // array of values arrives.
  // from creator, options area only "X" or 0-7.
  // from solver, could also be ""

  let tupleArray = [];
  let count = 0;
  let prevColorIndex = array[0];
  let colorIndex, nextColorIndex;
  let index = 0;
  while (index < array.length) {
    colorIndex = array[index];

    //current is X, previous is NOT.
    if (colorIndex === "X" && count > 0) {
      // tupleArray.push([prevColorIndex, count])
      tupleArray.push(
        {colorIndex: prevColorIndex,
          count: count,
          endIndex: index - 1,
          solved: false}
      )
      count = 0;
    // current is X, previous WAS.
    } else if (colorIndex === "X") {
      count = 0;
    } else { // current is a digit
      count++;
      if (array[index + 1] !== -1) { // if there's a next digit to test
        nextColorIndex = array[index + 1];
        if (colorIndex !== nextColorIndex) {
          // tupleArray.push([colorIndex, count])
          tupleArray.push(
            {colorIndex: colorIndex,
              count: count,
              endIndex: index,
              solved: false}
          )
          count = 0;
        }
      } else { // if it's the last one
        // tupleArray.push([colorIndex, count])
        tupleArray.push(
          {colorIndex: colorIndex,
            count: count,
            endIndex: index,
            solved: false}
        )
      }
    }
    prevColorIndex = colorIndex;
    index++;
  }
  return tupleArray;
}

export default getClueObjects;