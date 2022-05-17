song1 = "";
song2 = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

leftWristscore = 0;
song1status = "";

rightWristscore = 0;
song2status = "";

function preload(){
    song1 = loadSound("In_da_getto.mp3");
    song2 = loadSound("Dynamite.mp3");
}
function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotPoses);
}
function draw(){
    image(video,0,0,600,500);
    fill("#ff0000");
    stroke("#ff0000");
    song1status = song1.isPlaying();
    
    if(leftWristscore > 0.2){
        circle(leftWristX,leftWristY,20);
        song2.stop();
        if(song1status == false){
            song1.play();
            document.getElementById("song_name").innerHTML = "Played song name is In Da Getto";
        }
    }
    song2status = song2.isPlaying();
    if(rightWristscore > 0.2){
        circle(rightWristX,rightWristY,20);
        song1.stop();
        if(song2status == false){
            song2.play();
            document.getElementById("song_name").innerHTML = "Played song name is Dynamite";
        }
    }
}

function modelLoaded(){
    console.log("poseNet is initialized");
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        console.log("leftWristX = " + leftWristX + ", leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("rightWristX = " + rightWristX + ", rightWristY = " + rightWristY);

        leftWristscore = results[0].pose.keypoints[9].score;
        rightWristscore = results[0].pose.keypoints[10].score;
    }
}