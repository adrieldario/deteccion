noseX = 0;
noseY = 0;
rightwristX = 0;
leftWristX = 0;
difference = 0;
function setup(){
    video=createCapture(VIDEO);
    video.size(550,500);
    canvas=createCanvas(550,500);
    canvas.position(560,150);
    poseNet=ml5.poseNet(video, modeloCargado);
    poseNet.on("pose",gotPose);
}

function modeloCargado() {
    console.log("modelo cargado");
}

function gotPose(results) {
    if (results.length>0) {
        console.log(results);
        noseX=results[0].pose.nose.x;
        noseY=results[0].pose.nose.y;
        leftWristX=results[0].pose.leftWrist.x;
        rightwristX=results[0].pose.rightwrist.x;
        difference = floor(leftWristX - rightwristX);
        
    }
}

function draw() {
    background("#969A97");
    document.getElementById("square_side").innerHTML=difference;
    fill("F90093");
    stroke("F90093");
    square(noseX,noseY, difference);
    
    
}
objectDetector= "";

img = "";
objects = [];
status = "";

function preload(){
  img = loadImage('dog_cat.jpg');
}


function setup() {
  canvas = createCanvas(640, 420);
  canvas.center();
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Estado: detectando objetos";
}

function modelLoaded() {
  console.log("¡Modelo cargado!")
  status = true;
  objectDetector.detect(img, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}


function draw() {
  image(img, 0, 0, 640, 420);

      if(status != "")
      {
        for (var i = 0; i < objects.length; i++) {
          document.getElementById("status").innerHTML = "Estado: objeto detectado";
    
          fill(255, 0, 0);
          percent = floor(objects[i].confidence * 100);
         
        }
      }
}
