song1 = "";
song2 = "";
song1Status =""; 
song2Status =""; 
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftWrist = 0;
scorerightWrist = 0;

function preload() {
    song1 = loadSound("hideway.mp3");
    song2 = loadSound("moonlight.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded() {
    console.log("poseNet is initialized");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreleftWrist = results[0].pose.keypoints[9].score;
        scorerightWrist = results[0].pose.keypoints[10].score;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristY = results[0].pose.rightWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
    }
}

function draw() {
    image(video, 0, 0, 600, 500);
    song1Status = song1.isPlaying();
    song2Status = song2.isPlaying();
    fill("red");
    stroke("red");
    if (scoreleftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song1.stop();
        if(song2Status == false){
            song2.play();
            document.getElementById("song").innerHTML="Playing Moonlight";
        }
    }

    if (scorerightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        song2.stop();
        if(song1Status == false){
            song1.play();
            document.getElementById("song").innerHTML="Playing Hideaway";
        }
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}