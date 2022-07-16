song1 = "";
song2 = "";
song1status = "";
song2status = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftwrist = 0;
scorerightwrist = 0;

function preload()
{
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}
 
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
    
    scorerightwrist = results[0].pose.keypoints[10].score;
    scoreleftwrist = results[0].pose.keypoints[9].score;
    console.log("Scorerightrwrist = " + scorerightwrist + "Scoreleftwrist = " + scoreleftwrist);

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    
    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;  
    
    console.log("LeftWristX = " + leftWristX + ", leftWristY = " + leftWristY);
    console.log("RightWristY = " + rightWristX  + ", rightWristY = " + rightWristY);
    }
}

function draw()
{
    image(video, 0, 0, 400, 400);
    song1status = song1.isPlaying();
    song2status = song2.isPlaying();
    fill('#000080');
    stroke('#000080');
    if(scorerightwrist > 0.2)
    {
        circle(rightWristX, rightWristY, 20);
        song2.stop();
        if(song1status == false)
        {
            song1.play();
            document.getElementById("song").innerHTML = "Harry Potter Theme Song is playing";
        }
    }

    if(scoreleftwrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        song1.stop();
        if(song2status == false)
        {
            song2.play();
            document.getElementById("song").innerHTML = "Peter Pan is playing";
        }
    }
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}
