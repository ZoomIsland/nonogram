function getClueObjects(array) {
  // array of arrays arrives -- "nonogramData" from the API
  let tupleArray = [];
  let count = 0;
  let prevColorIndex = array[0];
  let colorIndex, nextColorIndex;
  let index = 0;
  while (index < array.length) {
    colorIndex = array[index];

    //current is X, previous is NOT.
    if (colorIndex === "X" && count > 0) {
      tupleArray.push([prevColorIndex, count])
      count = 0;
    // current is X, previous WAS.
    } else if (colorIndex === "X") {
      count = 0;
    } else { // current is a digit
      count++;
      if (array[index + 1] !== -1) { // if there's a next digit to test
        nextColorIndex = array[index + 1];
        if (colorIndex !== nextColorIndex) {
          tupleArray.push([colorIndex, count])
          count = 0;
        }
      } else { // if it's the last one
        tupleArray.push([colorIndex, count])
      }
    }
    prevColorIndex = colorIndex;
    index++;
  }
  return tupleArray;
}

export default getClueObjects;