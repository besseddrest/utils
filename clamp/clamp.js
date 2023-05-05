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
  console.log('slope: ', slope); // 0.0144
  const intersection = getIntersection(inputRemValues, slope);
  console.log('float: ', intersection);
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
  // 22 - 16 / 991 - 576
  // 1.375 - 1 / 61.938 - 36
  // .375 / 25.938
  console.log('getSlope');
  console.log(top, bottom);

  return (top / bottom);
}

function getIntersection(data, slope) {
  // yAxisIntersection = -minWidth * slope + minFontSize
  // -576 * 0.0144 + 1
  const float = (-1 * data['viewport-min-size']) * slope + data['element-min-size'];
  // float: -7.2944
  return float;
}

function generateExpression(slope, intersection) {
  // slope:  0.014457831325301205
  // float:  0.47951807228915666
  const result = document.querySelector('#result span');
  const truncateSlope = (slope * 100).toFixed(4);
  const truncateIntersection = intersection.toFixed(4);
  const val = `${truncateIntersection}rem + ${truncateSlope}vw`;
  result.innerHTML = val;
}


