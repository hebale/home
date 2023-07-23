export function SnowFlake(p5) {
  this.posX = p5.random(-p5.width * 1.2, p5.width * 1.2);
  this.posY = p5.random(-10, 0);
  this.size = p5.random(2, 6);
  
  this.update = function(zAngle) {
    p5.drawingContext.strokeStyle = '#333';
    this.posX += zAngle;
    this.posY += p5.pow(this.size, 1.2);
  };

  this.display = function() {
    p5.ellipse(this.posX, this.posY, this.size);
  }
};

export function DropFlake(p5) {
  this.posX1 = p5.random(-p5.width * 1.2, p5.width * 1.2);
  this.posX2 = this.posX1;
  this.posY1 = p5.random(-120, -80);
  this.posY2 = p5.random(-5, 0);
  this.speed = p5.random(15, 30);

  this.update = function(zAngle) {
    this.posX1 += zAngle;
    this.posX2 += zAngle;
    this.posY1 += this.speed;
    this.posY2 += this.speed;
  };
  
  this.display = function(zAngle) {
    gradientLine(p5, this.posX1 - (zAngle * 3), this.posY1, this.posX2, this.posY2, '#fff', '#333');
  }
};

function gradientLine(p5, x1, y1, x2, y2, color1, color2) {
  const grad = p5.drawingContext.createLinearGradient(x1, y1, x2, y2);
  grad.addColorStop(0, color1);
  grad.addColorStop(1, color2);

  p5.drawingContext.strokeStyle = grad;
  p5.line(x1, y1, x2, y2);
}