img="";
status1="";
objects=[];

function preload(){
    img=loadImage("luggage-1650171_640.jpg");
}

function draw(){
    image(video, 0, 0, 380, 380);

    if(status1!=""){
        r=random(255);
        g=random(255);
        b=random(255);
        object_detector.detect(video, gotresult);
       for(i=0;i<objects.length;i++){
           document.getElementById("status").innerHTML="status:object detected";
           document.getElementById("number_of_objects").innerHTML="Number of objects detected are: "+ objects.length;
           fill(r, g, b)
           percent=floor(objects[i].confidence*100);
           text(objects[i].label+" "+percent+"%", objects[i].x, objects[i].y);
           noFill();
           stroke(r, g, b);
           rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
       }
    }

}

function setup(){
    canvas=createCanvas(380, 380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    object_detector=ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status").innerHTML="Status: Detecting objects";
}
function modelloaded(){
    console.log("model is loaded");
    status1=true;
   
}

function gotresult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}