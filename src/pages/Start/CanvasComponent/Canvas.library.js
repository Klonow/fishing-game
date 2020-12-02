class Canvas {
  constructor(img, ctx, canvas) {
    this.img = img
    this.canvas = canvas
    this.ctx = ctx

    this.prepare()
  }

  prepare() {
    this.instanseImage = new Image()
    this.instanseImage.src = this.img
  }

  onLoadImage(dx, dy, ...args) {
    const instanceImage = new Image()
    instanceImage.src = this.img

    instanceImage.onload = () => {
      this.ctx.imageSmoothingEnabled = true;
      if (args) {
        this.ctx.drawImage(instanceImage, dx, dy, ...args)
        return;
      }
      this.ctx.drawImage(instanceImage, dx, dy)
    }
  }

  drawLine(options) {
    const {x1, x2, y1, y2, color, lineWidth} = options

    setTimeout(() => {
      this.ctx.beginPath();
      this.ctx.lineWidth = lineWidth;
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);   //рисуем леску к попловку
      this.ctx.strokeStyle = color;
      this.ctx.closePath();
      this.ctx.stroke();
    }, 0)

  }

  get image() {
    return this.instanseImage
  }

  get height() {
    return this.instanseImage.height
  }

  get width() {
    return this.instanseImage.width
  }
}

export default function initializationLibraryCanvas(options) {
  const {images, ctx, canvas} = options

  this.canvas.clear = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  return Object.keys(images).map(img => {
    return this[img] = new Canvas(images[img], ctx, canvas)
  })
}

