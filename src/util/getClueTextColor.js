function getClueTextColor(property, hexColor) {
  let whiteStyle, blackStyle;
  switch (property) {
    case "text":
      whiteStyle = {color: "white"};
      blackStyle = {color: "black"};
      break;
    case "background":
      whiteStyle = {backgroundColor: "white"};
      blackStyle = {backgroundColor: "black"};
      break;
    default:
      whiteStyle = {color: "white"};
      blackStyle = {color: "black"};

  }
  let redColor = parseInt(hexColor.substring(1,3), 16);
  let greenColor = parseInt(hexColor.substring(3, 5), 16);
  let blueColor = parseInt(hexColor.substring(5,7), 16);

  // perceived brightness found here:
  // https://www.nbdtech.com/Blog/archive/2008/04/27/Calculating-the-Perceived-Brightness-of-a-Color.aspx
  const brightness  =  Math.sqrt( (.241 * redColor * redColor) + (.691 * greenColor * greenColor) + (.068 * blueColor * blueColor));

  if (brightness > 130) {
    return blackStyle;
  } else {
    return whiteStyle;
  }
}

export default getClueTextColor;