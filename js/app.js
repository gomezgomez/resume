let scene = document.querySelector('a-scene');
let sky = document.querySelector('a-sky');
let objectContainer = document.querySelector('#object-container');

// random num generator
function getRandomNumber(x, y) {
  return Math.floor(Math.random() * x + y);
}

// get random hex color
function getRandomColor() {
     var palette = ['#020659', '#010440', '#0388A6', '#F2CB05', '#dadafa', '#F20505']
  return palette[Math.floor(Math.random() * palette.length)]

   
//  var varters = '0123456789abcdef'
//  var randomColor = ''
//  for (var i = 0; i < 6; i++) {
//    randomColor += varters[Math.floor(Math.random() * 16)]
//  }
//  return '#' + randomColor
}

// set sky values
var skyColor = "#FFFFFF"

sky.setAttribute('color', skyColor)
//sky.setAttribute('animation__color', {
//  property: 'color',
//  dir: 'alternate',
// dur: 5000,
//  easing: 'easeInOutSine',
//  loop: true,
//  to: 'getRandomColor()'
//})

// change this value for more or less rings
let totalRingElements = 20;

function generateAllElements() {

  for(let a = 0; a < totalRingElements; a++){

    // element params
    let totalCircleElements = getRandomNumber(10, 3);
    let elementScale = getRandomNumber(1, 3);
    let scaleDuration = 1000000;

    // path params
    let pathValOne = getRandomNumber(21, -10);
    let pathValTwo = getRandomNumber(11, -20);
    let pathDuration = 1000000;

    for (let i = 1; i <= totalCircleElements; i++) {

      let currentRotation = 360 / totalCircleElements * i;
      let rotateContainer = document.createElement('a-entity');
      rotateContainer.setAttribute('rotation', `0 0 ${currentRotation}`);

      // generate circle element and set params
      let circleElementContainer = document.createElement('a-entity');
      circleElementContainer.setAttribute('position', `0 1 4`);
      let circleElement = document.createElement('a-entity');
      circleElement.setAttribute('class', `circleElement`);
      circleElement.setAttribute('scale', `${elementScale} ${elementScale} ${elementScale}`);
      circleElement.setAttribute('material', `color:${getRandomColor()}; metalness: 0; roughness: 1`);
      circleElement.setAttribute('geometry', `primitive: plane; height: 40; width: 0.08`);
      circleElement.setAttribute('animation__yoyo', `property: scale; dir: alternate; dur: ${scaleDuration}; easing: easeInOutSine; loop: true; to: 4 4 4`);
      circleElementContainer.appendChild(circleElement);
      rotateContainer.appendChild(circleElementContainer);

      // generate path and apply it
      let track1 = document.createElement('a-curve');
      track1.setAttribute('class', `track${a}`);
      scene.append(track1);
      let point1 = document.createElement('a-curve-point');
      point1.setAttribute('position', '0 0 5');
      track1.append(point1);
      let point2 = document.createElement('a-curve-point');
      point2.setAttribute('position', `${pathValOne} ${pathValTwo} ${pathValOne}`);
      track1.append(point2);
      let point3 = document.createElement('a-curve-point');
      point3.setAttribute('position', `${pathValTwo} ${pathValOne} ${pathValTwo}`);
      track1.append(point3);
      let point4 = document.createElement('a-curve-point');
      point4.setAttribute('position', '0 0 5');
      track1.append(point4);
      circleElement.setAttribute(`alongpath`, `curve: .track${a}; dur: ${pathDuration}; loop: true`);

      // append element to main container
      objectContainer.appendChild(rotateContainer);

    }

  }

}

generateAllElements()