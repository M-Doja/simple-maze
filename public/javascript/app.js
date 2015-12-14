var timerId;

function showColors(){
  function randomRGB() {
    return Math.floor(Math.random() * 256 );
  }
  for (var i = 0; i < 77; i++) {
  var red = randomRGB();
  var green = randomRGB();
  var blue = randomRGB();
  var rgbColor = 'rgb(' + red + ',' + green + ',' + blue +')';
  document.getElementById('color').innerHTML += '<div id="changeColor" style="color:white;display:inline-block;height:120px;width:120px;background-color:' + rgbColor + ';text-align:center">rgb(' + red + ',' + green + ',' + blue +')</div>'
  }
}

function changeColor() {
  document.getElementById('color').innerHTML = '';
  showColors();
}

function startColorGenerator() {
  timerId = setInterval(changeColor, 100);
}

function clearColorGenerator() {
  document.getElementById('color').innerHTML = '';
}
