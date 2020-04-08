
(function () {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();

var canvas = document.getElementById("smokeparticles"),
    ctx = canvas.getContext("2d"),
    settings = {
      color: {
        r: 255,
        g: 255,
        b: 255
      }
    },
    loading = true;

if( $(window).width() > 767 ){
  canvas.height = 670; //document.body.offsetHeight;
  canvas.width = 2000; //document.body.clientWidth;
}else{
  canvas.height = 600; //document.body.offsetHeight;
  canvas.width = 960; //document.body.clientWidth;
}

var parts = [],
    minSpawnTime = 10,
    lastTime = new Date().getTime(),
    maxLifeTime = Math.min(5000, (canvas.height / 2 * 1000)), //Math.min(5000,(canvas.height / 2 * 1000))
    emitterX = canvas.width * 0.5, //·ÏÃú²£¥ÍÂI-x¶b
    emitterY = canvas.height * 0.85  , //·ÏÃú²£¥ÍÂI-y¶b
    smokeImage = new Image();

function spawn() {
  if (new Date().getTime() > lastTime + minSpawnTime) {
    lastTime = new Date().getTime();
    parts.push(new smoke(emitterX, emitterY));
  }
}

function render() {
  if(loading){
    load();
    return false;
  }
  
  var len = parts.length;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  while (len--) {
    if (parts[len].y < 0 || parts[len].lifeTime > maxLifeTime) {
      parts.splice(len, 1);
    } else {
      parts[len].update();
      
      ctx.save();
      var offsetX = -parts[len].size / 2, //°¾²¾­È-x¶b
          offsetY = -parts[len].size / 2; //°¾²¾­È-y¶b
      
      ctx.translate(parts[len].x - offsetX, parts[len].y - offsetY);
      ctx.rotate(parts[len].angle / 180 * Math.PI);
      ctx.globalAlpha = parts[len].alpha;
      ctx.drawImage(smokeImage, offsetX, offsetY, parts[len].size, parts[len].size);
      ctx.restore();
    }
  }
  spawn();
  requestAnimationFrame(render);
}

function smoke(x, y, index) {
  this.x = x;
  this.y = y;
  
  this.size = 1;
  this.startSize = 32;
  this.endSize = 80;
  
  this.angle = Math.random() * 359;
  
  this.startLife = new Date().getTime();
  this.lifeTime = 0;
  
  this.velY = -1 - (Math.random() * 0.5);
  this.velX = Math.floor(Math.random() * (-6) + 3);
}

smoke.prototype.update = function () {
  this.lifeTime = new Date().getTime() - this.startLife;
  this.angle += 0.2;
  
  var lifePerc = ((this.lifeTime / maxLifeTime) * 100);
  
  this.size = this.startSize + ((this.endSize - this.startSize) * lifePerc * .1);
  
  this.alpha = 1 - (lifePerc * .01);
  this.alpha = Math.max(this.alpha, 0);
  
  this.x += this.velX;
  this.y += this.velY;
}

smokeImage.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjUxQ0RBQTE0RjA4NzExRTlCMDI5QzMwRkQzN0FDQUVFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjUxQ0RBQTE1RjA4NzExRTlCMDI5QzMwRkQzN0FDQUVFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTFDREFBMTJGMDg3MTFFOUIwMjlDMzBGRDM3QUNBRUUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTFDREFBMTNGMDg3MTFFOUIwMjlDMzBGRDM3QUNBRUUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5rBAwuAAACZ0lEQVR42uyX22oTURSGZyeTpE2bNKZa67FQPLSCINYr9RUEn8CXEF/KZ9BLBfVGvVHBA9ViW5S21moSc9j+G76BzaBmO5lYLzrwMUnmsP611r/XTIy1NtrPrRDt83YgIKuAWJjUb1VR+lcCZsVNcZ3ARXFMNLNkkkX0NXFbfBR3xTPhltMUVeiOqwJHxA1xS1wlYF2siHmOnxhnBVzmd8QVMRBblN6JOC064rlYE728BbhAF8mwLL6LBXGKwJ/EK7GOQRMGebVgjhJ3Pde7SpwTh8S2uC9eELgWsjIKgT5xN/kmGuKMd2yC31wrHpH9HIKOI7g4aguqBGmL9784vioeE/ww5+5wXUQ1SnjCZqlATM8bBLrnHesg6quYJONZVocTsScqnGuzVKDJDd3+KEIeiEVxUrwhsxWy38Kc0xiyhchulhYUMdKyuMC5u7TiobhE8JiMF/BEh2ptU51WVg9MkHGBGxb5HHNjtz/PDNig5H0qVuP6H6PMgSqlbrC0umQ67XmnjcH2KL/hfNeGzyEj+U8CdjHOPLP+KTc/y/Bx135gAFUQXKY6T8TL3xnP38yQV7I6ZXZi3tKGJuVdYiZM8b3Fea9ZLV/yEJBex4NUi9wUvExlNng67sDmMAOGCvBXRTLfK4hKVsAM3ojJ2gl5hylzeRgZ+lsiwMBzeIyAOr+t4Y1+FDjlQjbrZW+9JZnsy6z/VeiElvVvWuA/YicpfZtgJcT08Uov9K0oVIBJOdrgfIPRkmM19q3QFxIz4j8jX1gBc/aoRPIyYscpIC3Gf+qZkDkQR/ltdsj3g79m/6eAnwIMAIXDoS+XeHGFAAAAAElFTkSuQmCC'; //document.getElementById("smokeparticles_img").src;
smokeImage.onload = function(){
  loading = false; 
}

function load(){
  if(loading){
    setTimeout(load, 100); 
  }else{
    render(); 
  }
}
render();


// save off the original image for colorizing
var origImage = smokeImage;

window.onresize = resizeMe;
window.onload = resizeMe;

function resizeMe() {
  if( $(window).width() > 767 ){
    canvas.height = 670; //document.body.offsetHeight;
    canvas.width = 2000; //document.body.clientWidth;
  }else{
    canvas.height = 600; //document.body.offsetHeight;
    canvas.width = 960; //document.body.clientWidth;
  }
}

/*
function changeColor() {
  var tCanvas = document.createElement("canvas"),
      tCtx = tCanvas.getContext("2d"),
      color = settings.color;
  
  tCanvas.width = tCanvas.height = 32;
  tCtx.drawImage(origImage, 0, 0, 32, 32);
  
  var imgd = tCtx.getImageData(0, 0, 32, 32),
      pix = imgd.data;
  
  for (var i = 0, n = pix.length; i < n; i += 4) {
    pix[i] = color.r 
    pix[i + 1] = color.g;
    pix[i + 2] = color.b;
  }
  
  tCtx.putImageData(imgd, 0, 0);
  return tCanvas.toDataURL();
}

// Settings
var gui = new dat.GUI();
var colorController = gui.addColor(settings, 'color').onChange(function () {
  smokeImage.src = changeColor();
});*/
