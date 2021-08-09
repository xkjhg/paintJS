const canvas = document.getElementById("jsCanvas")
const ctx = canvas.getContext("2d")
const colors = document.getElementsByClassName("jsColor")
const range = document.getElementById("jsRange")
const mode = document.getElementById("jsMode")
const saveBtn = document.getElementById("jsSave")
const square = document.getElementById("jsSquare")
const circle = document.getElementById("jsCircle")

const INITIAL_COLOR = "#2c2c2c"

canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight

ctx.fillStyle = "white"
ctx.fillRect(0, 0, canvas.width, canvas.height)

ctx.strokeStyle = INITIAL_COLOR
ctx.fillStyle = INITIAL_COLOR
ctx.lineWidth = 2.5

let painting = false
let filling = false
let paintSquare = false

function startPainting() {
  painting = true
}

function stopPainting() {
  painting = false
}

function onMouseMove(event) {
  const x = event.offsetX
  const y = event.offsetY

  if (!painting) {
    ctx.beginPath()
    ctx.moveTo(x, y)
  } else {
    ctx.lineTo(x, y)
    ctx.stroke()
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor
  ctx.strokeStyle = color
  ctx.fillStyle = color
}

function handleRangeChange(event) {
  const range = event.target.value
  ctx.lineWidth = range
}

function handleModeClick() {
  if (filling === true) {
    filling = false
    mode.innerText = "Fill"
  } else {
    filling = true
    mode.innerText = "Paint"
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }
}

function handleSaveClick() {
  const image = canvas.toDataURL("image/png")
  const link = document.createElement("a")
  link.href = image
  link.download = "paintJS[♥]"
  link.click()
}

function handlesquareClick() {
  if (paintSquare === true) {
    paintSquare = false
    square.innerText = "□"
  } else {
    paintSquare = true
    square.innerText = "■"
  }
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove)
  canvas.addEventListener("mousedown", startPainting)
  canvas.addEventListener("mouseup", stopPainting)
  canvas.addEventListener("mouseleave", stopPainting)
  canvas.addEventListener("click", handleCanvasClick)
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick))

if (range) {
  range.addEventListener("input", handleRangeChange)
}

if (mode) {
  mode.addEventListener("click", handleModeClick)
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick)
}

if (square) {
  square.addEventListener("click", handlesquareClick)
}
