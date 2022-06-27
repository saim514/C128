song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function setup()
{
    canvas = createCanvas(400, 400);

    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log("Listen to anything but this");
}

function gotPoses(results)
{
  if (results.length > 0)
  {
    console.log(results);
    
    leftWristX = results[0].pose.leftWrist.x;
    leftWristX = results[0].pose.leftWrist.x;
    
    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;  
    
    console.log("LeftWristX = " + leftWristX + ", leftWristY = " + leftWristY);
    console.log("RightWristY = " + rightWristX  + ", rightWristY = " + rightWristY);
    }
}

function preload()
{
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3")
}

function draw()
{
    image(video, 0, 0, 400, 400);
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}
