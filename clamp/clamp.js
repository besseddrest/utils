window.onload = function() {
  const form = document.getElementById('my-form');
  form.onsubmit = (ev) => {
    handleFormSubmit(ev);
  }
}

function handleFormSubmit(ev) {
  ev.preventDefault();
  const data = new FormData(ev.target);
  const dataObject = Object.fromEntries(data.entries());
  const inputRemValues = convertToRem(dataObject);
  const slope = getSlope(inputRemValues);
  const intersection = getIntersection(inputRemValues, slope);
  return generateExpression(slope, intersection);
}

function convertToRem(data) {
  const dataObject = {}

  for (let [key, value] of Object.entries(data)) {
    dataObject[key] = parseInt(value) / 16;
  }
  return dataObject;
}

function getSlope(data) {
  // slope = (maxFontSize - minFontSize) / (maxWidth - minWidth)
  const top = data['element-max-size'] - data['element-min-size'];
  const bottom = data['viewport-max-size'] - data['viewport-min-size'];
  return (top / bottom);
}

function getIntersection(data, slope) {
  // yAxisIntersection = -minWidth * slope + minFontSize
  const float = (-1 * data['viewport-min-size']) * slope + data['element-min-size'];
  return float;
}

function generateExpression(slope, intersection) {
  const result = document.querySelector('#result span');
  const truncateSlope = slope.toFixed(4);
  const truncateIntersection = intersection.toFixed(4);
  const val = `${truncateIntersection}rem + ${truncateSlope}vw`;
  result.innerHTML = val;
}


