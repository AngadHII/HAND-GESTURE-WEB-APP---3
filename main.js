prediction_1="";
prediction_2="";

Webcam.set({
    width: 350,
    height: 300,
image_format:'png',
png_quality: 90
});

camera = document.getElementById("webcam");
Webcam.attach("#webcam");

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("results").innerHTML =
        '<img id="captured_image" src= " '+data_uri+' "/>';
  });
}

console.log('ml5_version: ', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/PAmbQVTxt/model.json', modelLoaded);

function modelLoaded(){
    console.log('model has been loaded')
}

function check(){
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results){

    if(error){
    console.error(error);
}
else{
    console.log(results);

    prediction_1=results[0].label;
    prediction_2=results[1].label;
    

    document.getElementById("result_gesture_1").innerHTML=results[0].label;
    document.getElementById("result_gesture_2").innerHTML=results[1].label;

     if(results[0].label == "Thumbs Up"){
        document.getElementById("result_gesture_1").innerHTML = "&#128077;";
    }
    if(results[0].label == "Peace Sign"){
        document.getElementById("result_gesture_1").innerHTML = "&#9996;";
    }
    if(results[0].label == "Ok Sign"){
        document.getElementById("result_gesture_1").innerHTML = "&#128076;";
    }
    if(results[1].label == "Thumbs Up"){
        document.getElementById("result_gesture_2").innerHTML = "&#128077;";
    }
    if(results[1].label == "Peace Sign"){
        document.getElementById("result_gesture_2").innerHTML = "&#9996;";
    }
    if(results[1].label == "Ok Sign"){
        document.getElementById("result_gesture_2").innerHTML = "&#128076;";
    }

    speak();
}
}


function speak(){
    synth = window.speechSynthesis;
    utterThis = new SpeechSynthesisUtterance("The first prediction is the "+prediction_1+"hand gesture and the second prediction is the "+prediction_2+"hand gesture");
    synth.speak(utterThis);
}