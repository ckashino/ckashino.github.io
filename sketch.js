let slider;
let hippo_locations = [];
let paint_spots = []
let hippo_head;
let real_width;
let real_height;
let radio;
let colour_radio;
let to_image
let base_brush_size
let mood_radio
let button
let save_button

function preload(){
  hippo_head = loadImage('hippohead.png');
}

function make_colour_radio(){
  colour_radio = createRadio()
  colour_radio.option(0, "Base")
  colour_radio.option(1, "Black")
  colour_radio.option(2, "Red")
  colour_radio.option(3, "Coral Pink")
  colour_radio.option(4, "Tiffany Blue")
  colour_radio.option(5, "Erase")
  colour_radio.attribute('name', 'colour')
}

function make_brush_radio(){
  radio = createRadio();
  radio.option(2, "Paint Brush")
  radio.option(1, "Hippo Brush")
  radio.attribute('name', 'mode')
}

function make_clear_button(){
  button = createButton("Clear")
  button.mousePressed(full_clear)
  button.position(width - button.width, height)
}
function make_save_button(){
  save_button = createButton("Save")
  save_button.mousePressed(save_drawing)
  save_button.position(width - (button.width + save_button.width), height)
}
function make_mood_radio(){
  mood_radio = createRadio();
  mood_radio.option(1, "Happy")
  mood_radio.option(2, "Sad")
  mood_radio.option(3, "Mad")
}

function save_drawing(){
  saveCanvas("HIPPODRAWING")
}

function setup() {
  colorMode(RGB)
  frameRate(240)
  createCanvas(windowWidth, windowHeight / 2);
  base_brush_size = width / 250
  make_clear_button()
  make_save_button()
  let brush_sect = createDiv("")
  brush_sect.style("padding", "5px")
  brush_sect.html("<u>Brush Options</u>")
  make_brush_radio()
  let colour_sect = createDiv("")
  colour_sect.style("padding", "5px")
  colour_sect.html("<u>Colour Options</u>")
  make_colour_radio()  
  size_slider = createSlider(0, 60)
  
  let hippo_sect = createDiv("")
  hippo_sect.style("padding", "5px")
  hippo_sect.html("<u>Hippo Options</u>")

  make_mood_radio()
  slider = createSlider(-10, 20);
  angleMode(DEGREES);
}

function draw() {
  background(220);
  if(to_image != null){
    image(to_image,0,0,width,height)
  }
  if(mouseIsPressed){
    if(mouseX <= width && mouseX >= 0 && mouseY <= height && mouseY >= 0){
      if(radio.value() == 1){
        hippo_locations.push([mouseX, mouseY, slider.value(), mood_radio.value()]);
      }
      if(radio.value() == 2){
        paint_spots.push([mouseX, mouseY, colour_radio.value(), size_slider.value()]);
      }
    }
  }
  for(let i = 0; i < hippo_locations.length; i++){
    spawn_hippo(hippo_locations[i][0], hippo_locations[i][1], hippo_locations[i][2], hippo_locations[i][3]);
  }
  for(let i = 0; i < paint_spots.length; i++){
    draw_spots(paint_spots[i][0], paint_spots[i][1], paint_spots[i][2], paint_spots[i][3]);
  }

  if(hippo_locations.length + paint_spots.length > 150){
    to_image = get()
    empty()
  }
}

function empty(){
  hippo_locations = []
  paint_spots = []
}
function full_clear(){
  empty()
  to_image = null
}

function draw_spots(x, y, color, size){

  push()
  if(color == 0){
    fill(254)
    stroke(0)
  }
  if(color == 1){
    fill(0)
    stroke(0)
  }
  if(color == 2){
    fill(254, 0, 0)
    stroke(254, 0, 0)
  }
  if(color == 3){
    fill(248, 131, 121)
    stroke(248, 131, 121)
  }
  if(color == 4){
    fill(10, 186, 181)
    stroke(10, 186, 181)
  }
  if(color == 5){
    fill(220)
    stroke(220)
  }
  circle(x, y, base_brush_size + size, base_brush_size + size)
  pop()
}

function spawn_hippo(x, y, size, mood){
  push();
  translate(x, y);
  push()
  rotate(-15)
  fill(102, 204, 204)
  stroke(102, 204, 204)
  ellipse(14, 3, 80 + (size / 2.5), 40 + size);
  pop()
  image(hippo_head,-30, -30, 60, 60);
  stroke(0)
  push()
  translate(-15, 0)
  if(mood == 1){
    curve(0, 0, 10, 10, 20, 10, 30, 0)
  }
  if(mood == 2){
    curve(0, 20, 10, 10, 20, 10, 30, 20)
  }
  if(mood == 3){
    line(8,-15,13,-12)
    line(22,-15,17,-12)
    curve(0, 20, 10, 10, 20, 10, 30, 20)
  }
  pop()
  pop()
}