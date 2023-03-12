HarryPotterSong="";
PeterPanSong="";
leftWristx="";
leftWristy="";
rightWristx="";
rightWristy="";
scoreleftWrist=0;
HarryPotterplay="";
scorerighttWrist=0;
PeterPanplay="";

function setup(){
    canvas=createCanvas(600,400);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotResults);
}

function preload(){
 HarryPotterSong=loadSound("music.mp3");
    PeterPanSong=loadSound("music2.mp3");
}

function draw(){
    image(video,0,0,600,400);

    fill("#FF0000");
    stroke("FF0000");
 HarryPotterplay= HarryPotterSong.isPlaying();
 console.log(HarryPotterplay);

 PeterPanplay= PeterPanSong.isPlaying();
 console.log(PeterPanplay);

   if(scoreleftWrist > 0.2){
     circle(leftWristx,leftWristy,20);  
     PeterPanSong.stop();
        if(HarryPotterplay == false){
          HarryPotterSong.play();
          document.getElementById("song_id").innerHTML="Song Name: Harry Potter Song";
     }
    }

    if(scorerightWrist > 0.2){
        circle(rightWristx,rightWristy,20);  
        HarryPotterSong.stop();
           if(PeterPanplay == false){
            PeterPanSong.play();
             document.getElementById("song_id").innerHTML="Song Name: Peter Pan Song";
        }
       }
}


function modelLoaded(){
    console.log("Pose Net Is Loaded")
}

function gotResults(results){
    if(results.length>0){
       console.log(results);
       scoreleftWrist=results[0].pose.keypoints[9].score;
       console.log("Left Wrist="+scoreleftWrist);

       scorerightWrist=results[0].pose.keypoints[10].score;
       console.log("Right Wrist="+scorerightWrist);
    
       leftWristx=results[0].pose.leftWrist.x;
       leftWristy=results[0].pose.leftWrist.y;
       console.log("Left Wrist X= "+leftWristx+"Left Wrist Y= "+leftWristy);

       rightWristx=results[0].pose.rightWrist.x;
       rightWristy=results[0].pose.rightWrist.y;
       console.log("Right Wrist X= "+rightWristx+"Right Wrist Y= "+rightWristy);
    }
}